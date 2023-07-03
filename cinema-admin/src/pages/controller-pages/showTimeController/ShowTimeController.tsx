import { useEffect, useState } from "react";
import "./showTimeController.css";
import axios from "axios";
import MovieCard from "../../../components/movieCard/MovieCard";
import UpdateAndDeleteShowtime from "../../../components/updateAndDeleteShowtime/UpdateAndDeleteShowtime";
import { ICinema, IMovie, IRoom } from "../../../types/movieTypes";
import { baseUrl } from "../../..";

const ShowTimeController = () => {
  const [form, setForm] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movie, setMovie] = useState<IMovie[]>([]);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [cinemaName, setCinemaName] = useState("בחירת קולנוע");
  const [cinemaId, setCinemaId] = useState("");
  const [showtime, setShowtime] = useState({
    cinemaIdRef: undefined,
    roomId: undefined,
    hourDetails: {
      start: undefined,
      end: undefined,
    },
    hour: undefined,
    date: undefined,
    seats: [],
    movies: undefined,
  });

  const addShowtime = () => {
    axios
      .post(`${baseUrl}/showtimes`, {
        data: showtime,
      })
      .then(() => {
        setShowtime({
          cinemaIdRef: undefined,
          roomId: undefined,
          hourDetails: {
            start: undefined,
            end: undefined,
          },
          hour: undefined,
          date: undefined,
          seats: [],
          movies: undefined,
        });
        setForm(false);
      })
      .catch((error) => {
        console.log(error.response.data);

        if (error.response.data.status === "fail") {
          alert(error.response.data.msg);
          setShowtime({
            cinemaIdRef: undefined,
            roomId: undefined,
            hourDetails: {
              start: undefined,
              end: undefined,
            },
            hour: undefined,
            date: undefined,
            seats: [],
            movies: undefined,
          });
          setForm(false);
        }
      });
  };

  useEffect(() => {
    axios.get(`${baseUrl}/movies`).then((res) => {
      setMovies(res.data.data.movies);
    });
    axios.get(`${baseUrl}/cinema`).then((res) => {
      setCinemas(res.data.data.cinema);
    });
  }, []);

  const getRooms = () => {
    axios
      .get(`${baseUrl}/cinemaRoom/getRoomByCinema/${cinemaId}`)
      .then((res) => {
        setRooms(res.data.data.rooms);
      });
  };

  const getMovie = (movie_id: string) => {
    let movieFilter = movies.filter((movie: IMovie) => {
      return movie._id === movie_id;
    });
    setMovie(movieFilter);
    setForm(true);
    if (movieFilter.length > 0) {
      onChange("movies", movieFilter[0]?._id);
      setTimeout(() => {
        const element = document.getElementById("addShowtime");
        window.scrollTo({
          top: element?.offsetTop,
          behavior: "smooth",
        });
      }, 0);
    }
  };

  function convertToUnixTime(timeString: any) {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return Math.floor(date.getTime() / 1000);
  }

  const onChange = (e: any, val?: any) => {
    if (e.target?.id === "hourDetails") {
      const runTime = movie[0].Runtime;
      const timeString = e.target.value;
      const unixTime = convertToUnixTime(timeString);
      const endTime = unixTime + +runTime * 60;
      return setShowtime((prev) => ({
        ...prev,
        [e.target.id]: {
          start: unixTime,
          end: endTime,
        },
        hour: e.target.value,
      }));
    }
    if (e.target?.id === "date") {
      const [year, month, day] = e.target.value.split("-");
      const formattedDate = `${day}/${month}/${year}`;
      return setShowtime((prev) => ({ ...prev, [e.target.id]: formattedDate }));
    }
    if (e === "movies") {
      return setShowtime((prev) => ({ ...prev, [e]: val }));
    }
    setShowtime((prev) => ({ ...prev, [e.target?.id]: val }));
  };

  return (
    <div className="showtime-controller">
      <h1 className="title-control">ShowTime Controller</h1>
      <div className="movie-list">
        {movies.map((movie: IMovie) => {
          return (
            <MovieCard key={movie._id} movie={movie} getMovie={getMovie} />
          );
        })}
      </div>
      {form && (
        <div id="addShowtime" className="add-showtime">
          <h1 className="control-title">הוסף הקרנה</h1>
          <div className="add-showtime-container">
            <div className="add-showtime-form">
              <select className="list-details-ul-box">
                <option value="" selected disabled hidden>
                  בחר בית קולנוע
                </option>
                {cinemas.map((cinema: ICinema) => {
                  return (
                    <option
                      id="cinemaIdRef"
                      key={cinema._id}
                      onClick={(e) => {
                        setCinemaName(cinema.name);
                        setCinemaId(cinema._id);
                        onChange(e, cinema._id);
                      }}
                      className="list-details-li"
                    >
                      סינימה סיטי {cinema.name}
                    </option>
                  );
                })}
              </select>
              <select onClick={getRooms} className="list-details-ul-box">
                <option value="" selected disabled hidden>
                  בחר אולם
                </option>
                {rooms.map((room: IRoom) => {
                  return (
                    <option
                      // value={roomtext}
                      id="roomId"
                      key={room._id}
                      className="list-details-li"
                      onClick={(e) => {
                        onChange(e, room._id);
                      }}
                    >
                      אולם {room.roomNumber}
                    </option>
                  );
                })}
              </select>
              <input
                id="date"
                className="list-details-ul-box"
                type="date"
                onChange={(e) => onChange(e)}
              />
              <input
                id="hourDetails"
                onChange={(e) => onChange(e)}
                className="list-details-ul-box"
                type="time"
              />
            </div>
          </div>
          <div className="add-btn-container">
            <button className="add-btn" onClick={addShowtime}>
              הוסף הקרנה
            </button>
          </div>
          <UpdateAndDeleteShowtime movieId={movie} />
        </div>
      )}
    </div>
  );
};

export default ShowTimeController;
