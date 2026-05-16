import databaseService from '../services/database.service.js';

/**
 * CourseEnrollment Interface
 * Represents a user's enrollment in a course (access tracking)
 */
export interface CourseEnrollment {
  enrollment_id: number;
  user_id: number;
  course_id: number;
  enrollment_date: Date;
  status: 'active' | 'completed' | 'dropped';
}

/**
 * Format database row to CourseEnrollment object
 */
const formatEnrollment = (row: any): CourseEnrollment => ({
  enrollment_id: row.enrollment_id,
  user_id: row.user_id,
  course_id: row.course_id,
  enrollment_date: row.enrollment_date,
  status: row.status,
});

/**
 * CourseEnrollmentModel
 * Handles course enrollment/access tracking
 * Separate from Purchase which handles payment transactions
 *
 * Responsibilities:
 * - Track who has access to which courses
 * - Manage enrollment lifecycle (active → completed/dropped)
 * - Verify user course access
 * - Support both free and paid course enrollments
 */
export class CourseEnrollmentModel {
  /**
   * Get all courses user is enrolled in
   * Returns paginated list ordered by most recent enrollment
   *
   * @param userId - User ID
   * @param limit - Number of records to return (default: 10, max: 100)
   * @param offset - Pagination offset (default: 0)
   * @returns Array of CourseEnrollment records
   * @throws Error if database query fails
   */
  async getEnrolledCourses(
    userId: number,
    limit: number = 10,
    offset: number = 0
  ): Promise<CourseEnrollment[]> {
    const limitSafe = Math.min(limit, 100);

    const query = `
      SELECT enrollment_id, user_id, course_id, enrollment_date, status
      FROM "CourseEnrollment"
      WHERE user_id = $1
      ORDER BY enrollment_date DESC
      LIMIT $2 OFFSET $3;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, limitSafe, offset]);
      return result.rows.map(formatEnrollment);
    } catch (error) {
      throw new Error(`Failed to fetch enrolled courses for user ${userId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if user has access to a specific course
   * Quick check without returning full enrollment record
   *
   * @param userId - User ID
   * @param courseId - Course ID
   * @returns true if user is enrolled in course, false otherwise
   * @throws Error if database query fails
   */
  async checkUserCourseAccess(userId: number, courseId: number): Promise<boolean> {
    const query = `
      SELECT 1
      FROM "CourseEnrollment"
      WHERE user_id = $1 AND course_id = $2
      LIMIT 1;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, courseId]);
      return result.rows.length > 0;
    } catch (error) {
      throw new Error(
        `Failed to check course access for user ${userId}, course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Enroll a user in a course
   * Creates a new enrollment record with 'active' status
   *
   * @param userId - User ID
   * @param courseId - Course ID
   * @param status - Initial enrollment status (default: 'active')
   * @returns Created CourseEnrollment record
   * @throws Error if enrollment already exists or database fails
   */
  async enrollUser(
    userId: number,
    courseId: number,
    status: 'active' | 'completed' | 'dropped' = 'active'
  ): Promise<CourseEnrollment> {
    const query = `
      INSERT INTO "CourseEnrollment" (user_id, course_id, enrollment_date, status)
      VALUES ($1, $2, NOW(), $3)
      RETURNING enrollment_id, user_id, course_id, enrollment_date, status;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, courseId, status]);

      if (!result.rows[0]) {
        throw new Error('Failed to create enrollment record');
      }

      return formatEnrollment(result.rows[0]);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new Error(`User ${userId} is already enrolled in course ${courseId}`);
      }
      throw new Error(
        `Failed to enroll user ${userId} in course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update enrollment status
   * Used to mark course as completed or dropped
   *
   * @param enrollmentId - Enrollment ID to update
   * @param status - New enrollment status
   * @returns Updated CourseEnrollment record, or null if not found
   * @throws Error if database fails
   */
  async updateEnrollmentStatus(
    enrollmentId: number,
    status: 'active' | 'completed' | 'dropped'
  ): Promise<CourseEnrollment | null> {
    const query = `
      UPDATE "CourseEnrollment"
      SET status = $1
      WHERE enrollment_id = $2
      RETURNING enrollment_id, user_id, course_id, enrollment_date, status;
    `;

    try {
      const result = await databaseService.executeQuery(query, [status, enrollmentId]);
      return result.rows[0] ? formatEnrollment(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to update enrollment status for enrollment ${enrollmentId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get specific enrollment by ID
   *
   * @param enrollmentId - Enrollment ID
   * @returns CourseEnrollment record, or null if not found
   * @throws Error if database fails
   */
  async getEnrollmentById(enrollmentId: number): Promise<CourseEnrollment | null> {
    const query = `
      SELECT enrollment_id, user_id, course_id, enrollment_date, status
      FROM "CourseEnrollment"
      WHERE enrollment_id = $1;
    `;

    try {
      const result = await databaseService.executeQuery(query, [enrollmentId]);
      return result.rows[0] ? formatEnrollment(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch enrollment ${enrollmentId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Delete enrollment record
   * Removes user's access to course
   *
   * @param enrollmentId - Enrollment ID to delete
   * @returns true if deletion successful, false if enrollment not found
   * @throws Error if database fails
   */
  async deleteEnrollment(enrollmentId: number): Promise<boolean> {
    const query = `DELETE FROM "CourseEnrollment" WHERE enrollment_id = $1;`;

    try {
      const result = await databaseService.executeQuery(query, [enrollmentId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw new Error(
        `Failed to delete enrollment ${enrollmentId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get enrolled courses by status
   * Returns paginated list of enrollments filtered by status
   *
   * @param userId - User ID
   * @param status - Enrollment status ('active' | 'completed' | 'dropped')
   * @param limit - Number of records to return (default: 10, max: 100)
   * @param offset - Pagination offset (default: 0)
   * @returns Array of CourseEnrollment records with matching status
   * @throws Error if database query fails
   */
  async getEnrolledCoursesByStatus(
    userId: number,
    status: 'active' | 'completed' | 'dropped',
    limit: number = 10,
    offset: number = 0
  ): Promise<CourseEnrollment[]> {
    const limitSafe = Math.min(limit, 100);
    const validStatuses = ['active', 'completed', 'dropped'];

    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
    }

    const query = `
      SELECT enrollment_id, user_id, course_id, enrollment_date, status
      FROM "CourseEnrollment"
      WHERE user_id = $1 AND status = $2
      ORDER BY enrollment_date DESC
      LIMIT $3 OFFSET $4;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, status, limitSafe, offset]);
      return result.rows.map(formatEnrollment);
    } catch (error) {
      throw new Error(
        `Failed to fetch enrolled courses by status for user ${userId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get enrollment by user and course
   * Helper to find existing enrollment without needing enrollment_id
   *
   * @param userId - User ID
   * @param courseId - Course ID
   * @returns CourseEnrollment record, or null if not found
   * @throws Error if database fails
   */
  async getEnrollmentByUserAndCourse(userId: number, courseId: number): Promise<CourseEnrollment | null> {
    const query = `
      SELECT enrollment_id, user_id, course_id, enrollment_date, status
      FROM "CourseEnrollment"
      WHERE user_id = $1 AND course_id = $2;
    `;

    try {
      const result = await databaseService.executeQuery(query, [userId, courseId]);
      return result.rows[0] ? formatEnrollment(result.rows[0]) : null;
    } catch (error) {
      throw new Error(
        `Failed to fetch enrollment for user ${userId}, course ${courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

export default new CourseEnrollmentModel();
