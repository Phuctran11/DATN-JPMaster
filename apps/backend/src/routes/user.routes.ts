import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/google-login", userController.googleLogin.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
