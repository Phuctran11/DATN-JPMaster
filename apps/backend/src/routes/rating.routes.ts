import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import ratingController from "../controllers/rating.controller.js";

const router = Router();

// Public routes
router.get("/courses/:courseId", ratingController.getCourseRatings.bind(ratingController));
router.get("/top-rated/courses", ratingController.getTopRatedCourses.bind(ratingController));

// Protected routes - require authentication
router.post("/courses/:courseId", authMiddleware, ratingController.createRating.bind(ratingController));
router.put("/:ratingId", authMiddleware, ratingController.updateRating.bind(ratingController));
router.delete("/:ratingId", authMiddleware, ratingController.deleteRating.bind(ratingController));

export default router;
