import { Router } from "express";
import lessonNoteController from "../controllers/lessonNote.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", (req, res, next) => lessonNoteController.getMyNotes(req, res, next));
router.post("/", (req, res, next) => lessonNoteController.createNote(req, res, next));
router.put("/:noteId", (req, res, next) => lessonNoteController.updateNote(req, res, next));
router.patch("/:noteId/pin", (req, res, next) => lessonNoteController.togglePinned(req, res, next));
router.delete("/:noteId", (req, res, next) => lessonNoteController.deleteNote(req, res, next));

export default router;
