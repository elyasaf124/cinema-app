import { Request, Response, NextFunction } from "express";
import { Movie } from "../models/movieModule";
import { ShowTimes } from "../models/showTimes";
import { CinemaRooms } from "../models/cinemaRoom";
import { Cinema } from "../models/cinemaModule";

console.log("1!")
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.find({});
    const showtimes = await ShowTimes.find({});
    const cinemarooms = await CinemaRooms.find({});
    const cinema = await Cinema.find({});
    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        movies,
        showtimes,
        cinemarooms,
        cinema,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
