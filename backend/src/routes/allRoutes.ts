import express from "express";
import { getAll } from "../controllers/allController";

export const router = express.Router();

router.route("/").get(getAll);
