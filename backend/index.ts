import express from "express";
import { buildHandler } from "./src/controller";
import { authMiddleware, buildValidation } from "./src/middleware";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.get("/health", buildHandler);

app.get("/assets", (req, res) => {
  console.log(req);
});

app.post("/build", authMiddleware, buildValidation, buildHandler);

app.listen(3001, () => {
  console.log("Server started");
});
