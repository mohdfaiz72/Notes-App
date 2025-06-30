import { Note } from "../models/note.model.js";

// CREATE Note
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: "At least one tag is required." });
    }
    const note = await Note.create({ title, content, tags });
    res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// GET ALL Notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Notes fetched successfully",
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

// GET Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid note ID",
      error: error.message,
    });
  }
};

// UPDATE Note
export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: "At least one tag is required." });
    }
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content, tags } },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
};

// DELETE Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
};
