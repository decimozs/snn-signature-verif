import cv2
import numpy as np
from typing import List


class SignatureAnalyzer:
    def __init__(self, n_features: int = 500):
        self.orb = cv2.ORB_create(nfeatures=n_features)
        self.bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    def extract_features(self, image: np.ndarray):
        """Public because it's useful for bulk matching."""
        return self.orb.detectAndCompute(image, None)

    def get_feature_similarity(self, image1: np.ndarray, image2: np.ndarray) -> float:
        kp1, des1 = self.extract_features(image1)
        kp2, des2 = self.extract_features(image2)

        if des1 is None or des2 is None or not kp1 or not kp2:
            return 0.0

        matches = self.bf.match(des1, des2)
        return float(len(matches) / max(len(kp1), len(kp2)))

    def generate_fingerprint(self, processed_image: np.ndarray) -> List[float]:
        _, descriptors = self.extract_features(processed_image)

        if descriptors is None:
            return [0.0] * 128

        fingerprint = (descriptors.flatten()[:128] / 255.0).astype(float)
        return fingerprint.tolist()
