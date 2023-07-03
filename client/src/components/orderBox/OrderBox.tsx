import { useEffect, useState } from "react";
import "./orderBox.css";
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { RiMovie2Line } from "@react-icons/all-files/ri/RiMovie2Line";
import { CgSearch } from "react-icons/cg";
import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { BiCameraMovie } from "@react-icons/all-files/bi/BiCameraMovie";
import { useNavigate } from "react-router-dom";
import { IAllShowTime, ICinema } from "../../types/movieTypes";
import axios from "axios";
import { baseUrl } from "../..";

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
  const [dateList, setDateList] = useState<Idate[]>([]);
  const [imgSelected, setImgSelected] = useState(
    "https://www.cinema-city.co.il/img/logo.png"
  );

  const navigate = useNavigate();

  const handleCinemaName = async (cinema: ICinema) => {
    const startDate = new Date();
    const currentDate = new Date(startDate); // create a new Date object with the current date
    const formattedDate = currentDate.toLocaleDateString("en-GB", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setCinemaName(cinema.name);
    setIsShownBox1(false);
    setBox1(true);
    dateFormat();
    setCinemaId(cinema._id);
    setMovieDate(formattedDate);
    showtimesList(cinema._id, formattedDate);
    if (box2 === false) {
      setBox2(true);
    } else {
      setBox3(false);
      setSortTicket("הכל");
    }
  };

  const handleDate = (date: Idate) => {
    setMovieDate(date.formattedDate);
    showtimesList(cinemaId, date.formattedDate);
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

  const showtimesList = (cinemaId: String, date: string) => {
    let isCancelled = false;
    if (!isCancelled) {
      let encodedDate = encodeURIComponent(date);
      axios
        .get(`${baseUrl}/showtimes/details/${cinemaId}/${encodedDate}`)
        .then((res) => {
          setShowTimes(res.data.data.showTimes);
        });
    }
    return () => {
      isCancelled = true;
    };
  };

  const imgSelect = (showtime: IAllShowTime) => {
    setImgSelected(showtime.movies[0].Poster);
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
      dateList.push({ formattedDate, hebrewDayOfWeekShort, _id: i });
      setDateList(dateList);
    }
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
                {dateList.map((date: Idate) => {
                  return (
                    <li
                      key={Number(date._id)}
                      onClick={() => handleDate(date)}
                      className="list-details-li"
                    >
                      {`${date.hebrewDayOfWeekShort}   
                        ${date.formattedDate}`}
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
                  {showTimes.map((showtime: IAllShowTime) => {
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
