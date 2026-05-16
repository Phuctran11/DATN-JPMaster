import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import ratingModel from "../models/rating.model.js";
import enrollmentModel from "../models/enrollment.model.js";

export class RatingController {
  async getCourseRatings(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      if (!courseId || isNaN(Number(courseId))) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      const limit = Math.min(Number(req.query.limit) || 5, 50);
      const offset = Number(req.query.offset) || 0;

      const ratings = await ratingModel.getCourseRatings(Number(courseId), limit, offset);
      const average_rating = await ratingModel.getAverageRating(Number(courseId));
      const rating_count = await ratingModel.getRatingCount(Number(courseId));

      return res.status(200).json({
        data: ratings,
        average_rating,
        rating_count,
      });
    } catch (error) {
      next(error);
    }
  }

  async createRating(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { courseId } = req.params;
      const { rating, review } = req.body;

      if (!courseId || isNaN(Number(courseId))) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }

      // Check if user has access to this course (has enrolled in it)
      const hasAccess = await enrollmentModel.checkUserCourseAccess(req.user.user_id, Number(courseId));
      if (!hasAccess) {
        return res.status(403).json({ error: "You must enroll in this course to leave a review" });
      }

      // Check if user already rated this course
      const existingRating = await ratingModel.getUserCourseRating(req.user.user_id, Number(courseId));
      if (existingRating) {
        return res.status(409).json({ error: "You have already rated this course. Update your existing rating." });
      }

      const newRating = await ratingModel.createRating(
        Number(courseId),
        req.user.user_id,
        Number(rating),
        review
      );

      return res.status(201).json({
        message: "Rating created successfully",
        data: newRating,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRating(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { ratingId } = req.params;
      const { rating, review } = req.body;

      if (!ratingId || isNaN(Number(ratingId))) {
        return res.status(400).json({ error: "Invalid rating ID" });
      }

      if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }

      // Verify ownership - fetch the rating and check if user_id matches
      const existingRating = await ratingModel.getRatingById(Number(ratingId));
      if (!existingRating) {
        return res.status(404).json({ error: "Rating not found" });
      }

      if (existingRating.user_id !== req.user.user_id) {
        return res.status(403).json({ error: "You can only update your own ratings" });
      }

      const updatedRating = await ratingModel.updateRating(Number(ratingId), Number(rating), review);

      return res.status(200).json({
        message: "Rating updated successfully",
        data: updatedRating,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRating(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { ratingId } = req.params;

      if (!ratingId || isNaN(Number(ratingId))) {
        return res.status(400).json({ error: "Invalid rating ID" });
      }

      const success = await ratingModel.deleteRating(Number(ratingId));
      if (!success) {
        return res.status(404).json({ error: "Rating not found" });
      }

      return res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getTopRatedCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Math.min(Number(req.query.limit) || 3, 10);
      const reviews = await ratingModel.getTopRatedCoursesWithReviews(limit);

      return res.status(200).json({
        data: reviews,
        count: reviews.length,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RatingController();
