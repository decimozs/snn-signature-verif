from fastapi import APIRouter, FastAPI, HTTPException, UploadFile, File
from app.service.processor import SignatureProcessor
from app.service.analyzer import SignatureAnalyzer
import uuid

app = FastAPI(
    title="Signature Verification Worker",
    version="1.0.0",
    description="A worker for verifying signatures.",
)

router = APIRouter(prefix="/signatures", tags=["signatures"])


@router.post("/capture-fingerprint")
async def capture_fingerprint(file: UploadFile = File(...)):
    if not (file.content_type and file.content_type.startswith("image/")):
        raise HTTPException(
            status_code=400, detail="Invalid file type. Only image files are allowed."
        )

    try:
        image_bytes = await file.read()
        processor = SignatureProcessor(image_bytes)
        processed_data = processor.process()
        cleaned_image = processed_data["siamese"]
        vis_image = processor.get_visualization()

        analyzer = SignatureAnalyzer()
        fingerprint = analyzer.generate_fingerprint(cleaned_image)

        return {
            "message": "Fingerprint captured successfully",
            "data": {
                "id": str(uuid.uuid4()),
                "fingerprint": fingerprint,
                "processsed_images": {
                    "vis": {
                        "id": str(uuid.uuid4()),
                        "image": processor._to_base64(vis_image),
                        "type": "vis",
                    },
                    "roi": {
                        "id": str(uuid.uuid4()),
                        "image": processor._to_base64(processed_data["roi"]),
                        "type": "roi",
                    },
                    "normalized": {
                        "id": str(uuid.uuid4()),
                        "image": processor._to_base64(processed_data["normalized"]),
                        "type": "normalized",
                    },
                },
                "metadata": {
                    "width": cleaned_image.shape[1],
                    "height": cleaned_image.shape[0],
                },
            },
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")


@router.post("/verify")
async def verify_signature(
    file: UploadFile = File(...), reference_file: UploadFile = File(...)
):
    if not (file.content_type and file.content_type.startswith("image/")):
        raise HTTPException(
            status_code=400, detail="Invalid file type. Only image files are allowed."
        )

    try:
        live_bytes = await file.read()
        live_processor = SignatureProcessor(live_bytes)
        live_processed = live_processor.process()

        reference_bytes = await reference_file.read()
        reference_processor = SignatureProcessor(reference_bytes)
        reference_processed = reference_processor.process()

        analyzer = SignatureAnalyzer()
        similarity_score = analyzer.get_feature_similarity(
            live_processed["siamese"], reference_processed["siamese"]
        )

        is_authentic = similarity_score > 0.20

        return {
            "id": str(uuid.uuid4()),
            "is_authentic": is_authentic,
            "similarity_score": round(similarity_score, 4),
        }

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(router)
