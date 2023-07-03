import { createSlice, configureStore } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Iseats {
  id: string;
  seatNum?: string;
  lineNum?: string;
}

export const showTimeSlice = createSlice({
  name: "showtime",
  initialState: {
    showtime: {
      seats: <Iseats[]>[],
    },
    temposeats: {
      seats: <Iseats[]>[],
    },
    stepsBuy: {
      stepOne: true,
      stepTwo: false,
      stepThree: false,
    },
    user: [
      {
        firstname: "",
        lastname: "",
        identityCard: "",
        Email: "",
        phone: "",
      },
    ],
    setDisplayYouTube: {
      displayYouTube: false,
      url: "",
    },
  },
  reducers: {
    addInitialState: (state, action): any => {
      state.showtime = action.payload;
    },
    addSeats: (state, action): any => {
      let isExists = false;
      state.temposeats.seats.forEach((seat) => {
        if (seat.id == action.payload.id) {
          isExists = true;
        }
      });
      if (isExists) {
        showTimeSlice.caseReducers.removeSeats(state, action);
      } else {
        state.temposeats.seats.push(action.payload);
      }
    },
    removeSeats: (state, action): any => {
      console.log("here");
      let updateSeatsArr = state.temposeats.seats.filter((seat) => {
        return seat.id !== action.payload.id;
      });
      state.temposeats.seats = updateSeatsArr;
    },
    setStepBuy: (state): any => {
      if (state.stepsBuy.stepOne && !state.stepsBuy.stepTwo) {
        state.stepsBuy.stepTwo = true;
        state.stepsBuy.stepOne = false;
        return;
      }
      if (
        !state.stepsBuy.stepOne &&
        state.stepsBuy.stepTwo &&
        !state.stepsBuy.stepThree
      ) {
        state.stepsBuy.stepThree = true;
        state.stepsBuy.stepTwo = false;
        state.stepsBuy.stepOne = false;
        return;
      }
    },
    setPrevStepBuy: (state): any => {
      if (state.stepsBuy.stepTwo) {
        state.stepsBuy.stepTwo = false;
        state.stepsBuy.stepThree = false;
        state.stepsBuy.stepOne = true;
        return;
      }
      if (state.stepsBuy.stepThree) {
        state.stepsBuy.stepThree = false;
        state.stepsBuy.stepOne = false;
        state.stepsBuy.stepTwo = true;
        return;
      }
    },
    setUser: (state, action) => {
      console.log(action.payload.id);
      console.log(action.payload.value);
      let i = state.user.findIndex((item: any) => {
        return item === action.payload.id;
      });
      state.user[i] = action.payload.value;
    },
    setDisplayYouTube: (state, action) => {
      state.setDisplayYouTube.displayYouTube =
        !state.setDisplayYouTube.displayYouTube;
      state.setDisplayYouTube.url = action.payload;
    },
  },
});

export const {
  addSeats,
  removeSeats,
  addInitialState,
  setStepBuy,
  setPrevStepBuy,
  setUser,
  setDisplayYouTube,
} = showTimeSlice.actions;
