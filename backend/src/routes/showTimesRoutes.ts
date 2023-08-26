import express from "express";
import {
  getAllShowTimes,
  getshowTimeById,
  showTimeUpdateSeats,
  getshowTimeBydetails,
  getshowTimeByFulldetails,
  getShowTimeByMovieId,
  addShowTime,
  getShowTimeByMovieIdNoPop,
  deleteShowTime,
  getAndUpdateAllShowTimeDate,
  updateDateToNumber,
  getAllShowTimesByCinemaId,
} from "../controllers/showTimesController";
import { protect, restrictTo } from "../controllers/authController";

export const router = express.Router();

router.route("/updateDateToNumber").patch(updateDateToNumber);
router.route("/getAndUpdateAllShowTimeDate").patch(getAndUpdateAllShowTimeDate);

router.route("/getShowTime/:showtimeId").get(getshowTimeById);

router.route("/details/:cinemaId/:date").get(getshowTimeBydetails);

router
  .route("/allDetails/:cinemaId/:date/:movieId")
  .get(getshowTimeByFulldetails);

router.route("/").get(getAllShowTimes);
router
  .route("/getAllShowTimesByCinemaId/:cinemaId")
  .get(getAllShowTimesByCinemaId);

router.route("/findShowTimeByMovieId/:movieId").get(getShowTimeByMovieId);

router.use(protect);

router
  .route("/findShowTimeByMovieIdNoPop/:movieId")
  .get(restrictTo("admin"), getShowTimeByMovieIdNoPop);

router.route("/").post(restrictTo("admin"), addShowTime);

router.route("/:id").delete(restrictTo("admin"), deleteShowTime);

router
  .route("/update/:showTimeId")
  .patch(restrictTo("admin"), showTimeUpdateSeats);
