import express from "express";
import {
  getAllRooms,
  getRoomByCinemaId,
  getRoomById,
} from "../controllers/cinemaRoomController";

export const router = express.Router();

router.route("/").get(getAllRooms);
router.route("/:id").get(getRoomById);
router.route("/getRoomByCinema/:id").get(getRoomByCinemaId);
