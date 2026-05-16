import databaseService from '../services/database.service.js';

export interface CourseRating {
  rating_id: number;
  course_id: number;
  user_id: number;
  rating: number;
  review: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CourseRatingWithUser extends CourseRating {
  username?: string;
}

const formatRating = (row: any): CourseRating => ({
  ...row,
  rating: Number(row.rating),
});

export class RatingModel {
  async getCourseRatings(courseId: number, limit: number = 10, offset: number = 0): Promise<CourseRatingWithUser[]> {
    const query = `
      SELECT cr.rating_id, cr.course_id, cr.user_id, cr.rating, cr.review, cr.created_at, cr.updated_at, u.username
      FROM "CourseRating" cr
      JOIN "User" u ON cr.user_id = u.user_id
      WHERE cr.course_id = $1
      ORDER BY cr.created_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await databaseService.executeQuery(query, [courseId, limit, offset]);
    return result.rows.map((row) => ({
      ...formatRating(row),
      username: row.username,
    }));
  }

  async getAverageRating(courseId: number): Promise<number> {
    const query = `
      SELECT AVG(rating) as average_rating
      FROM "CourseRating"
      WHERE course_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [courseId]);
    const average = result.rows[0]?.average_rating;
    return average ? Number(average) : 0;
  }

  async getRatingCount(courseId: number): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM "CourseRating"
      WHERE course_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [courseId]);
    return Number(result.rows[0]?.count || 0);
  }

  async createRating(
    courseId: number,
    userId: number,
    rating: number,
    review?: string
  ): Promise<CourseRating> {
    const query = `
      INSERT INTO "CourseRating" (course_id, user_id, rating, review, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING rating_id, course_id, user_id, rating, review, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [
      courseId,
      userId,
      rating,
      review || null,
    ]);
    return formatRating(result.rows[0]);
  }

  async updateRating(
    ratingId: number,
    rating: number,
    review?: string
  ): Promise<CourseRating | null> {
    const query = `
      UPDATE "CourseRating"
      SET rating = $1, review = $2, updated_at = NOW()
      WHERE rating_id = $3
      RETURNING rating_id, course_id, user_id, rating, review, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [rating, review || null, ratingId]);
    return result.rows[0] ? formatRating(result.rows[0]) : null;
  }

  async getUserCourseRating(userId: number, courseId: number): Promise<CourseRating | null> {
    const query = `
      SELECT rating_id, course_id, user_id, rating, review, created_at, updated_at
      FROM "CourseRating"
      WHERE user_id = $1 AND course_id = $2;
    `;
    const result = await databaseService.executeQuery(query, [userId, courseId]);
    return result.rows[0] ? formatRating(result.rows[0]) : null;
  }

  async getRatingById(ratingId: number): Promise<CourseRating | null> {
    const query = `
      SELECT rating_id, course_id, user_id, rating, review, created_at, updated_at
      FROM "CourseRating"
      WHERE rating_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [ratingId]);
    return result.rows[0] ? formatRating(result.rows[0]) : null;
  }

  async deleteRating(ratingId: number): Promise<boolean> {
    const query = `DELETE FROM "CourseRating" WHERE rating_id = $1;`;
    const result = await databaseService.executeQuery(query, [ratingId]);
    return (result.rowCount ?? 0) > 0;
  }

  async getTopRatedCoursesWithReviews(limit: number = 3): Promise<Array<{ course_id: number; course_title: string; average_rating: number; rating_id: number; user_id: number; username: string; rating: number; review: string | null; created_at: Date }>> {
    const query = `
      SELECT DISTINCT ON (c.course_id)
        c.course_id,
        c.title as course_title,
        COALESCE(AVG(cr.rating) OVER (PARTITION BY c.course_id), 0) as average_rating,
        cr.rating_id,
        cr.user_id,
        u.username,
        cr.rating,
        cr.review,
        cr.created_at
      FROM "Course" c
      LEFT JOIN "CourseRating" cr ON c.course_id = cr.course_id
      LEFT JOIN "User" u ON cr.user_id = u.user_id
      WHERE cr.rating_id IS NOT NULL
      ORDER BY c.course_id, cr.created_at DESC, COALESCE(AVG(cr.rating) OVER (PARTITION BY c.course_id), 0) DESC
      LIMIT $1;
    `;
    const result = await databaseService.executeQuery(query, [limit]);
    return result.rows.map((row) => ({
      ...row,
      rating: Number(row.rating),
      average_rating: Number(row.average_rating),
    }));
  }
}

export default new RatingModel();
