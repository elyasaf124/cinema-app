import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addInitialState } from "../../features/showTimeSlice";
import { IAllShowTime } from "../../types/movieTypes";
import SeatsRoom from "../seatsRoom/SeatsRoom";
import "./room.css";
import { baseUrl } from "../..";

const Room = () => {
  const { showtimeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showtime, setShowtime] = useState<IAllShowTime[]>([]);

  const showTime = useSelector((state: any) => state.showtime);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      let show: IAllShowTime[] = [];
      axios
        .get(`${baseUrl}/showtimes/getShowTime/${showtimeId}`)
        .then((res) => {
          res.data.data.showTime.date = moment
            .unix(res.data.data.showTime.date)
            .format("DD/MM/YYYY");

          show.push(res.data.data.showTime);
          setShowtime(show);
          dispatch(addInitialState(show));
        });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <>
      {showtime?.map((show: IAllShowTime) => {
        return (
          <div key={Number(show._id)} className="room">
            <div className="level-order">
              <div className="level-order-container">
                <div
                  className={
                    showTime.stepsBuy.stepOne
                      ? "level-order-box one active"
                      : "level-order-box one"
                  }
                >
                  <span>1</span>
                  <span className="level-order-text">בחירת מושבים</span>
                </div>
                <div
                  className={
                    showTime.stepsBuy.stepTwo
                      ? "level-order-box two active"
                      : "level-order-box two"
                  }
                >
                  <span>2</span>
                  <span className="level-order-text">בחירת סוג כרטיס</span>
                </div>
                <div
                  className={
                    showTime.stepsBuy.stepThree
                      ? "level-order-box three active"
                      : "level-order-box three"
                  }
                >
                  <span>3</span>
                  <span className="level-order-text">פרטים ותשלום</span>
                </div>
              </div>
            </div>
            <div className="movie-details">
              <div className="movie-details-container">
                <div className="movie-details-img-container">
                  <img
                    className="movie-details-img"
                    src={show.movies[0].Poster}
                  />
                </div>
                <div className="movie-details-box">
                  <h3 className="movie-details-box-title">
                    {show.movies[0].subTitle}
                  </h3>
                  <div className="sub-details row-one">
                    <span className="sub-details-cinema">
                      סינימה סיטי {show.cinemaIdRef.name}
                    </span>
                    <span>יום שלישי</span>
                    <span className="separator"> | </span>
                    <span>{show.date}</span>
                    <span className="separator"> | </span>
                    <span>{show.hour}</span>
                  </div>
                  <div className="sub-details row-two">
                    <span>שפה: אנגלית</span>
                    <span className="separator"> | </span>
                    <span>כתוביות: עברית</span>
                    <span className="separator"> | </span>
                    <span>אולם 16</span>
                    <span className="separator"> | </span>
                    <span>מוגבל מגיל {show.movies[0].LimitAge}</span>
                  </div>
                </div>
              </div>
            </div>
            <SeatsRoom showtime={showtime} />
            <div onClick={() => navigate("/")} className="logo-nav-order-page">
              <img
                className="logo-nav-img-order-page"
                src="https://www.cinema-city.co.il/img/logo.png"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Room;
