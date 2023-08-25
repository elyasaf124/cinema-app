import express from "express";
import {
  auth,
  logOut,
  login,
  protect,
  signup,
  stayAwake,
} from "../controllers/authController";

export const router = express.Router();

router.route("/register").post(signup);
router.route("/login").post(protect, login);

router.get("/logout", logOut);

router.route("/stayAwake").get(stayAwake);
