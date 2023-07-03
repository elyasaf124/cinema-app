import "./home.css";
import BoxOption from "../../components/boxOption/BoxOption";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">
        שלום אדמין!
        <br /> הנך נמצא בבקרת השליטה של האתר כאן תוכל לעשות פעולות שונות כגון:
        הוספה מחיקה ועדכון ועוד...
      </h1>
      <div className="box-options">
        <BoxOption title="Movie Controll" action="סרט" moveTo="movie" />
        <BoxOption title="Showtime Controll" action="הקרנה" moveTo="showtime" />
      </div>
    </div>
  );
};

export default Home;
