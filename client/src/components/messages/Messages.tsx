import React from "react";
import "./messages.css";
import Suggestions from "../suggestions/Suggestions";
import Footer from "../footer/Footer";

const Messages = () => {
  const arr = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfNzG2ybrazGFXH_xeSchX8wrLGmRTx3B1dAWgykiTQDDl4rvNQR0mAuL0cX8w85LhLus&usqp=CAU",
    "https://www.seret.co.il/images/movies/MaybeIDo/MaybeIDo1.jpg",
    "https://upload.wikimedia.org/wikipedia/he/thumb/4/4b/Winnie_the_Pooh_-_Blood_and_Honey.jpg/640px-Winnie_the_Pooh_-_Blood_and_Honey.jpg",
    "https://www.seret.co.il/images/movies/November/November1.Jpg",
    "https://www.seret.co.il/images/movies/AssassinClub/AssassinClub1.jpg",
    "https://www.seret.co.il/images/movies/ShotgunWedding/ShotgunWedding1.jpg",
    "https://upload.wikimedia.org/wikipedia/he/thumb/2/21/Plane_movie_poster_hebrew.jpg/220px-Plane_movie_poster_hebrew.jpg",
  ];
  return (
    <div className="messages">
      <div className="messages-container">
        <div className="recommend">
          <div className="recommend-container">
            <div className="recommend-text-container">
              <div className="recommend-text">
                הסרטים הנצפים ביותר בסינימה סיטי
              </div>
              <span className="recommend-sub-text">
                * קרא איך המחשב שלנו מרכיב את רשימת הנצפים ביותר.
              </span>
            </div>
            <div className="recommends-movies-container">
              <div className="top-recommends-movies">
                <div className="recommend-movie">
                  <div className="target-container">
                    <img className="target-img" src="" />
                    <span className="targets">1</span>
                  </div>
                  <img className="img-movie-recommend" src={arr[0]} />
                  <span className="recommend-movie-title">אנטמן</span>
                </div>
                <div className="recommend-movie">
                  <div className="target-container">
                    <img
                      className="target-img"
                      src="https://www.cinema-city.co.il/img/circle.png"
                    />
                    <span className="targets">2</span>
                  </div>
                  <img className="img-movie-recommend" src={arr[1]} />
                  <span className="recommend-movie-title">אולי חתונה</span>
                </div>
                <div className="recommend-movie">
                  <div className="target-container">
                    <img
                      className="target-img"
                      src="https://www.cinema-city.co.il/img/circle.png"
                    />
                    <span className="targets">3</span>
                  </div>
                  <img className="img-movie-recommend" src={arr[2]} />
                  <span className="recommend-movie-title">פו הדוב</span>
                </div>
                <div className="recommend-movie">
                  <div className="target-container">
                    <img
                      className="target-img"
                      src="https://www.cinema-city.co.il/img/circle.png"
                    />
                    <span className="targets">4</span>
                  </div>
                  <img className="img-movie-recommend" src={arr[3]} />
                  <span className="recommend-movie-title">נובמבר</span>
                </div>
                <div className="recommend-movie">
                  <div className="target-container">
                    <img
                      className="target-img"
                      src="https://www.cinema-city.co.il/img/circle.png"
                    />
                    <span className="targets">5</span>
                  </div>
                  <img className="img-movie-recommend" src={arr[4]} />
                  <span className="recommend-movie-title">מועדון המתנקשים</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suggestions />
      <Footer />
    </div>
  );
};

export default Messages;
