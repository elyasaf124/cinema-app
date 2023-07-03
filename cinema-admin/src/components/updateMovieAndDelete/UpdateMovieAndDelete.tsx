import { useEffect, useState } from "react";
import "./updateMovieAndDelete.css";
import "../addMovie/addMovie.css";
import axios from "axios";
import MovieCard from "../movieCard/MovieCard";
import { baseUrl } from "../..";

const UpdateMovieAndDelete = () => {
  const [openBoxGenere, setOpenBoxGenere] = useState(false);
  const [openBoxLanguage, setOpenBoxLanguage] = useState(false);
  const [form, setForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieUpdate, setMovieUpdate] = useState<any>([
    {
      Title: undefined,
      subTitle: undefined,
      Released: undefined,
      Runtime: undefined,
      Genre: [],
      Director: undefined,
      Writer: undefined,
      Actors: undefined,
      Plot: undefined,
      Language: [],
      Poster: undefined,
      Type: "movie",
      LimitAge: undefined,
      Trailer: undefined,
    },
  ]);

  const deleteMovie = async () => {
    const answer = prompt(
      "Are you sure you want to delete this movie? (true of false)"
    );
    if (answer === "true") {
      await axios
        .delete(`${baseUrl}/movies/${movieUpdate._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status === "success") {
            alert("movie delete successfully");
            let moviesFilter = movies.filter((movie: any) => {
              return movie._id !== movieUpdate._id;
            });
            setMovies(moviesFilter);
          }
        });
    } else return;
  };

  const onChangeHandle = (e: any) => {
    const { id, value, textContent } = e.target;
    let arr: any = [];
    if (id === "Released") {
      const [year, month, day] = value.split("-");
      const formattedValue = `${day}/${month}/${year}`;
      return setMovieUpdate((prev: any) => ({ ...prev, [id]: formattedValue }));
    }
    if (
      id === "Genre" ||
      id === "Language" ||
      id === "עברית" ||
      id === "אנגלית"
    ) {
      if (
        textContent !== "אקשן" &&
        textContent !== "מתח" &&
        textContent !== "ספורט" &&
        textContent !== "אימה" &&
        textContent !== "עברית" &&
        textContent !== "אנגלית"
      ) {
        return alert("please use the select options");
      }
      let genreExists = movieUpdate.Genre.find(
        (genre: String) => genre === textContent
      );
      let languageExists = movieUpdate.Language.find(
        (language: String) => language === textContent
      );
      setOpenBoxGenere(false);
      if (genreExists) return;
      setOpenBoxLanguage(false);
      if (languageExists) return;
      arr.push(textContent);
      return setMovieUpdate((prev: any) => ({
        ...prev,
        [id]: [...prev[id], ...arr],
      }));
    }
    return setMovieUpdate((prev: any) => ({ ...prev, [id]: value }));
  };

  const updateMovie = () => {
    console.log(movieUpdate);
    axios
      .patch(
        `${baseUrl}/movies/${movieUpdate._id}`,
        {
          movieUpdate,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") alert("movie update successfully");
      });
  };

  const getMovie = async (movieId: String) => {
    await axios
      .get(`${baseUrl}/movies/${movieId}`)
      .then(async (res) => {
        setMovieUpdate(res.data.data.movie);
        await setForm(true);
      })
      .then(() => {
        setTimeout(() => {
          const element = document.getElementById("add-section");
          window.scrollTo({
            top: element?.offsetTop,
            behavior: "smooth",
          });
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(`${baseUrl}/movies`).then((res) => {
      setMovies(res.data.data.movies);
    });
  }, []);

  const onDeleteGenre = (category: string, item: string) => {
    const updatedGenres = movieUpdate[category].filter(
      (g: string) => g !== item
    );
    setMovieUpdate((prev: any) => ({ ...prev, [category]: updatedGenres }));
  };
  return (
    <div>
      <div className="movie-list">
        {movies.map((movie: any) => {
          return (
            <MovieCard key={movie._id} movie={movie} getMovie={getMovie} />
          );
        })}
      </div>
      <div id="add-section" className="add-movie">
        {form && (
          <>
            <h1 className="control-title">עדכן סרט</h1>
            <div className="add-movie-form">
              <div className="add-movie-form-container">
                <div className="label-container">
                  <label className="label-form">שם הסרט באנגלית: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Title"
                    placeholder="english name"
                    value={movieUpdate.Title}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">שם הסרט בעברית: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="subTitle"
                    placeholder="שם בעברית"
                    value={movieUpdate.subTitle}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">תאריך שחרור: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Released"
                    placeholder="24/10/2015"
                    type="date"
                    value={movieUpdate.Released}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">אורך סרט בדק': </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Runtime"
                    placeholder="120"
                    type="number"
                    value={movieUpdate.Runtime}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">ג'אנר: </label>
                  <div
                    onMouseEnter={() => setOpenBoxGenere(true)}
                    onMouseLeave={() => setOpenBoxGenere(false)}
                  >
                    <div className="selected-genres-container">
                      {/* Render selected genres as buttons */}
                      {movieUpdate.Genre.map((genre: string, index: number) => (
                        <button
                          key={index}
                          className="selected-genre-button"
                          onClick={() => onDeleteGenre("Genre", genre)}
                        >
                          {genre} <span className="delete-button">x</span>
                        </button>
                      ))}
                    </div>
                    <input
                      className="input-form"
                      onChange={(e) => onChangeHandle(e)}
                      id="Genre"
                      placeholder="מתח ספורט אימה..."
                      value={movieUpdate.Genre}
                      // Clear the value to prevent direct input
                    />
                    {openBoxGenere ? (
                      <ul className="input-form-ul">
                        {/* Render genre options in the dropdown */}
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Genre"
                          className="input-form-li"
                        >
                          אימה
                        </li>
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Genre"
                          className="input-form-li"
                        >
                          מתח
                        </li>
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Genre"
                          className="input-form-li"
                        >
                          ספורט
                        </li>
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Genre"
                          className="input-form-li"
                        >
                          אקשן
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>

                <div className="label-container">
                  <label className="label-form">במאי: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Director"
                    defaultValue="Christopher McQuarrie"
                    placeholder="שם הבמאי"
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">כותב: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Writer"
                    defaultValue="Bruce Geller, Christopher McQuarrie"
                    placeholder="שם הכותב"
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">שחקנים: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Actors"
                    defaultValue="Tom Cruise, Henry Cavill, Ving Rhames"
                    placeholder="שמות השחקנים בסרט"
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">תקציר: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Plot"
                    placeholder="תקציר..."
                    value={movieUpdate.Plot}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">שפות: </label>
                  <div
                    onMouseEnter={() => setOpenBoxLanguage(true)}
                    onMouseLeave={() => setOpenBoxLanguage(false)}
                  >
                    <div className="selected-genres-container">
                      {/* Render selected genres as buttons */}
                      {movieUpdate.Language.map(
                        (language: string, index: number) => (
                          <button
                            key={index}
                            className="selected-genre-button"
                            onClick={() => onDeleteGenre("Language", language)}
                          >
                            {language} <span className="delete-button">x</span>
                          </button>
                        )
                      )}
                    </div>
                    <input
                      className="input-form"
                      onChange={(e) => onChangeHandle(e)}
                      id="Language"
                      placeholder="עברית אנגלית..."
                      value={movieUpdate.Language}
                    />
                    {openBoxLanguage ? (
                      <ul className="input-form-ul">
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Language"
                          className="input-form-li"
                        >
                          עברית
                        </li>
                        <li
                          onClick={(e) => onChangeHandle(e)}
                          id="Language"
                          className="input-form-li"
                        >
                          אנגלית
                        </li>
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="label-container">
                  <label className="label-form">תמונה: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Poster"
                    placeholder="כתובת לתמונה..."
                    value={movieUpdate.Poster}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">סוג: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Type"
                    placeholder="סרט,הצגה"
                    value={movieUpdate.Type}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">מוגבל לצפיה מגיל: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="LimitAge"
                    placeholder="הגבלת גיל.."
                    type="number"
                    value={movieUpdate.LimitAge}
                  />
                </div>
                <div className="label-container">
                  <label className="label-form">טריילר: </label>
                  <input
                    className="input-form"
                    onChange={(e) => onChangeHandle(e)}
                    id="Trailer"
                    placeholder="כתובת טריילר יוטיוב..."
                    value={movieUpdate.Trailer}
                  />
                </div>
              </div>
            </div>
            <div className="btns-container">
              <div onClick={updateMovie} className="add-movie-btn-container">
                <button className="add-movie-btn">עדכן סרט</button>
              </div>
              <div onClick={deleteMovie} className="add-movie-btn-container">
                <button className="add-movie-btn">מחק סרט</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateMovieAndDelete;
