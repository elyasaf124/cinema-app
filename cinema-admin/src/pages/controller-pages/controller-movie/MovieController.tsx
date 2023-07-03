import "./controllerMovie.css";
import AddMovie from "../../../components/addMovie/AddMovie";
import UpdateMovieAndDelete from "../../../components/updateMovieAndDelete/UpdateMovieAndDelete";

const MovieController = () => {
  return (
    <div className="movie-controller">
      <h1 className="title-control">Movie Controller</h1>
      <div className="add-movie-section">
        <UpdateMovieAndDelete />
        <AddMovie />
      </div>
    </div>
  );
};

export default MovieController;
