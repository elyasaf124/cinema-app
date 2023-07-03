import express from "express";
import {
  getAllMovies,
  getMovieById,
  addMovie,
  getMovieByIdAndUpdate,
  getMovieByIdAndDelete,
} from "../controllers/movieController";
import { restrictTo } from "../controllers/authController";

export const router = express.Router();

router.route("/").get(getAllMovies);
router.route("/").post(restrictTo("admin"),addMovie);
router.route("/:id").get(getMovieById);
router.route("/:id").patch(restrictTo("admin"),getMovieByIdAndUpdate);
router.route("/:id").delete(restrictTo("admin"),getMovieByIdAndDelete);
