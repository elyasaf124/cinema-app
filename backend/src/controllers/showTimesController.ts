import { Request, Response, NextFunction } from "express";

import { ShowTimes } from "../models/showTimes";
import moment from "moment";
import mongoose from "mongoose";

export const addShowTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.data);
    const showTimes = await ShowTimes.create(req.body.data);
    res.status(200).json({
      status: "success",
      data: {
        showTimes,
      },
    });
  } catch (error) {
    console.log("asdad", error);
    res.status(400).json({
      status: "fail",
      msg: "Showtime overlaps with existing showtime",
    });
  }
};
export const deleteShowTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.id);
    await ShowTimes.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("asdad", error);
  }
};

export const getAllShowTimes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTimes = await ShowTimes.find({})
      .populate("movies")
      .sort({ hour: 1 })
      .exec();
    res.status(200).json({
      status: "success",
      results: showTimes.length,
      data: {
        showTimes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getshowTimeBydetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateMoment = moment(req.params.date, "DD/MM/YYYY");
  let date = dateMoment.unix();
  const endDay = date + 86400;
  try {
    const showTimes = await ShowTimes.find({
      cinemaIdRef: req.params.cinemaId,
      date: {
        $gte: date,
        $lt: endDay,
      },
    })
      .populate("movies")
      .sort({ hour: 1 })
      .exec();
    res.status(200).json({
      status: "success",
      results: showTimes.length,
      data: {
        showTimes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getshowTimeByFulldetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateMoment = moment(req.params.date, "DD/MM/YYYY");
  let date = dateMoment.unix();
  try {
    const showTimes = await ShowTimes.find({
      cinemaIdRef: req.params.cinemaId,
      movies: req.params.movieId,
      date: date,
    })
      .sort({ hour: 1 })
      .exec();
    res.status(200).json({
      status: "success",
      results: showTimes.length,
      data: {
        showTimes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getshowTimeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTime = await ShowTimes.findById(req.params.showtimeId)
      .populate("roomId")
      .populate("movies")
      .populate("cinemaIdRef");

    res.status(200).json({
      status: "success",
      data: {
        showTime,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getShowTimeByMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTime = await ShowTimes.find({ movies: req.params.movieId })
      .populate("roomId")
      .populate("movies")
      .populate("cinemaIdRef")
      .sort({ date: 1 })
      .sort({ hour: 1 });

    // Convert date to dd/mm/yyyy format
    const formattedShowTime = showTime.map((show: any) => {
      // Convert Unix timestamp to JavaScript Date object
      const date = new Date(show.date * 1000);
      // Format date using moment.js to dd/mm/yyyy format
      // const formattedDate = moment(date).format("DD/MM/YYYY");
      // Return updated show object with formatted date
      return { ...show._doc, date: date };
    });
    console.log(formattedShowTime);
    res.status(200).json({
      status: "success",
      data: {
        showTime: formattedShowTime,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getShowTimeByMovieIdNoPop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTime = await ShowTimes.find({ movies: req.params.movieId })
      .sort({ date: 1 })
      .sort({ hour: 1 });

    res.status(200).json({
      status: "success",
      data: {
        showTime,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const showTimeUpdateSeats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTime = await ShowTimes.findByIdAndUpdate(req.params.showTimeId, {
      $addToSet: { seats: { $each: req.body.arr } },
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        showTime,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateDateToNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showTime = await ShowTimes.find({});
    for (const show of showTime) {
      //@ts-ignore
      show.date = parseInt(show.date); // Convert to number
      await show.save(); // Save the updated movie
    }
    res.send("sucess");
  } catch (error) {
    console.log(error);
  }
};

export const getAndUpdateAllShowTimeDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tenDaysInSeconds = 10 * 24 * 60 * 60; // 10 days in seconds
    const nowInSeconds = Math.floor(new Date().getTime() / 1000); // Current time in seconds
    const endNextTenDays = nowInSeconds + tenDaysInSeconds; // End time within the next 10 days

    // Find all documents that need to be updated
    const showTimesToUpdate = await ShowTimes.find({
      date: { $lte: new Date(nowInSeconds * 1000) }, // Filter to find dates in the past
    });

    // Update each document with a unique random date within the next 10 days
    const updatePromises = showTimesToUpdate.map(async (showTime) => {
      const randomDateInSeconds = Math.floor(
        Math.random() * (endNextTenDays - nowInSeconds) + nowInSeconds
      );

      // Update the document with the unique random date
      return ShowTimes.updateOne(
        { _id: showTime._id },
        { $set: { date: randomDateInSeconds } }
      );
    });

    // Execute all update promises
    const updateResults = await Promise.all(updatePromises);

    console.log(updateResults.length);
    res.json({ message: "Show times updated successfully.", updateResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred." });
  }
};
