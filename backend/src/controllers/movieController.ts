import { Movie } from "../models/movieModule";
import { Request, Response, NextFunction } from "express";

export const getAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({
      status: "success",
      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const addMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.movie);
    const movie = await Movie.create(req.body.movie);
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMovieByIdAndUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id);
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body.movieUpdate
    );
    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMovieByIdAndDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id);
    await Movie.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
