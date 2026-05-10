import databaseService from "../services/database.service.js";

export interface Course {
  course_id: number;
  title: string;
  description: string | null;
  price: number;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

const formatCourse = (row: any): Course => ({
  ...row,
  price: Number(row.price),
});

export class CourseModel {
  async createCourse(
    title: string,
    description: string | null,
    price: number,
    createdBy: number
  ): Promise<Course> {
    const query = `
      INSERT INTO "Course" (title, description, price, created_by, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING course_id, title, description, price, created_by, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [title, description, price, createdBy]);
    return formatCourse(result.rows[0]);
  }

  async getCourseById(courseId: number): Promise<Course | null> {
    const query = `
      SELECT course_id, title, description, price, created_by, created_at, updated_at
      FROM "Course"
      WHERE course_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [courseId]);
    return result.rows[0] ? formatCourse(result.rows[0]) : null;
  }

  async getAllCourses(limit: number = 10, offset: number = 0): Promise<Course[]> {
    const query = `
      SELECT course_id, title, description, price, created_by, created_at, updated_at
      FROM "Course"
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await databaseService.executeQuery(query, [limit, offset]);
    return result.rows.map(formatCourse);
  }

  async getCoursesByCreator(createdBy: number, limit: number = 10, offset: number = 0): Promise<Course[]> {
    const query = `
      SELECT course_id, title, description, price, created_by, created_at, updated_at
      FROM "Course"
      WHERE created_by = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await databaseService.executeQuery(query, [createdBy, limit, offset]);
    return result.rows.map(formatCourse);
  }

  async updateCourse(
    courseId: number,
    title: string,
    description: string | null,
    price: number
  ): Promise<Course | null> {
    const query = `
      UPDATE "Course"
      SET title = $1, description = $2, price = $3, updated_at = NOW()
      WHERE course_id = $4
      RETURNING course_id, title, description, price, created_by, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [title, description, price, courseId]);
    return result.rows[0] ? formatCourse(result.rows[0]) : null;
  }

  async deleteCourse(courseId: number): Promise<boolean> {
    const query = `DELETE FROM "Course" WHERE course_id = $1;`;
    const result = await databaseService.executeQuery(query, [courseId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new CourseModel();
