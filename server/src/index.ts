import express, { Request, Response, ErrorRequestHandler } from "express";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";

import authRouter from "./routes/auth";
import { initDb } from "./store/db";
import { seed } from "./store/seed";
import healthRouter from "./routes/health";
import permissionsRouter from "./routes/permissions";
import groupsRouter from "./routes/groups";
import menusRouter from "./routes/menus";
import { openApiSpec } from "./openapi";
import { apiLimiter, authLimiter } from "./utils/authHelpers";
import { sendError } from "./utils/response";

const requiredVariables = ["JWT_SECRET", "SMTP_PASS", "SMTP_FROM"];
const missingVariables = requiredVariables.filter(
  (v) => !process.env[v]?.trim(),
);

if (missingVariables.length > 0) {
  console.error("Missing required environment variables:", missingVariables);
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/*", apiLimiter);

app.use(
  "/api/docs",
  apiReference({
    spec: { content: openApiSpec },
  }),
);
app.use("/api/health", healthRouter);
app.use("/api/permissions", permissionsRouter);
app.use("/api/groups", groupsRouter);
app.use("/api/menus", menusRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running! :D -pram",
  });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Unhandled Application Error:", err);
  sendError(res, "An unexpected server error occurred. Please try again later.", 500);
};

app.use(errorHandler);

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
