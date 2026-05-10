import { Router } from "express";
import flashcardController from "../controllers/flashcard.controller.js";

const router = Router();

// Tạo flashcard cá nhân
router.post("/", flashcardController.createFlashcard.bind(flashcardController));

// Lấy tất cả flashcards
router.get("/", flashcardController.getAllFlashcards.bind(flashcardController));

// Lấy flashcard theo ID
router.get("/:id", flashcardController.getFlashcard.bind(flashcardController));

// Lấy tất cả flashcards cá nhân của người dùng
router.get("/personal/:userId", flashcardController.getPersonalFlashcards.bind(flashcardController));

// Lấy flashcards của bài học (từ lesson)
router.get("/lesson/:lessonId", flashcardController.getFlashcardsByLesson.bind(flashcardController));

// Lấy flashcards cá nhân của người dùng từ bài học cụ thể
router.get("/personal/:userId/lesson/:lessonId", flashcardController.getPersonalFlashcardsByLesson.bind(flashcardController));

// Sao chép flashcard từ lesson vào bộ cá nhân
router.post("/:flashcardId/copy", flashcardController.copyFlashcardToPersonal.bind(flashcardController));

// Cập nhật flashcard
router.put("/:id", flashcardController.updateFlashcard.bind(flashcardController));

// Xóa flashcard
router.delete("/:id", flashcardController.deleteFlashcard.bind(flashcardController));

export default router;
