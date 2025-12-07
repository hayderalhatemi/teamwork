// routes/authRoutes.js
import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// register
router.get("/register", authController.showRegister);
router.post(
  "/register",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  authController.register
);

// login
router.get("/login", authController.showLogin);
router.post(
  "/login",
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  authController.login
);

// logout
router.post("/logout", authController.logout);

export default router;
