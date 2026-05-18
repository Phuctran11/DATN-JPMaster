import { Request, Response, NextFunction } from "express";
import flashcardModel from "../models/flashcard.model.js";

export class FlashcardController {
  async createFlashcard(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id, word, meaning, example_sentence, lesson_id } = req.body;

      if (!user_id || !lesson_id || !word || !meaning) {
        return res.status(400).json({
          error: "user_id, lesson_id, word, and meaning are required",
        });
      }

      if (isNaN(Number(user_id))) {
        return res.status(400).json({ error: "user_id phải là một số" });
      }

      if (isNaN(Number(lesson_id))) {
        return res.status(400).json({ error: "lesson_id must be a number" });
      }

      const flashcard = await flashcardModel.createFlashcard(
        Number(user_id),
        word,
        meaning,
        Number(lesson_id),
        example_sentence
      );

      return res.status(201).json({
        message: "Flashcard được tạo thành công",
        data: flashcard,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFlashcard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID flashcard không hợp lệ" });
      }

      const flashcard = await flashcardModel.getFlashcardById(Number(id));

      if (!flashcard) {
        return res.status(404).json({ error: "Flashcard không tồn tại" });
      }

      return res.status(200).json({ data: flashcard });
    } catch (error) {
      next(error);
    }
  }

  async getAllFlashcards(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      const flashcards = await flashcardModel.getAllFlashcards(limit, offset);
      return res.status(200).json({
        data: flashcards,
        count: flashcards.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPersonalFlashcards(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ error: "ID người dùng không hợp lệ" });
      }

      const flashcards = await flashcardModel.getPersonalFlashcardsByUserId(Number(userId), limit, offset);
      return res.status(200).json({
        data: flashcards,
        count: flashcards.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFlashcardsByLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { lessonId } = req.params;
      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      if (!lessonId || isNaN(Number(lessonId))) {
        return res.status(400).json({ error: "ID bài học không hợp lệ" });
      }

      const flashcards = await flashcardModel.getFlashcardsByLessonId(Number(lessonId), limit, offset);
      return res.status(200).json({
        data: flashcards,
        count: flashcards.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPersonalFlashcardsByLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, lessonId } = req.params;
      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ error: "ID người dùng không hợp lệ" });
      }

      if (!lessonId || isNaN(Number(lessonId))) {
        return res.status(400).json({ error: "ID bài học không hợp lệ" });
      }

      const flashcards = await flashcardModel.getPersonalFlashcardsByUserAndLesson(
        Number(userId),
        Number(lessonId),
        limit,
        offset
      );
      return res.status(200).json({
        data: flashcards,
        count: flashcards.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async copyFlashcardToPersonal(req: Request, res: Response, next: NextFunction) {
    try {
      const { flashcardId } = req.params;
      const { user_id } = req.body;

      if (!flashcardId || isNaN(Number(flashcardId))) {
        return res.status(400).json({ error: "ID flashcard không hợp lệ" });
      }

      if (!user_id || isNaN(Number(user_id))) {
        return res.status(400).json({ error: "user_id không hợp lệ" });
      }

      const existingFlashcard = await flashcardModel.getFlashcardById(Number(flashcardId));
      if (!existingFlashcard) {
        return res.status(404).json({ error: "Flashcard gốc không tồn tại" });
      }

      const copiedFlashcard = await flashcardModel.copyFlashcardToPersonal(Number(flashcardId), Number(user_id));

      return res.status(201).json({
        message: "Flashcard được sao chép vào bộ cá nhân thành công",
        data: copiedFlashcard,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateFlashcard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { word, meaning, example_sentence } = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID flashcard không hợp lệ" });
      }

      if (!word || !meaning) {
        return res.status(400).json({
          error: "word and meaning are required",
        });
      }

      const existingFlashcard = await flashcardModel.getFlashcardById(Number(id));
      if (!existingFlashcard) {
        return res.status(404).json({ error: "Flashcard không tồn tại" });
      }

      const flashcard = await flashcardModel.updateFlashcard(Number(id), word, meaning, example_sentence);
      return res.status(200).json({
        message: "Flashcard được cập nhật thành công",
        data: flashcard,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFlashcard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID flashcard không hợp lệ" });
      }

      const success = await flashcardModel.deleteFlashcard(Number(id));

      if (!success) {
        return res.status(404).json({ error: "Flashcard không tồn tại" });
      }

      return res.status(200).json({ message: "Flashcard được xóa thành công" });
    } catch (error) {
      next(error);
    }
  }
}

export default new FlashcardController();
