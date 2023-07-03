import React, { useState } from "react";
import "./navBar.css";
import {
  CgFormatJustify,
  CgChevronLeft,
  CgSearch,
  CgClose,
} from "react-icons/cg";
import OrderBox from "../orderBox/OrderBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IMovie } from "../../types/movieTypes";
import { baseUrl } from "../..";

const NavBar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setsearchVal] = useState("");
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [filteredMovieList, setFilteredMovieList] = useState<IMovie[]>([]);

  const navigate = useNavigate();

  const moveTo = () => {
    navigate("/");
  };

  const searchBoxHide = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setSearchBox(false);
  };

  const searchBoxShow = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setIsLoading(true);
    setSearchBox(true);
    axios.get(`${baseUrl}/movies`).then((res) => {
      setMovieList(res.data.data.movies);
      setIsLoading(false);
      if (filteredMovieList.length === 0) {
        setFilteredMovieList(res.data.data.movies);
      }
      setIsLoading(false);
    });
  };

  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setsearchVal(e.target.value);
    let filterArr = movieList.filter((search) => {
      return search.subTitle.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredMovieList(filterArr);
    if (filteredMovieList.length === 0 || searchValue === "") {
      setFilteredMovieList(movieList);
    }
  };

  const move = (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>,
    movie: IMovie
  ) => {
    e.stopPropagation();
    navigate(`/cinema-city/${movie._id}`);
  };

  return (
    <div className="Nav" onClick={(e) => searchBoxHide(e)}>
      <div className="navber-container">
        <div className="right-nav">
          <ul className="ul-container">
            <CgFormatJustify className="barIcon" />
            <li className="li">ילדים</li>
            <li className="li">מתחמים</li>
            <li className="li">VIP</li>
            <li className="li">סינמה FEED</li>
            <li className="li">כנסים ואירועים</li>
          </ul>
        </div>
        <div onClick={() => moveTo()} className="logo-nav">
          <img
            className="logo-nav-img"
            src="https://www.cinema-city.co.il/img/logo.png"
          />
        </div>
        <div className="left-nav">
          {searchBox === false ? (
            <div onClick={(e) => searchBoxShow(e)} className="search-container">
              <CgSearch className="search-icon" />
              <span className="search-span">חיפוש</span>
            </div>
          ) : (
            <div
              onBlur={() => setSearchBox(false)}
              className="search-container-active"
            >
              <input
                value={searchVal}
                onChange={(e) => searchInput(e)}
                className="search-input-active"
                ref={(input) => input && input.focus()}
              />
              <CgClose
                onClick={() => setSearchBox(false)}
                className="close-icon-active"
              />
              {filteredMovieList.length === 0 ? null : (
                <ul className="search-ul">
                  {isLoading ? (
                    <span>"loading"</span>
                  ) : (
                    filteredMovieList.map((movie: IMovie) => {
                      return (
                        <option
                          className="search-li"
                          key={movie._id}
                          onMouseDown={(e) => e.preventDefault()}
                          onMouseUp={() => {
                            navigate(`/cinema-city/${movie._id}`);
                          }}
                        >
                          {movie.subTitle}
                        </option>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
          )}
          <div
            className="order-ticket-container"
            onMouseEnter={() => setShowBox(true)}
            onMouseLeave={() => setShowBox(false)}
          >
            <p className="order-ticket-btn">הזמן כרטיסים</p>
            <CgChevronLeft />
            <div className="con">{showBox ? <OrderBox /> : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
