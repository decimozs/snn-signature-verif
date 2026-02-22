import { Hono } from "hono";
import { cors } from "hono/cors";
import { db } from "./db";

const app = new Hono({ strict: false })
  .basePath("/api/v1")
  .use(
    "*",
    cors({
      origin: "http://localhost:5173",
      allowMethods: ["POST", "GET", "OPTIONS", "PATCH", "DELETE", "PUT"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/signatures", async (c) => {
    const data = await db.query.signatures.findMany({
      orderBy: (sig, { desc }) => [desc(sig.createdAt)],
    });
    return c.json(data);
  })
  .get("/signatures/:id", async (c) => {
    const { id } = c.req.param();
    const data = await db.query.signatures.findFirst({
      where: (sig, { eq }) => eq(sig.id, id),
      with: {
        logs: true,
        verifications: true,
      },
    });

    if (!data) {
      return c.json({ error: "Signature not found" }, 404);
    }

    return c.json(data);
  })
  .get("/verifications", async (c) => {
    const data = await db.query.verifications.findMany({
      orderBy: (sig, { desc }) => [desc(sig.createdAt)],
    });
    return c.json(data);
  })
  .get("/verifications/:id", async (c) => {
    const { id } = c.req.param();
    const data = await db.query.verifications.findFirst({
      where: (sig, { eq }) => eq(sig.id, id),
      with: {
        signature: true,
      },
    });

    if (!data) {
      return c.json({ error: "Verification not found" }, 404);
    }

    return c.json(data);
  });

export default app;
