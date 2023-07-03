import express from "express";
import { webhook, webhookRetrive } from "../controllers/webhookController";

export const router = express.Router();

router.route("/:session_id").get(webhookRetrive);
router.route("/").post(webhook);
