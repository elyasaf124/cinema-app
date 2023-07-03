import express from "express";
import { getAllCinema, getCinemaById } from "../controllers/cinemaController";

export const router = express.Router();

router.route("/").get(getAllCinema);
router.route("/:id").get(getCinemaById);
