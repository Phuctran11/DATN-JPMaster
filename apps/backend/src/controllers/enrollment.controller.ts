import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import enrollmentModel from "../models/enrollment.model.js";
import purchaseModel from "../models/purchase.model.js";
import courseModel from "../models/course.model.js";

export class EnrollmentController {
  /**
   * Get user's enrolled courses
   * Returns all enrollments regardless of status
   *
   * @route GET /api/enrollments/my-courses
   * @query limit - Page size (default: 10, max: 100)
   * @query offset - Pagination offset (default: 0)
   * @returns Array of enrollments with course details and lessons
   */
  async getMyCourses(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const userId = req.user.user_id;

      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      // Get enrollments for the user
      const enrollments = await enrollmentModel.getEnrolledCourses(userId, limit, offset);

      // Enrich with course data and lessons
      const coursesWithEnrollmentInfo = await Promise.all(
        enrollments.map(async (enrollment) => {
          const courseWithLessons = await courseModel.getCourseByIdWithLessons(enrollment.course_id);
          const progressSummary = await courseModel.getCourseProgressSummary(userId, enrollment.course_id);
          return {
            ...enrollment,
            course: courseWithLessons,
            progress_percent: progressSummary.progressPercent,
            completed_lessons: progressSummary.completedLessons,
            total_lessons: progressSummary.totalLessons,
          };
        })
      );

      return res.status(200).json({
        data: coursesWithEnrollmentInfo,
        count: coursesWithEnrollmentInfo.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get enrolled courses by status
   * Filter courses by enrollment status (active, completed, dropped)
   *
   * @route GET /api/enrollments/my-courses/:status
   * @param status - 'active' | 'completed' | 'dropped'
   * @query limit - Page size (default: 10, max: 100)
   * @query offset - Pagination offset (default: 0)
   * @returns Array of enrollments filtered by status
   */
  async getMyCoursesByStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const userId = req.user.user_id;

      const { status } = req.params;
      const validStatuses = ["active", "completed", "dropped"];

      if (typeof status !== 'string' || !validStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }

      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      // Get enrollments filtered by status at database level
      const enrollments = await enrollmentModel.getEnrolledCoursesByStatus(
        userId,
        status as 'active' | 'completed' | 'dropped',
        limit,
        offset
      );

      // Enrich with course data and lessons
      const coursesWithEnrollmentInfo = await Promise.all(
        enrollments.map(async (enrollment) => {
          const courseWithLessons = await courseModel.getCourseByIdWithLessons(enrollment.course_id);
          const progressSummary = await courseModel.getCourseProgressSummary(userId, enrollment.course_id);
          return {
            ...enrollment,
            course: courseWithLessons,
            progress_percent: progressSummary.progressPercent,
            completed_lessons: progressSummary.completedLessons,
            total_lessons: progressSummary.totalLessons,
          };
        })
      );

      return res.status(200).json({
        data: coursesWithEnrollmentInfo,
        count: coursesWithEnrollmentInfo.length,
        status,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Enroll user in a course
   * Creates both enrollment (access) and purchase (payment) records
   *
   * @route POST /api/enrollments/enroll
   * @body course_id - Course ID to enroll in
   * @body price_paid - Price paid (optional, uses course price if not provided)
   * @returns { enrollment, purchase } records created
   */
  async enrollCourse(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { course_id, price_paid = 0 } = req.body;

      if (!course_id || isNaN(Number(course_id))) {
        return res.status(400).json({ error: "course_id is required and must be a number" });
      }

      // Check if course exists
      const course = await courseModel.getCourseById(Number(course_id));
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Check if user already enrolled
      const alreadyEnrolled = await enrollmentModel.checkUserCourseAccess(
        req.user.user_id,
        Number(course_id)
      );
      if (alreadyEnrolled) {
        return res.status(409).json({ error: "User already enrolled in this course" });
      }

      // 1. Create enrollment record
      const enrollment = await enrollmentModel.enrollUser(req.user.user_id, Number(course_id), "active");

      // 2. Create purchase record (if course is paid)
      const finalPrice = price_paid || Number(course.price);
      const purchase = await purchaseModel.createPurchase(
        req.user.user_id,
        Number(course_id),
        finalPrice,
        "completed",
        undefined,
        "standard"
      );

      return res.status(201).json({
        message: "Successfully enrolled in course",
        data: {
          enrollment,
          purchase,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update enrollment status
   * Change enrollment status (active -> completed or dropped)
   *
   * @route PUT /api/enrollments/:enrollmentId
   * @param enrollmentId - Enrollment ID to update
   * @body status - New status ('active' | 'completed' | 'dropped')
   * @returns Updated enrollment record
   */
  async updateEnrollmentStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { enrollmentId } = req.params;
      const { status } = req.body;

      if (!enrollmentId || isNaN(Number(enrollmentId))) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      const validStatuses = ["active", "completed", "dropped"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }

      // Get enrollment and verify ownership
      const enrollment = await enrollmentModel.getEnrollmentById(Number(enrollmentId));
      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      if (enrollment.user_id !== req.user.user_id) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Update status
      const updated = await enrollmentModel.updateEnrollmentStatus(Number(enrollmentId), status);

      if (!updated) {
        return res.status(500).json({ error: "Failed to update enrollment" });
      }

      return res.status(200).json({
        message: `Enrollment status updated to '${status}'`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get specific enrolled course details
   * Returns full course details including lessons and ratings for enrolled course
   *
   * @route GET /api/enrollments/course/:courseId
   * @param courseId - Course ID
   * @returns Full course details with lessons and ratings
   */
  async getEnrolledCourseDetail(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { courseId } = req.params;

      if (!courseId || isNaN(Number(courseId))) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      // Verify user has access to this course
      const hasAccess = await enrollmentModel.checkUserCourseAccess(req.user.user_id, Number(courseId));
      if (!hasAccess) {
        return res.status(403).json({ error: "You are not enrolled in this course" });
      }

      // Get course with details (lessons + ratings)
      const courseDetail = await courseModel.getCourseByIdWithDetail(Number(courseId));

      if (!courseDetail) {
        return res.status(404).json({ error: "Course not found" });
      }

      const lessonCompletionMap = await courseModel.getLessonCompletionMap(req.user.user_id, Number(courseId));
      courseDetail.lessons = courseDetail.lessons?.map((lesson) => ({
        ...lesson,
        is_completed: lessonCompletionMap.get(lesson.lesson_id) || false,
      }));

      // Get enrollment record to include status
      const enrollment = await enrollmentModel.getEnrollmentByUserAndCourse(req.user.user_id, Number(courseId));

      return res.status(200).json({
        data: {
          ...courseDetail,
          enrollment_status: enrollment?.status || "active",
          enrollment_date: enrollment?.enrollment_date,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get first lesson for enrolled course
   * Returns the first lesson of a course the user is enrolled in
   *
   * @route GET /api/enrollments/:courseId/first-lesson
   * @param courseId - Course ID
   * @returns First lesson of the course
   */
  async getFirstLessonByCourse(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { courseId } = req.params;

      if (!courseId || isNaN(Number(courseId))) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      // Verify user has access to this course
      const hasAccess = await enrollmentModel.checkUserCourseAccess(req.user.user_id, Number(courseId));
      if (!hasAccess) {
        return res.status(403).json({ error: "You are not enrolled in this course" });
      }

      // Get first lesson
      const lesson = await courseModel.getFirstLessonByCourseId(Number(courseId));

      if (!lesson) {
        return res.status(404).json({ error: "No lessons found for this course" });
      }

      return res.status(200).json({
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get the next unfinished lesson for an enrolled course
   *
   * @route GET /api/enrollments/course/:courseId/next-lesson
   * @param courseId - Course ID
   * @returns First lesson the user has not completed yet
   */
  async getNextLessonForCourse(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { courseId } = req.params;

      if (!courseId || isNaN(Number(courseId))) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      const hasAccess = await enrollmentModel.checkUserCourseAccess(req.user.user_id, Number(courseId));
      if (!hasAccess) {
        return res.status(403).json({ error: "You are not enrolled in this course" });
      }

      const lesson = await courseModel.getNextUnfinishedLessonByUserAndCourse(req.user.user_id, Number(courseId));

      if (!lesson) {
        return res.status(404).json({ error: "No unfinished lessons found for this course" });
      }

      return res.status(200).json({ data: lesson });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete/drop enrollment
   * Remove user from a course (soft delete or mark as dropped)
   *
   * @route DELETE /api/enrollments/:enrollmentId
   * @param enrollmentId - Enrollment ID to delete
   * @returns Success message
   */
  async dropEnrollment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { enrollmentId } = req.params;

      if (!enrollmentId || isNaN(Number(enrollmentId))) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      // Get enrollment and verify ownership
      const enrollment = await enrollmentModel.getEnrollmentById(Number(enrollmentId));
      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      if (enrollment.user_id !== req.user.user_id) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Delete enrollment
      const deleted = await enrollmentModel.deleteEnrollment(Number(enrollmentId));

      if (!deleted) {
        return res.status(500).json({ error: "Failed to drop enrollment" });
      }

      return res.status(200).json({
        message: "Successfully dropped from course",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EnrollmentController();
