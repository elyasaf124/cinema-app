import { useState, useEffect } from "react";
import "./moviePage.css";
import Messages from "../../components/messages/Messages";
import NavBar from "../../components/navBar/NavBar";
import YoutubeEmbed from "../../youtube/Youtube";
import { CiMail } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../..";
import { IAllShowTime, IMovie } from "../../types/movieTypes";
import moment from "moment";

const MoviePage = () => {
  const [isShownBox1, setIsShownBox1] = useState(false);
  const [isShownBox2, setIsShownBox2] = useState(false);
  const [isShownBox3, setIsShownBox3] = useState(false);
  const [box2, setBox2] = useState(false);
  const [movieDate, setMovieDate] = useState("בחירת תאריך");
  const [movieHour, setMovieHour] = useState("בחירת שעה");
  const [houers, setHours] = useState<IAllShowTime[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [show, setShow] = useState<IAllShowTime[]>([]);
  const [showFilter, setShowFilter] = useState<IAllShowTime[]>([]);
  const [cinemaName, setcinemaName] = useState("בחר בית קולנוע");
  const [cinemaId, setcinemaId] = useState("");

  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<IMovie[]>([]);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      let arr: any = [];
      axios.get(`${baseUrl}/movies/${movieId}`).then((res) => {
        arr.push(res.data.data.movie);
        setMovie(arr);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      axios
        .get(`${baseUrl}/showtimes/findShowTimeByMovieId/${movieId}`)
        .then((res) => {
          Promise.all(
            res.data.showTime.map(async (el: any) => {
              const formattedDate = moment.unix(el.date).format("DD/MM/YYYY");
              el.date = formattedDate;
              return el;
            })
          )
            .then((formattedShowTime) => {
              const showFilterUpdate: IAllShowTime[] = [];
              formattedShowTime.forEach((el: IAllShowTime) => {
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
              setShow(formattedShowTime);
              setShowFilter(showFilterUpdate);
            })
            .catch((error) => {
              console.error("An error occurred while formatting:", error);
            });
        })
        .catch((error) => {
          console.error("An error occurred while fetching showtimes:", error);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleCinemaName = (showtime: IAllShowTime) => {
    setcinemaName(showtime.cinemaIdRef.name);
    setcinemaId(showtime.cinemaIdRef._id);
    setIsShownBox1(false);
    const filterDate = show.filter((show: IAllShowTime) => {
      return show.cinemaIdRef._id === showtime.cinemaIdRef._id;
    });
    let dates: any = [];

    filterDate.forEach((show: any) => {
      if (!dates.includes(show.date)) {
        dates.push(show.date);
      }
    });
    setDateList(dates);
  };

  const handleDate = (date: string) => {
    setIsShownBox2(false);
    setMovieDate(date);
    const showByHour = show.filter((show: IAllShowTime) => {
      return show.cinemaIdRef._id === cinemaId && show.date === date;
    });
    setHours(showByHour);
    setBox2(true);
  };

  const handleMovieHour = (hour: any) => {
    setMovieHour(hour);
    setIsShownBox3(false);
    navigate(`/cinema-city/order/${hour._id}`);
  };

  return (
    <>
      {movie.map((item: any) => {
        return (
          <div className="movie-page">
            <NavBar />
            <div className="movie-page-container">
              <div className="movie-page-item">
                <p className="movie-page-item-title">
                  {item.subTitle}/{item.Title}
                </p>
                <div className="img-trailer-container">
                  <div className="youtube-container">
                    <YoutubeEmbed embedId={item.Trailer.split("=")[1]} />
                  </div>
                  <img className="movie-page-img" src={item.Poster} />
                </div>
                <p className="description-title">תקציר הסרט</p>
                <div className="description-details">
                  <div className="description-container">
                    <p className="description-text">{item.Plot}</p>
                  </div>
                  <div className="details">
                    <ul className="details-movie-page-ul">
                      <li className="details-movie-page-li">
                        <b>סיווג </b>
                        {item.Genre}
                      </li>
                      <li className="details-movie-page-li">
                        <b>אורך בדקות </b>
                        {item.Runtime}
                      </li>
                      <li className="details-movie-page-li">
                        <b>תאריך בכורה </b>
                        {item.Released}
                      </li>
                      <li className="details-movie-page-li">
                        <b>הגבלת צפיה </b>
                        {item.LimitAge}
                      </li>
                    </ul>
                    <div className="movie-page-share">
                      <span className="movie-page-share-text">
                        חייבים לשתף חבר/ה:
                      </span>
                      <div className="movie-page-icons-container">
                        <CiMail className="movie-page-icon" />
                        <FaTwitter className="movie-page-icon" />
                        <CgFacebook className="movie-page-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="movie-page-order-ticket">
                  <div className="movie-page-order-ticket-title-container">
                    <span className="movie-page-order-ticket-title">
                      הזמן כרטיסים לסרט זה
                    </span>
                  </div>
                  <div className="movie-page-order-ticket-inputs-container">
                    <div
                      onMouseEnter={() => setIsShownBox1(true)}
                      onMouseLeave={() => setIsShownBox1(false)}
                      className="movie-page-order-ticket-input active"
                    >
                      {cinemaName === "בחר בית קולנוע"
                        ? "בחר בית קולנוע"
                        : `סינמה סיטי ${cinemaName}`}
                      <img
                        className="arrow-down"
                        src="https://www.cinema-city.co.il/img/arrowdb.png"
                      />
                      {isShownBox1 ? (
                        <div className="cinema-list">
                          <ul className="list-details-ul-movie-page">
                            {showFilter.map((show: any) => {
                              return (
                                <li
                                  key={show._id}
                                  onClick={() => handleCinemaName(show)}
                                  className="list-details-li-movie-page"
                                >
                                  סינימה סיטי {show.cinemaIdRef.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <div
                      onMouseEnter={() => setIsShownBox2(true)}
                      onMouseLeave={() => setIsShownBox2(false)}
                      className={
                        box2
                          ? "movie-page-order-ticket-input active"
                          : "movie-page-order-ticket-input"
                      }
                    >
                      {movieDate}
                      <img
                        className="arrow-down"
                        src="https://www.cinema-city.co.il/img/arrowdb.png"
                      />
                      {isShownBox2 ? (
                        <div className="cinema-list">
                          <ul className="list-details-ul-movie-page">
                            {dateList.map((date: any) => {
                              return (
                                <li
                                  key={date._id}
                                  onClick={() => handleDate(date)}
                                  className="list-details-li-movie-page"
                                >
                                  {date}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <div
                      onMouseEnter={() => setIsShownBox3(true)}
                      onMouseLeave={() => setIsShownBox3(false)}
                      className={"movie-page-order-ticket-input"}
                    >
                      {movieHour}
                      <img
                        className="arrow-down"
                        src="https://www.cinema-city.co.il/img/arrowdb.png"
                      />
                      {isShownBox3 ? (
                        <div className="cinema-list">
                          <ul className="list-details-ul-movie-page">
                            {houers.map((hour: any) => {
                              return (
                                <li
                                  onClick={() => handleMovieHour(hour)}
                                  className="list-details-li-movie-page"
                                  key={hour._id}
                                >
                                  {hour.hour}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Messages />
          </div>
        );
      })}
    </>
  );
};

export default MoviePage;
