import { useEffect, useState } from "react";
import "./orderBox.css";
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { RiMovie2Line } from "@react-icons/all-files/ri/RiMovie2Line";
import { CgSearch } from "react-icons/cg";
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { BiCameraMovie } from "@react-icons/all-files/bi/BiCameraMovie";
import { useNavigate } from "react-router-dom";
import { IAllShowTime, ICinema, IShowtime } from "../../types/movieTypes";
import axios from "axios";
import { baseUrl } from "../..";
import moment from "moment";
import { nanoid } from "nanoid";

interface Idate {
  _id: Number;
  formattedDate: string;
  hebrewDayOfWeekShort: String;
}

const OrderBox = () => {
  const [isShownBox1, setIsShownBox1] = useState(false);
  const [isShownBox2, setIsShownBox2] = useState(false);
  const [isShownBox3, setIsShownBox3] = useState(false);
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [cinemaName, setCinemaName] = useState("בחירת קולנוע");
  const [movieDate, setMovieDate] = useState<String>("בחירת תאריך");
  const [sortTicket, setSortTicket] = useState("הכל");
  const [cinemaId, setCinemaId] = useState("");
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [showTimes, setShowTimes] = useState([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const [showTimesFilterByDate, setShowTimesFilterByDate] = useState([]);
  const [imgSelected, setImgSelected] = useState(
    "https://www.cinema-city.co.il/img/logo.png"
  );

  const navigate = useNavigate();

  const handleCinemaName = async (cinema: ICinema) => {
    // const startDate = new Date();
    // const currentDate = new Date(startDate); // create a new Date object with the current date
    // const formattedDate = currentDate.toLocaleDateString("en-GB", {
    //   month: "2-digit",
    //   day: "2-digit",
    //   year: "numeric",
    // });
    setCinemaName(cinema.name);
    setIsShownBox1(false);
    setBox1(true);
    // dateFormat();
    setCinemaId(cinema._id);
    setMovieDate("בחירת תאריך");
    showtimesList(cinema._id);
    if (box2 === false) {
      setBox2(true);
    } else {
      setBox3(false);
      setSortTicket("הכל");
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
    showtimesList(cinemaId);
    setIsShownBox2(false);
    if (box3 === false) {
      setBox3(true);
    } else {
      setSortTicket("הכל");
    }
  };

  const handleSortTicket = (e: any) => {
    console.log(e.target.textContent);
    setSortTicket(e.target.textContent);
    setIsShownBox3(false);
    if (box3 === false) {
      setBox3(true);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      axios.get(`${baseUrl}/cinema`).then((res) => {
        setCinemas(res.data.data.cinema);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

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
    <div className="orderBox">
      <div className="order-box-container">
        <div className="boxes-container">
          <div
            className="box-container"
            onMouseEnter={() => setIsShownBox1(true)}
            onMouseLeave={() => setIsShownBox1(false)}
          >
            <div className="box-text">
              <GoLocation className="icon-order-box" />
              <p className="choose-cinema-text-box">
                {cinemaName === "בחירת קולנוע"
                  ? "בחירת קולנוע"
                  : `סינימה סיטי ${cinemaName}`}
              </p>
            </div>
            <BsChevronDown className="arrow-down-icon-box active" />
            {isShownBox1 ? (
              <ul className="list-details-ul-box">
                {cinemas.map((cinema: ICinema) => {
                  console.log("asd", cinema);
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
            className="box-container"
            onMouseEnter={() => setIsShownBox2(true)}
            onMouseLeave={() => setIsShownBox2(false)}
          >
            <div className="box-text">
              <BsCalendar className="icon-order-box" />
              <p className="choose-cinema-text-box">{movieDate}</p>
            </div>
            <BsChevronDown className="arrow-down-icon-box active" />
            {isShownBox2 && box2 ? (
              <ul className="list-details-ul-box">
                {dateList.map((date: string) => {
                  console.log("AAA", date);
                  return (
                    <li
                      key={date}
                      onClick={() => handleDate(date)}
                      className="list-details-li"
                    >
                      {date}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          <div
            className="box-container"
            onMouseEnter={() => setIsShownBox3(true)}
            onMouseLeave={() => setIsShownBox3(false)}
          >
            <div className="box-text">
              <BiCameraMovie className="icon-order-box" />
              <p className="choose-cinema-text-box">{sortTicket}</p>
            </div>
            <BsChevronDown className="arrow-down-icon-box active" />
            {isShownBox3 && box3 ? (
              <ul className="list-details-ul-box">
                <li
                  onClick={(e) => handleSortTicket(e)}
                  className="list-details-li"
                >
                  הכל
                </li>
                <li
                  onClick={(e) => handleSortTicket(e)}
                  className="list-details-li"
                >
                  רגיל
                </li>
                <li
                  onClick={(e) => handleSortTicket(e)}
                  className="list-details-li"
                >
                  VIP
                </li>
              </ul>
            ) : null}
          </div>
        </div>
        {box1 === false ? (
          <div className="text-msg-container">
            <RiMovie2Line className="cinema-icon" />
            <p className="text-msg">אנא בחרו קולנוע להצגת הסרטים</p>
          </div>
        ) : (
          <div className="list-movies">
            <div className="list-movies-container">
              <div className="choose-movie-containers">
                <div className="filter-input-container">
                  <CgSearch className="filter-icon" />
                  <input
                    className="filter-input"
                    placeholder="סינון חופשי..."
                  />
                </div>
                <ul className="choose-movie-uls">
                  {showTimesFilterByDate.map((showtime: IShowtime) => {
                    return (
                      <li
                        className="choose-movie-lis"
                        onMouseEnter={() => imgSelect(showtime)}
                        key={Number(showtime._id)}
                      >
                        <a
                          className="link-page"
                          onClick={() =>
                            navigate(`/cinema-city/order/${showtime._id}`)
                          }
                        >
                          <span className="hour-text">{showtime.hour}</span>
                          {showtime.movies[0].Title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="img-movie-container">
                <img className="img-movie" src={imgSelected} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderBox;
