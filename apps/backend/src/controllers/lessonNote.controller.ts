import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import lessonNoteModel, { LESSON_NOTE_TYPES, LessonNoteType } from "../models/lessonNote.model.js";

const isValidNoteType = (value: unknown): value is LessonNoteType =>
  typeof value === "string" && LESSON_NOTE_TYPES.includes(value as LessonNoteType);

const toOptionalNumber = (value: unknown): number | undefined => {
  if (value == null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export class LessonNoteController {
  async createNote(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const {
        lesson_id,
        question_id,
        note_type,
        note_content,
        selected_text,
        video_timestamp_seconds,
        is_pinned,
      } = req.body;

      if (!isValidNoteType(note_type)) {
        return res.status(400).json({ error: "Invalid note_type" });
      }

      if (!note_content?.trim()) {
        return res.status(400).json({ error: "note_content is required" });
      }

      if (note_type === "question_note" && !toOptionalNumber(question_id)) {
        return res.status(400).json({ error: "question_id is required for question notes" });
      }

      const lessonId = toOptionalNumber(lesson_id) ?? null;
      if (note_type !== "question_note" && !lessonId) {
        return res.status(400).json({ error: "lesson_id is required for this note type" });
      }

      if (note_type === "highlight" && !selected_text?.trim()) {
        return res.status(400).json({ error: "selected_text is required for highlight notes" });
      }

      if (note_type === "video_note" && toOptionalNumber(video_timestamp_seconds) == null) {
        return res.status(400).json({ error: "video_timestamp_seconds is required for video notes" });
      }

      const note = await lessonNoteModel.createNote(req.user.user_id, {
        lessonId,
        questionId: toOptionalNumber(question_id) ?? null,
        noteType: note_type,
        noteContent: note_content.trim(),
        selectedText: selected_text?.trim() || null,
        videoTimestampSeconds: toOptionalNumber(video_timestamp_seconds) ?? null,
        isPinned: Boolean(is_pinned),
      });

      return res.status(201).json({
        message: "Lesson note created successfully",
        data: note,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const noteType = req.query.note_type;
      const pinned = req.query.pinned;
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = Number(req.query.offset) || 0;

      if (noteType && !isValidNoteType(noteType)) {
        return res.status(400).json({ error: "Invalid note_type" });
      }

      const notes = await lessonNoteModel.getUserNotes(req.user.user_id, {
        noteType: isValidNoteType(noteType) ? noteType : undefined,
        lessonId: toOptionalNumber(req.query.lesson_id),
        questionId: toOptionalNumber(req.query.question_id),
        pinned: pinned === "true" ? true : pinned === "false" ? false : undefined,
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        limit,
        offset,
      });

      return res.status(200).json({
        data: notes,
        count: notes.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateNote(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const noteId = Number(req.params.noteId);
      if (!req.params.noteId || Number.isNaN(noteId)) {
        return res.status(400).json({ error: "Invalid note ID" });
      }

      const note = await lessonNoteModel.updateNote(req.user.user_id, noteId, {
        noteContent: typeof req.body.note_content === "string" ? req.body.note_content.trim() : undefined,
        selectedText: req.body.selected_text === undefined ? undefined : req.body.selected_text?.trim() || null,
        videoTimestampSeconds:
          req.body.video_timestamp_seconds === undefined ? undefined : toOptionalNumber(req.body.video_timestamp_seconds) ?? null,
        isPinned: req.body.is_pinned === undefined ? undefined : Boolean(req.body.is_pinned),
      });

      if (!note) {
        return res.status(404).json({ error: "Lesson note not found" });
      }

      return res.status(200).json({
        message: "Lesson note updated successfully",
        data: note,
      });
    } catch (error) {
      next(error);
    }
  }

  async togglePinned(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const noteId = Number(req.params.noteId);
      if (!req.params.noteId || Number.isNaN(noteId)) {
        return res.status(400).json({ error: "Invalid note ID" });
      }

      const note = await lessonNoteModel.setPinned(req.user.user_id, noteId, Boolean(req.body.is_pinned));
      if (!note) {
        return res.status(404).json({ error: "Lesson note not found" });
      }

      return res.status(200).json({
        message: note.is_pinned ? "Lesson note pinned" : "Lesson note unpinned",
        data: note,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const noteId = Number(req.params.noteId);
      if (!req.params.noteId || Number.isNaN(noteId)) {
        return res.status(400).json({ error: "Invalid note ID" });
      }

      const deleted = await lessonNoteModel.softDeleteNote(req.user.user_id, noteId);
      if (!deleted) {
        return res.status(404).json({ error: "Lesson note not found" });
      }

      return res.status(200).json({ message: "Lesson note deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new LessonNoteController();
