import mongoose from "mongoose";

const movieShcema = new mongoose.Schema({
  Title: {
    type: String,
    // required: [true, "A movie must have a title"],
    // minlength: [2, "A movie title must have more or equal then 2 characters"],
  },
  subTitle: {
    type: String,
    // required: [true, "A movie must have a title"],
    // minlength: [2, "A movie title must have more or equal then 2 characters"],
  },
  Year: {
    type: Date,
  },
  Released: {
    type: String,
  },
  Runtime: {
    type: String,
  },
  Genre: {
    type: Array,
  },
  Director: {
    type: String,
  },
  Writer: {
    type: String,
  },
  Actors: {
    type: String,
  },
  Plot: {
    type: String,
  },
  Language: {
    type: Array,
  },
  Poster: {
    type: String,
  },
  Type: {
    type: String,
  },
  LimitAge: {
    type: String,
  },
  Trailer: {
    type: String,
  },
});

export const Movie = mongoose.model("Movie", movieShcema);
