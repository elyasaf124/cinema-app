import { useState } from "react";
import "./addMovie.css";
import axios from "axios";
import { IMovie } from "../../types/movieTypes";
import { baseUrl } from "../..";

const AddMovie = () => {
  const [openBoxGenere, setOpenBoxGenere] = useState(false);
  const [openBoxLanguage, setOpenBoxLanguage] = useState(false);
  const [movie, setMovie] = useState<IMovie>({
    Title: "",
    subTitle: "",
    Released: "",
    Runtime: "",
    Genre: [],
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: [],
    Poster: "",
    Type: "movie",
    LimitAge: "",
    Trailer: "",
  });

  const onChangeHandle = (e: any) => {
    const { id, value, textContent } = e.target;
    let arr: String[] = [];
    if (id === "Released") {
      const [year, month, day] = value.split("-");
      const formattedValue = `${day}/${month}/${year}`;
      return setMovie((prev) => ({ ...prev, [id]: formattedValue }));
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
      let genreExists = movie.Genre.find((el) => el === textContent);
      let languageExists = movie.Language.find((el) => el === textContent);
      setOpenBoxGenere(false);
      if (genreExists) return;
      setOpenBoxLanguage(false);
      if (languageExists) return;
      arr.push(textContent);
      return setMovie((prev: any) => ({
        ...prev,
        [id]: [...prev[id], ...arr],
      }));
    }
    return setMovie((prev) => ({ ...prev, [id]: value }));
  };

  const addMovie = () => {
    axios
      .post(`${baseUrl}/movies`, {
        movie,
      })
      .then((res) => {
        if (res.data.status === "success") {
          alert("movie add successfully");
          setMovie({
            Title: "",
            subTitle: "",
            Released: "",
            Runtime: "",
            Genre: [],
            Director: "",
            Writer: "",
            Actors: "",
            Plot: "",
            Language: [],
            Poster: "",
            Type: "movie",
            LimitAge: "",
            Trailer: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDeleteGenre = (genre: string) => {
    const updatedGenres = movie.Genre.filter((g: string) => g !== genre);
    setMovie((prev) => ({ ...prev, Genre: updatedGenres }));
  };

  return (
    <div className="add-movie">
      <h1 className="control-title">הוספת סרט</h1>
      <div className="add-movie-form">
        <div className="add-movie-form-container">
          <div className="label-container">
            <label className="label-form">שם הסרט באנגלית: </label>
            <input
              className="input-form"
              onChange={(e) => onChangeHandle(e)}
              id="Title"
              placeholder="english name"
            />
          </div>
          <div className="label-container">
            <label className="label-form">שם הסרט בעברית: </label>
            <input
              className="input-form"
              onChange={(e) => onChangeHandle(e)}
              id="subTitle"
              placeholder="שם בעברית"
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
            />
          </div>
          <div className="label-container">
            <label className="label-form">ג'אנר: </label>
            <div
              onMouseEnter={() => setOpenBoxGenere(true)}
              onMouseLeave={() => setOpenBoxGenere(false)}
            >
              <div className="selected-genres-container">
                {movie.Genre.map((genre, index) => (
                  <button
                    key={index}
                    className="selected-genre-button"
                    onClick={() => onDeleteGenre(genre)}
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
                value={""}
              />
              {openBoxGenere ? (
                <ul className="input-form-ul">
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
            />
          </div>
          <div className="label-container">
            <label className="label-form">שפות: </label>
            <div
              onMouseEnter={() => setOpenBoxLanguage(true)}
              onMouseLeave={() => setOpenBoxLanguage(false)}
            >
              <input
                className="input-form"
                onChange={(e) => onChangeHandle(e)}
                id="Language"
                placeholder="עברית אנגלית..."
                value={movie.Language}
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
            />
          </div>
          <div className="label-container">
            <label className="label-form">סוג: </label>
            <input
              className="input-form"
              onChange={(e) => onChangeHandle(e)}
              id="Type"
              placeholder="סרט,הצגה"
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
            />
          </div>
          <div className="label-container">
            <label className="label-form">טריילר: </label>
            <input
              className="input-form"
              onChange={(e) => onChangeHandle(e)}
              id="Trailer"
              placeholder="כתובת טריילר יוטיוב..."
            />
          </div>
        </div>
      </div>
      <div onClick={addMovie} className="add-movie-btn-container">
        <button className="add-movie-btn">הוסף סרט</button>
      </div>
    </div>
  );
};

export default AddMovie;
