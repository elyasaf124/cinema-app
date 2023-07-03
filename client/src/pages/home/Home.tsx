import { useEffect, useState } from "react";
import "./home.css";
import OrderTicketQuik from "../../components/orderTicketQuik/OrderTicketQuik";
import NowInCinema from "../../components/nowInCinema/NowInCinema";
import Messages from "../../components/messages/Messages";
import NavBar from "../../components/navBar/NavBar";
import GoTop from "../../components/goTop/GoTop";
import { IMovie } from "../../types/movieTypes";
import axios from "axios";
import { baseUrl } from "../../index";

const Home = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  let moviesArr = [];

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      console.log(baseUrl);
      axios.get(`${baseUrl}/movies`).then((moviesRes) => {
        moviesArr = moviesRes.data.data.movies.slice(-14);
        setMovies(moviesArr);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="home">
      <img
        className="img"
        src="https://cdn.modulus.co/fetch/cinemacity/w_1920,h_0,mode_crop,v_4f7026f8-2419-4c0e-a835-774fecc120bf41/http://80.178.112.171/images/JW4_CC_BANNER_2000x832.jpg"
        alt=""
      />
      <NavBar />
      <OrderTicketQuik />
      <NowInCinema moviesAr={movies} />
      <Messages />
      <GoTop />
    </div>
  );
};

export default Home;
