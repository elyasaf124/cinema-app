import React, { useState, useEffect } from "react";
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

interface ciname {
  _id: String;
  accessibility: boolean;
  address: String;
  name: string;
  numsRooms: number;
  activityTime: {};
}

interface date {
  formattedDate: string;
  hebrewDayOfWeekShort: String;
}

const MoviePage = () => {
  const [isShownBox1, setIsShownBox1] = useState(false);
  const [isShownBox2, setIsShownBox2] = useState(false);
  const [isShownBox3, setIsShownBox3] = useState(false);
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [cinemas, setCinemas] = useState<ciname[]>([]);
  const [cinemaName, setCinemaName] = useState("בחר בית קולנוע");
  const [cinemaId, setCinemaId] = useState("");
  const [movieDate, setMovieDate] = useState("בחירת תאריך");
  const [movieHour, setMovieHour] = useState("בחירת שעה");
  const [houers, setHours] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [dateList, setDateList] = useState<date[]>([]);

  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

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

  const showCinemasList = () => {
    let isCancelled = false;
    if (!isCancelled) {
      setIsShownBox1(true);
      axios.get(`${baseUrl}/cinema`).then((res) => {
        setCinemas(res.data.data.cinema);
      });
    }
    return () => {
      isCancelled = true;
    };
  };

  const handleCinemaName = (cinema: any) => {
    const startDate = new Date();
    const currentDate = new Date(startDate); // create a new Date object with the current date
    const formattedDate = currentDate.toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    dateFormat();
    setCinemaId(cinema._id);
    setCinemaName(cinema.name);
    setIsShownBox1(false);
    setBox1(true);
    if (box2 === false) {
      setBox2(true);
    } else {
      setBox3(false);
      setMovieDate("בחירת תאריך");
      setMovieHour("בחירת שעה");
    }
  };

  const dateFormat = () => {
    const startDate = new Date(); // gets current date
    let dateList = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate); // create a new Date object with the current date
      currentDate.setDate(startDate.getDate() + i); // set the date to the next day
      const options: Object = {
        weekday: "short",
        timeZone: "UTC",
        locale: "he",
      };
      let hebrewDayOfWeek = currentDate.toLocaleDateString("he-IL", options);
      let hebrewDayOfWeekShort = hebrewDayOfWeek.slice(0, 5);
      const formattedDate = currentDate.toLocaleDateString("en-GB", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

      dateList.push({ formattedDate, hebrewDayOfWeekShort });
      setDateList(dateList);
    }
  };

  const handleDate = (date: any) => {
    let isCancelled = false;
    if (!isCancelled) {
      setMovieDate(date.formattedDate);
      setIsShownBox2(false);
      let encodedDate = encodeURIComponent(date.formattedDate);
      setIsShownBox3(false);
      setMovieHour("בחירת שעה");
      axios
        .get(
          `${baseUrl}/showtimes/allDetails/${cinemaId}/${encodedDate}/${movieId}`
        )
        .then((res) => {
          console.log(res);
          setHours(res.data.data.showTimes);
        });
      if (box3 === false) {
        setBox3(true);
      } else {
        setMovieHour("בחירת שעה");
      }
    }
    return () => {
      isCancelled = true;
    };
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
                      onMouseEnter={() => showCinemasList()}
                      onMouseLeave={() => setIsShownBox1(false)}
                      className="movie-page-order-ticket-input active"
                    >
                      סינמה סיטי {cinemaName}
                      <img
                        className="arrow-down"
                        src="https://www.cinema-city.co.il/img/arrowdb.png"
                      />
                      {isShownBox1 ? (
                        <div className="cinema-list">
                          <ul className="list-details-ul-movie-page">
                            {cinemas.map((cinema: any) => {
                              return (
                                <li
                                  key={cinema._id}
                                  onClick={() => handleCinemaName(cinema)}
                                  className="list-details-li-movie-page"
                                >
                                  סינימה סיטי {cinema.name}
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
                      {isShownBox2 && box2 ? (
                        <div className="cinema-list">
                          <ul className="list-details-ul-movie-page">
                            {dateList.map((date: any) => {
                              return (
                                <li
                                  key={date._id}
                                  onClick={() => handleDate(date)}
                                  className="list-details-li-movie-page"
                                >
                                  {`${date.hebrewDayOfWeekShort}   
                        ${date.formattedDate}`}
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
                      className={
                        box3
                          ? "movie-page-order-ticket-input active"
                          : "movie-page-order-ticket-input"
                      }
                    >
                      {movieHour}
                      <img
                        className="arrow-down"
                        src="https://www.cinema-city.co.il/img/arrowdb.png"
                      />
                      {isShownBox3 && box3 ? (
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
