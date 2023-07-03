import { Cinema } from "../models/cinemaModule";
import { Request, Response, NextFunction } from "express";

export const getAllCinema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema = await Cinema.find({});
    res.status(200).json({
      status: "success",
      results: cinema.length,
      data: {
        cinema,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCinemaById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        cinema,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
