import { IMovie } from "../../types/movieTypes";
import "./movieCard.css";

interface MovieProps {
  movie: IMovie;
  getMovie: any;
}
const MovieCard = ({ movie, getMovie }: MovieProps) => {
  return (
    <>
      <div className="movieCard">
        <div onClick={() => getMovie(movie._id)} className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img className="img-card" src={movie.Poster} />
              <span className="title-card-movie">{movie.subTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
