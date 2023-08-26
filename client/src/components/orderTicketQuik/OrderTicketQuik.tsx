import { useState } from "react";
import "./orderTicketQuik.css";
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { CgTime } from "@react-icons/all-files/cg/CgTime";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { BiCameraMovie } from "@react-icons/all-files/bi/BiCameraMovie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IAllShowTime, ICinema, IShowtime } from "../../types/movieTypes";
import { baseUrl } from "../..";
import moment from "moment";

interface ciname {
  _id: String;
  accessibility: boolean;
  address: String;

  name: string;
  numsRooms: number;
  activityTime: {};
}

interface date {
  _id: number;
  formattedDate: string;
  hebrewDayOfWeekShort: String;
}

const OrderTicketQuik = () => {
  const navigate = useNavigate();
  const [isShownBox1, setIsShownBox1] = useState(false);
  const [isShownBox2, setIsShownBox2] = useState(false);
  const [isShownBox3, setIsShownBox3] = useState(false);
  const [isShownBox4, setIsShownBox4] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [box4, setBox4] = useState(false);
  const [cinemaName, setCinemaName] = useState("בחירת קולנוע");
  const [movieDate, setMovieDate] = useState("בחירת תאריך");
  const [movieName, setMovieName] = useState("בחירת סרט");
  const [movieHour, setMovieHour] = useState("בחירת שעה");
  const [houers, setHours] = useState([]);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  // const [dateList, setDateList] = useState<date[]>([]);
  const [showTimes, setShowTimes] = useState([]);
  const [showTimesFilterByDate, setShowTimesFilterByDate] = useState([]);
  // const [cinemaId, setCinemaId] = useState("");
  const [movieIdSelected, setMovieIdSelected] = useState("");
  const [imgSelected, setImgSelected] = useState(
    "https://www.cinema-city.co.il/img/logo.png"
  );

  const moveTo = () => {
    if (box2 && box3 && box4 && movieHour !== "בחירת שעה") {
      navigate(`/cinema-city/order/${movieIdSelected}`);
    } else {
      alert("בבקשה מלא את כל השדות");
    }
  };

  const handleCinemaName = (cinema: ICinema) => {
    // const startDate = new Date();
    // const currentDate = new Date(startDate); // create a new Date object with the current date
    // const formattedDate = currentDate.toLocaleDateString("en-GB", {
    //   month: "2-digit",
    //   day: "2-digit",
    //   year: "numeric",
    // });
    setCinemaName(cinema.name);
    setIsShownBox1(false);
    // setCinemaId(cinema._id);
    // setMovieDate(formattedDate);
    showtimesList(cinema._id);
    if (box2 === false) {
      setBox2(true);
    }
    if (box2 === false) {
      setBox2(true);
    } else {
      setBox3(false);
      setBox4(false);
      setImgSelected("");
      setMovieDate("בחירת תאריך");
      setMovieName("בחירת סרט");
      setMovieHour("בחירת שעה");
    }
  };
  const handleDate = (date: string) => {
    setMovieDate(date);
    const dateInUnix = moment(date, "DD-MM-YYYY").unix();
    const showTimesFilterByDate = showTimes.filter((show: IShowtime) => {
      if (show.date >= dateInUnix && show.date <= dateInUnix + 86400)
        return show;
    });
    setShowTimesFilterByDate(showTimesFilterByDate);
    setImgSelected("");
    setIsShownBox2(false);
    if (box3 === false) {
      setBox3(true);
    } else {
      setMovieName("בחירת סרט");
      setBox4(false);
    }
  };
  const handleMovieName = (show: IShowtime) => {
    let isCancelled = false;
    if (!isCancelled) {
      setMovieName(show.movies[0].subTitle);
      setIsShownBox3(false);
      setBox4(true);
      setImgSelected("");
      setMovieHour("בחירת שעה");
      const showFilter = showTimesFilterByDate.filter((showTime: IShowtime) => {
        return showTime._id === show._id;
      });
      setHours(showFilter);
    }

    return () => {
      isCancelled = true;
    };
  };
  const handleMovieHour = (show: IShowtime) => {
    setMovieHour(show.hour);
    setMovieIdSelected(show._id);
    setIsShownBox4(false);
  };

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

  const showtimesList = (cinemaId: String) => {
    let isCancelled = false;
    if (!isCancelled) {
      axios
        .get(`${baseUrl}/showtimes/getAllShowTimesByCinemaId/${cinemaId}`)
        .then((res) => {
          setShowTimes(res.data.data.showTimes);
          formatDate(res.data.data.showTimes);
        });
    }
    return () => {
      isCancelled = true;
    };
  };
  const formatDate = (showTimes: IAllShowTime[]) => {
    let dates: any = [];

    const formatDates = showTimes.map((show: any) => {
      const formattedDate = moment.unix(show.date).format("DD-MM-YYYY");
      return formattedDate;
    });
    formatDates.forEach((date: any) => {
      if (!dates.includes(date)) {
        dates.push(date);
      }
    });
    setDateList(dates);
  };

  const imgSelect = (showtime: IShowtime) => {
    setImgSelected(showtime.movies[0].Poster);
  };

  return (
    <div className="OrderTicketQuik">
      <div className="order-ticket-quik-container">
        <div className="top-order-ticket-quik">
          <div className="spaceWhite"></div>
          <h2 className="order-ticket-quik-title">הזמן כרטיסים</h2>
          <div className="containers">
            <div className="movie-hour">
              <CgTime className="clockIcon" />
              <span className="movie-hour-text">לרשימת סרטים לפי שעות</span>
            </div>
          </div>
        </div>
        <div className="choose-movie-container">
          <div
            className="choose-movie-box active"
            onMouseEnter={() => showCinemasList()}
            onMouseLeave={() => setIsShownBox1(false)}
          >
            <div className="choose-cinema-container">
              <GoLocation className="locationIcon" />
              <p className="choose-cinema-text">
                {cinemaName === "בחירת קולנוע"
                  ? "בחירת קולנוע"
                  : `סינימה סיטי ${cinemaName}`}
              </p>
            </div>
            <BsChevronDown className="arrow-down-icon active" />
            {isShownBox1 ? (
              <ul className="list-details-ul">
                {cinemas.map((cinema: ICinema) => {
                  return (
                    <li
                      key={cinema._id}
                      onClick={() => handleCinemaName(cinema)}
                      className="list-details-li"
                    >
                      סינימה סיטי {cinema.name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setIsShownBox2(true)}
            onMouseLeave={() => setIsShownBox2(false)}
            className={box2 ? "choose-movie-box active" : "choose-movie-box"}
          >
            <div className="choose-cinema-container">
              <BsCalendar className="locationIcon" />
              <p className="choose-cinema-text">{movieDate}</p>
            </div>
            <BsChevronDown className="arrow-down-icon" />
            {isShownBox2 && box2 ? (
              <ul className="list-details-ul">
                {dateList.map((date: string) => {
                  return (
                    <li
                      key={date}
                      onClick={() => handleDate(date)}
                      className="list-details-li"
                    >
                      {`${date}   
                        `}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <div
            onMouseEnter={() => setIsShownBox3(true)}
            onMouseLeave={() => setIsShownBox3(false)}
            className={box3 ? "choose-movie-box active" : "choose-movie-box"}
          >
            <div
              className={
                isShownBox3 && box3 ? "img-container active" : "img-container"
              }
            >
              <img className="logo-img" src={imgSelected} />
            </div>
            <div className="choose-cinema-container">
              <BiCameraMovie className="locationIcon" />
              <p className="choose-cinema-text">{movieName}</p>
            </div>
            <BsChevronDown className="arrow-down-icon" />
            <div className="search-container-quik">
              {isShownBox3 && box3 ? (
                <ul className="list-details-ul">
                  <div className="input-container">
                    <input
                      placeholder="הקלד שם סרט לסינון"
                      className="choose-movie-input"
                    />
                  </div>
                  {showTimesFilterByDate.map((showtime: IShowtime) => {
                    return (
                      <li
                        className="choose-movie-lis"
                        onMouseEnter={() => imgSelect(showtime)}
                        key={showtime._id}
                      >
                        <a
                          className="link-page"
                          onClick={() => handleMovieName(showtime)}
                        >
                          {showtime.movies[0].subTitle}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
          <div
            className={box4 ? "choose-movie-box active" : "choose-movie-box"}
            onMouseEnter={() => setIsShownBox4(true)}
            onMouseLeave={() => setIsShownBox4(false)}
          >
            <div className="choose-cinema-container">
              <CgTime className="locationIcon" />
              <p className="choose-cinema-text">{movieHour}</p>
            </div>
            <BsChevronDown className="arrow-down-icon" />
            {isShownBox4 && box4 ? (
              <ul className="list-details-ul hour-list">
                {houers.map((show: IShowtime) => {
                  console.log("show");
                  console.log(show);

                  return (
                    <li
                      onClick={() => handleMovieHour(show)}
                      className="list-details-li"
                      key={show._id}
                    >
                      {show.hour}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <button
            onClick={() => moveTo()}
            className="choose-movie-box oredr-btn-ticket"
          >
            להזמנת כרטיסים
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTicketQuik;
