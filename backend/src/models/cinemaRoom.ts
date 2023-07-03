import mongoose from "mongoose";
// import validator from "validator";

const cinemaRoomShcema = new mongoose.Schema({
  numsRows: {
    type: Number,
  },
  roomNumber: {
    type: Number,
  },
  cinemaId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  numsSetEachRow: {
    type: Array,
  },
});

export const CinemaRooms = mongoose.model("CinemaRooms", cinemaRoomShcema);
