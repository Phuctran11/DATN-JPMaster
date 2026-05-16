import { Router } from "express";
import courseController from "../controllers/course.controller.js";

const router = Router();

router.post("/", courseController.createCourse.bind(courseController));
router.get("/", courseController.getAllCourses.bind(courseController));
router.get("/popular", courseController.getPopularCourses.bind(courseController));
router.get("/creator/:userId", courseController.getCoursesByCreator.bind(courseController));
router.get("/:id", courseController.getCourse.bind(courseController));
router.put("/:id", courseController.updateCourse.bind(courseController));
router.delete("/:id", courseController.deleteCourse.bind(courseController));

export default router;
