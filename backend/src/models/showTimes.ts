import mongoose from "mongoose";
import moment from "moment";

// import validator from "validator";

const showTimesShcema = new mongoose.Schema({
  cinemaIdRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CinemaRooms",
  },

  hourDetails: {
    start: {
      type: Number,
    },
    end: {
      type: Number,
    },
  },
  hour: {
    type: String,
  },
  date: {
    type: String,
  },
  seats: {
    type: Array,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

showTimesShcema.pre("save", function (next): void {
  const movie: any = this;
  movie.date = moment(movie.date, "DD/MM/YYYY").unix();
  next();
});

// Define a pre 'save' hook on the Showtime schema
showTimesShcema.pre("save", async function (next) {
  console.log("here");
  const newShowtime = this; // 'this' refers to the current Showtime document being saved

  // Fetch existing showtimes for the same cinema, same room, and same date
  const existingShowtimes = await mongoose.model("ShowTimes").find({
    cinemaIdRef: newShowtime.cinemaIdRef,
    roomId: newShowtime.roomId,
    date: newShowtime.date,
  });

  for (const showtime of existingShowtimes) {
    // Check if new showtime overlaps with existing showtime
    if (
      newShowtime.hourDetails?.start &&
      newShowtime.hourDetails?.end &&
      showtime.hourDetails?.start &&
      showtime.hourDetails?.end &&
      ((newShowtime.hourDetails.start >= showtime.hourDetails.start &&
        newShowtime.hourDetails.start < showtime.hourDetails.end) ||
        // Check if new showtime ends during existing showtime
        (newShowtime.hourDetails.end > showtime.hourDetails.start &&
          newShowtime.hourDetails.end <= showtime.hourDetails.end) ||
        // Check if existing showtime starts during new showtime
        (showtime.hourDetails.start >= newShowtime.hourDetails.start &&
          showtime.hourDetails.start < newShowtime.hourDetails.end) ||
        // Check if new showtime starts before existing showtime but ends after it
        (newShowtime.hourDetails.start < showtime.hourDetails.start &&
          newShowtime.hourDetails.end > showtime.hourDetails.end))
    ) {
      // If overlap is found, reject the save operation with an error
      return next(new Error("Showtime overlaps with existing showtime"));
    }
  }

  // If no overlaps found, proceed to save the new showtime
  next();
});

export const ShowTimes = mongoose.model("ShowTimes", showTimesShcema);
