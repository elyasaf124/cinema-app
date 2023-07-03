import MovieCard from "../movie-card/MovieCard";
import "./nowInCinema.css";
import YtModel from "../ytModel/YtModel";
import { useSelector } from "react-redux";
import { IMovie } from "../../types/movieTypes";

interface IMoviesProps {
  moviesAr: IMovie[];
}

const NowInCinema = ({ moviesAr }: IMoviesProps) => {
  const yt = useSelector((state: any) => state.showtime.setDisplayYouTube);

  return (
    <>
      <div className="nowInCinema">
        {yt.displayYouTube ? <YtModel embedId={yt.url} /> : null}
        <div className="nowInCinema-container">
          <div className="nowInCinema-list-container">
            <ul className="nowInCinema-list">
              <li className="nowInCinema-li active">עכשיו בקולנוע</li> |
              <li className="nowInCinema-li">ילדים</li> |
              <li className="nowInCinema-li">בקרוב</li> |
              <li className="nowInCinema-li">הופעות והצגות</li> |
              <li className="nowInCinema-li">Onyx</li>
            </ul>
          </div>
          <div className="movie-card-main">
            {moviesAr.map((movie: IMovie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </div>
          <div className="show-all-lists">
            <button className="show-all-lists-btn">
              הצג סרטים, הופעות והצגות נוספים
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NowInCinema;
