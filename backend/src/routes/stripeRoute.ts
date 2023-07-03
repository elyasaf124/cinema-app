import express from "express";
import { showTimeUpdateSeats } from "../controllers/showTimesController";
import { createCheckOutSession } from "../controllers/stripeController";
import { webhook } from "../controllers/webhookController";

export const router = express.Router();

router.route("/create-checkout-session").post(createCheckOutSession, webhook);
