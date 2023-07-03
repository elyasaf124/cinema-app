import express from "express";
import {
  auth,
  logOut,
  login,
  protect,
  signup,
} from "../controllers/authController";

export const router = express.Router();

router.route("/register").post(signup);
router.route("/login").post(protect, login);

router.get("/logout", logOut);
