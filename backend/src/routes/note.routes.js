import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

const router = Router();

// Create a new note
router.post("/create", createNote);

// Get all notes
router.get("/", getAllNotes);

// Get a single note by ID
router.get("/get-note/:id", getNoteById);

// Update a note by ID
router.put("/update/:id", updateNote);

// Delete a note by ID
router.delete("/delete/:id", deleteNote);

export default router;
