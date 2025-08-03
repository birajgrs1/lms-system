import { Router } from "express";

import {
  userRegister,
  userLogin,
  userLogout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getUsers,
} from "../../controllers/authController/authController.js";

import { authMiddleware } from "../../middlewares/authMiddleWare.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", authMiddleware, userLogout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/users", authMiddleware, getUsers);

export default router;
