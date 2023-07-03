import mongoose from "mongoose";

const cinemaShcema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "A movie must have a name"],
    // minlength: [2, "A cinema name must have more or equal then 2 characters"],
  },
  numsRooms: {
    type: Number,
  },
  address: {
    type: String,
  },
  activityTime: {
    type: Object,
    open: String,
    close: String,
  },
  accessibility: {
    type: Boolean,
  },
});

export const Cinema = mongoose.model("Cinema", cinemaShcema);
