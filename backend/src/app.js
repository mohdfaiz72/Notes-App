import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

import noteRouter from "./routes/note.routes.js";
app.use("/api/notes", noteRouter);

export default app;
