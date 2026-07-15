import express, { Request, Response } from "express";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";

import authRouter from "./routes/auth";
import { initDb } from "./store/db";
import { seed } from "./store/seed";
import healthRouter from "./routes/health";
import { openApiSpec } from "./openapi";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRouter);

app.use(
  "/api/docs",
  apiReference({
    spec: { content: openApiSpec },
  }),
);
app.use("/api/health", healthRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running! :D -pram",
  });
});

initDb()
  .then(() => seed())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
