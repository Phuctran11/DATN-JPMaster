import { Router } from "express";
import quizController from "../controllers/quiz.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/lessons/:lessonId", authMiddleware, (req, res, next) =>
  quizController.getLessonQuiz(req, res, next)
);

router.get("/courses/:courseId/final", authMiddleware, (req, res, next) =>
  quizController.getFinalQuiz(req, res, next)
);

router.post("/:quizId/start", authMiddleware, (req, res, next) =>
  quizController.startQuiz(req, res, next)
);

router.post("/:quizId/submit", authMiddleware, (req, res, next) =>
  quizController.submitQuiz(req, res, next)
);

export default router;
