import databaseService from "../services/database.service.js";

export interface Flashcard {
  flashcard_id: number;
  user_id: number;
  lesson_id: number;
  word: string;
  meaning: string;
  example_sentence: string | null;
  created_at: Date;
  updated_at: Date;
}

export class FlashcardModel {
  async createFlashcard(
    userId: number,
    word: string,
    meaning: string,
    lessonId: number,
    exampleSentence?: string | null
  ): Promise<Flashcard> {
    const query = `
      INSERT INTO "Flashcard" (user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [
      userId,
      lessonId,
      word,
      meaning,
      exampleSentence || null,
    ]);
    return result.rows[0];
  }

  async getFlashcardById(flashcardId: number): Promise<Flashcard | null> {
    const query = `
      SELECT flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at
      FROM "Flashcard"
      WHERE flashcard_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [flashcardId]);
    return result.rows[0] || null;
  }

  async getAllFlashcards(limit: number = 10, offset: number = 0): Promise<Flashcard[]> {
    const query = `
      SELECT flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at
      FROM "Flashcard"
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await databaseService.executeQuery(query, [limit, offset]);
    return result.rows;
  }

  async getPersonalFlashcardsByUserId(userId: number, limit: number = 10, offset: number = 0): Promise<Flashcard[]> {
    const query = `
      SELECT flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at
      FROM "Flashcard"
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await databaseService.executeQuery(query, [userId, limit, offset]);
    return result.rows;
  }

  async getFlashcardsByLessonId(lessonId: number, limit: number = 10, offset: number = 0): Promise<Flashcard[]> {
    const query = `
      SELECT flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at
      FROM "Flashcard"
      WHERE lesson_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await databaseService.executeQuery(query, [lessonId, limit, offset]);
    return result.rows;
  }

  async getPersonalFlashcardsByUserAndLesson(
    userId: number,
    lessonId: number,
    limit: number = 10,
    offset: number = 0
  ): Promise<Flashcard[]> {
    const query = `
      SELECT flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at
      FROM "Flashcard"
      WHERE user_id = $1 AND lesson_id = $2
      ORDER BY created_at DESC
      LIMIT $3 OFFSET $4;
    `;
    const result = await databaseService.executeQuery(query, [userId, lessonId, limit, offset]);
    return result.rows;
  }

  async copyFlashcardToPersonal(flashcardId: number, userId: number): Promise<Flashcard> {
    const originalFlashcard = await this.getFlashcardById(flashcardId);
    if (!originalFlashcard) {
      throw new Error("Flashcard gốc không tồn tại");
    }

    const query = `
      INSERT INTO "Flashcard" (user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [
      userId,
      originalFlashcard.lesson_id,
      originalFlashcard.word,
      originalFlashcard.meaning,
      originalFlashcard.example_sentence,
    ]);
    return result.rows[0];
  }

  async updateFlashcard(
    flashcardId: number,
    word: string,
    meaning: string,
    exampleSentence?: string | null
  ): Promise<Flashcard | null> {
    const query = `
      UPDATE "Flashcard"
      SET word = $1, meaning = $2, example_sentence = $3, updated_at = NOW()
      WHERE flashcard_id = $4
      RETURNING flashcard_id, user_id, lesson_id, word, meaning, example_sentence, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [word, meaning, exampleSentence || null, flashcardId]);
    return result.rows[0] || null;
  }

  async deleteFlashcard(flashcardId: number): Promise<boolean> {
    const query = `DELETE FROM "Flashcard" WHERE flashcard_id = $1;`;
    const result = await databaseService.executeQuery(query, [flashcardId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new FlashcardModel();
