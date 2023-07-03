import { CinemaRooms } from "../models/cinemaRoom";
import { Request, Response, NextFunction } from "express";

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await CinemaRooms.find({});
    res.status(200).json({
      status: "success",
      results: rooms.length,
      data: {
        rooms,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const room = await CinemaRooms.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        room,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomByCinemaId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("!!!!!", req.params.id);
    const rooms = await CinemaRooms.find({ cinemaId: req.params.id }).sort(
      "roomNumber"
    );
    res.status(200).json({
      status: "success",
      data: {
        rooms,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
