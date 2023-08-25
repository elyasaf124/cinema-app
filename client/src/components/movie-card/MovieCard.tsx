import { useState } from "react";
import "./movieCard.css";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { setDisplayYouTube } from "../../features/showTimeSlice";
import { IAllShowTime, IMovie } from "../../types/movieTypes";
import { BsCaretDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../..";
import { nanoid } from "nanoid";

interface IMoviePROPS {
  movie: IMovie;
}

const MovieCard = ({ movie }: IMoviePROPS) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(false);
  const [show, setShow] = useState<IAllShowTime[]>([]);
  const [showFilter, setShowFilter] = useState<IAllShowTime[]>([]);
  const [dateFilter, setDateFilter] = useState<IAllShowTime[]>([]);
  const [cinemaName, setcinemaName] = useState("בחר בית קולנוע");
  const [cinemaId, setcinemaId] = useState("");
  const [dateV, setDate] = useState("בחר תאריך");
  const [dateList, setDateList] = useState<IAllShowTime[]>([]);
  const [hour, setHour] = useState("בחר שעה");
  const [hourList, setHourList] = useState<IAllShowTime[]>([]);
  const [isShownBox1, setIsShownBox1] = useState(false);
  const [isShownBox2, setIsShownBox2] = useState(false);
  const [isShownBox3, setIsShownBox3] = useState(false);

  const moveTo = (movie: IMovie) => {
    navigate(`/cinema-city/${movie._id}`);
  };

  const handleCinemaName = (show: IAllShowTime) => {
    console.log("cinema", show);
    setcinemaName(show.cinemaIdRef.name);
    setcinemaId(show.cinemaIdRef._id);
    setIsShownBox1(false);
  };

  let dateFilterUpdate: IAllShowTime[] = [];

  const getDates = () => {
    setIsShownBox2(true);
    let dates: IAllShowTime[] = show.filter(async (show: IAllShowTime) => {
      return show.date === cinemaId;
    });
    setDateList(dates);
    dates.forEach((show: IAllShowTime) => {
      let alreadyFiltered = false;
      for (const item of dateFilterUpdate) {
        if (item.date === show.date) {
          alreadyFiltered = true;
          break;
        }
      }
      if (!alreadyFiltered) {
        dateFilterUpdate.push(show);
      }
      setDateFilter(dateFilterUpdate);
    });
  };

  const handleDate = (show: IAllShowTime) => {
    setIsShownBox2(false);
    setDate(show.date);
  };

  const getHourList = () => {
    setIsShownBox3(true);
    let hours = dateList.filter((show: IAllShowTime) => {
      return show.date === dateV;
    });
    setHourList(hours);
  };

  const handleHour = (show: IAllShowTime) => {
    setIsShownBox3(false);
    setHour(show.hour);
    navigate(`/cinema-city/order/${show._id}`);
  };

  let showFilterUpdate: IAllShowTime[] = [];

  const toOrderMovie = (movie: IMovie) => {
    let isCancelled = false;
    if (!isCancelled) {
      setOrder(true);
      axios
        .get(`${baseUrl}/showtimes/findShowTimeByMovieId/${movie._id}`)
        .then((res) => {
          console.log(res.data);
          res.data.data.showTime.map(async (el: any) => {
            const formattedDate = moment.unix(el.date).format("DD/MM/YYYY");
            el.date = formattedDate;
            return el;
          });

          res.data.data.showTime.forEach((el: IAllShowTime) => {
            let alreadyFiltered = false;
            for (const item of showFilterUpdate) {
              if (item.cinemaIdRef._id === el.cinemaIdRef._id) {
                alreadyFiltered = true;
                break;
              }
            }
            if (!alreadyFiltered) {
              showFilterUpdate.push(el);
            }
          });
          setShowFilter(showFilterUpdate);
          setShow(res.data.data.showTime);
        });
    }
    return () => {
      isCancelled = true;
    };
  };

  const displayYouTube = (movie: string) => {
    // setYouTube(true);
    dispatch(setDisplayYouTube(movie));
  };

  return (
    <>
      <div className="movieCard">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img className="img-card" src={movie.Poster} />
              <span className="title-card-movie">{movie.subTitle}</span>
            </div>
            <div className="flip-card-back">
              {!order ? (
                <div className="flip-card-back-container">
                  <div className="top-row">
                    <h2 className="back-card-title">{movie.subTitle}</h2>
                    <div
                      onClick={() =>
                        displayYouTube(movie.Trailer.split("=")[1])
                      }
                    >
                      <FaYoutube className="youtube-icon" />
                    </div>
                  </div>

                  <span className="back-card-sub-title">{movie.Title}</span>
                  <p className="desc-movie-card">
                    {movie.Plot.slice(0, 50)}...
                  </p>
                  <ul className="details-movie-card">
                    <li>
                      <b>סיווג</b> {movie.Genre}
                    </li>
                    <li>
                      <b>אורך בדקות</b> {movie.Runtime}
                    </li>
                    <li>
                      <b>תאריך בכורה </b> {movie.Released}
                    </li>
                    <li>
                      <b>הגבלת צפיה</b> מוגבל מגיל {movie.LimitAge}
                    </li>
                  </ul>
                  <div className="btns-container">
                    <button
                      onClick={() => moveTo(movie)}
                      className="btn-card go-page-movie-btn"
                    >
                      מעבר לדף הסרט
                    </button>
                    <button
                      onClick={() => toOrderMovie(movie)}
                      className="btn-card order-ticket-btn-card"
                    >
                      הזמן כרטיסים
                    </button>
                  </div>
                </div>
              ) : (
                <div className="order-movie-card">
                  <span onClick={() => setOrder(false)} className="exit-btn">
                    x
                  </span>
                  <div className="order-movie-card-container">
                    <div className="order-top-row">
                      <span>הזמנת כרטיסים לסרט |</span>
                      <span className="order-top-row-subTitle">
                        {movie.subTitle}
                      </span>
                    </div>
                    <div className="inputs-container">
                      <div
                        onMouseEnter={() => setIsShownBox1(true)}
                        onMouseLeave={() => setIsShownBox1(false)}
                        className="input-order-container"
                      >
                        <div className="input-order">
                          {cinemaName === "בחר בית קולנוע"
                            ? "בחר בית קולנוע"
                            : `סינמה סיטי ${cinemaName}`}
                          <BsCaretDownFill />
                        </div>
                        {isShownBox1 ? (
                          <ul className="list-details-uls cinema">
                            {showFilter.map((show: IAllShowTime) => {
                              return (
                                <li
                                  key={nanoid()}
                                  onClick={() => handleCinemaName(show)}
                                  className="list-details-lis"
                                >
                                  סינמה סיטי {show.cinemaIdRef.name}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                      <div
                        onMouseEnter={() => getDates()}
                        onMouseLeave={() => setIsShownBox2(false)}
                        className="input-order-container"
                      >
                        <div className="input-order">
                          {dateV === "בחר תאריך" ? "בחר תאריך" : `${dateV}`}
                          <BsCaretDownFill />
                        </div>
                        {isShownBox2 ? (
                          <ul className="list-details-uls">
                            {dateFilter.map((show: IAllShowTime) => {
                              return (
                                <li
                                  key={nanoid()}
                                  onClick={() => handleDate(show)}
                                  className="list-details-lis"
                                >
                                  {show.date}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>

                      <div
                        onMouseEnter={() => getHourList()}
                        onMouseLeave={() => setIsShownBox3(false)}
                        className="input-order-container"
                      >
                        <div className="input-order">
                          {hour === "בחר שעה" ? "בחר שעה" : `${hour}`}
                          <BsCaretDownFill />
                        </div>
                        {isShownBox3 ? (
                          <ul className="list-details-uls">
                            {hourList.map((show: IAllShowTime) => {
                              return (
                                <li
                                  key={nanoid()}
                                  onClick={() => handleHour(show)}
                                  className="list-details-lis"
                                >
                                  {show.hour}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
