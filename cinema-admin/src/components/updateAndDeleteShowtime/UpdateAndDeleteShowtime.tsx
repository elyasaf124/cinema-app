import { useEffect, useState } from "react";
import "./updateAndDeleteShowtime.css";
import axios from "axios";
import { IAllShowTime, IShowtime } from "../../types/movieTypes";
import { baseUrl } from "../..";

const UpdateAndDeleteShowtime = ({ movieId }: any) => {
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);

  useEffect(() => {
    if (movieId && movieId[0] && movieId[0]._id) {
      axios
        .get(`${baseUrl}/showtimes/findShowTimeByMovieId/${movieId[0]._id}`)
        .then((res) => {
          setShowtimes(res.data.data.showTime);
        })
        .catch((error) => {
          console.error("Error fetching showtimes:", error);
        });
    }
  }, []);

  const deleteShowtime = (id: string) => {
    axios
      .delete(`${baseUrl}/showtimes/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") {
          setShowtimes(
            showtimes.filter((show: IShowtime) => {
              return show._id !== id;
            })
          );
        }
      });
  };

  return (
    <div className="showtimes-container">
      <h1 className="control-title">מחק הקרנה</h1>
      <h2 className="showtimes-heading">
        {movieId[0].subTitle} :Showtimes for Movie
      </h2>
      <table className="showtimes-table">
        <thead>
          <tr>
            <th className="showtimes-table-header">מחיקה</th>
            <th className="showtimes-table-header">Showtime ID</th>
            <th className="showtimes-table-header">cinema</th>
            <th className="showtimes-table-header">date</th>
            <th className="showtimes-table-header">hour</th>
            <th className="showtimes-table-header">movie</th>
            <th className="showtimes-table-header">room</th>
          </tr>
        </thead>
        <tbody>
          {showtimes?.map((showtime: IShowtime) => (
            <tr key={showtime._id} className="showtimes-table-row">
              <td className="showtimes-table-cell">
                <p
                  className="delete-btn"
                  onClick={() => deleteShowtime(showtime._id)}
                >
                  x
                </p>
              </td>
              <td className="showtimes-table-cell">{showtime._id}</td>
              <td className="showtimes-table-cell">
                סינמה סיטי {showtime.cinemaIdRef.name}
              </td>
              <td className="showtimes-table-cell">{showtime.date}</td>
              <td className="showtimes-table-cell">{showtime.hour}</td>
              <td className="showtimes-table-cell">{movieId[0].subTitle}</td>
              <td className="showtimes-table-cell">
                אולם {showtime.roomId.roomNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateAndDeleteShowtime;
