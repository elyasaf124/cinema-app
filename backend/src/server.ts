import mongoose from "mongoose";
import fs from "fs";
//מאפשר לגשת למידע ששמור בקובץ אנוו
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { app } from "./app";
import moment from "moment";
import { CinemaRooms } from "./models/cinemaRoom";
import { ShowTimes } from "./models/showTimes";
import showTimes from "./dataJSON/showTimes.json";

if (process.env.NODE_ENV === "production") {
  console.log("prod");
} else {
  console.log("dev");
}

let DB: string = "";
if (process.env && process.env.DATABASE) {
  DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASS ?? ""
  );
  // use the value of process.env.DATABASE
} else {
  // handle the case where process.env.DATABASE is undefined
}

// const DB: any = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("mongo connect");

    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dataJSON/showTimes.json`, "utf-8")
);
// ShowTimes.create(data);

// console.log("ss", data);
// const formattedArray = data.map((obj: any) => {
//   // Convert date string to Date object
//   const dateOfBirth = moment(obj.date, "DD/MM/YYYY").toDate();

//   // Format the date object to dd/mm/yyyy format
//   const formattedDate = moment(dateOfBirth).format("DD/MM/YYYY");

//   // Replace the original date string with the formatted date string in the object
//   return {
//     cinemaIdRef: obj.cinemaIdRef,
//     roomId: obj.roomId,
//     hour: obj.hour,
//     date: obj.formattedDate,
//     movies: obj.movies,
//   };
// });

// ShowTimes.create(formattedArray);
// const importData = async () => {
//   try {
//     await ShowTimes.create(data);
//     console.log("data successfully imported");
//     // to exit the process
//     // process.exit();
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// importData();

// DB.movies.insertMany(sss);

// const data = JSON.parse(
//   fs.readFileSync(`${__dirname}/dataJSON/showTimes.json`, "utf-8")
// );

const formattedArray = data.map((obj: any) => {
  // Convert date string to Date object
  const dateOfBirth = moment(obj.date, "DD/MM/YYYY").toDate();

  // Format the date object to dd/mm/yyyy format
  const formattedDate = moment(dateOfBirth).format("DD/MM/YYYY");

  // Replace the original date string with the formatted date string in the object
  return {
    cinemaIdRef: obj.cinemaIdRef,
    roomId: obj.roomId,
    hour: obj.hour,
    date: formattedDate,
    movies: obj.movies,
  };
});

// // Insert the modified array into MongoDB
// ShowTimes.insertMany(formattedArray);
// ShowTimes.create(formattedArray);
// const data = JSON.parse(
//   fs.readFileSync(`${__dirname}/dataJSON/showTimes.json`, "utf-8")
// );

// const formattedArray = data.map((obj: any) => {
//   // Convert date string to Date object
//   const dateOfBirth = moment(obj.date, "DD/MM/YYYY").toDate();

//   // Replace the original date string with the Date object
//   return {
//     cinemaIdRef: obj.cinemaIdRef,
//     roomId: obj.roomId,
//     hour: obj.hour,
//     date: dateOfBirth,
//     movies: obj.movies,
//   };
// });

// Insert the modified array into MongoDB
// ShowTimes.create(formattedArray);
