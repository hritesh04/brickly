import express from "express";
import { buildHandler, healthHandler } from "./src/controller";
import { authMiddleware, buildValidation } from "./src/middleware";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
dotenv.config({ path: "../../.env" });
const app = express();
app.use(cors());

app.use(express.json());

app.get("/health", healthHandler);

app.get("/assets", (req, res) => {
  console.log(req);
});

app.post("/build", authMiddleware, buildValidation, buildHandler);

const PORT = process.env.BACKEND_PORT || 3001;
app.listen(PORT, () => {
  console.log("Backend Server running on port : ", PORT);
});
