import { Routes, Route } from "react-router-dom";
import Room from "./components/room/Room";
import SuccessPayment from "./components/successPayment/SuccessPayment";
import Home from "./pages/home/Home";
import MoviePage from "./pages/moviePage/MoviePage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema-city/:movieId" element={<MoviePage />} />
        <Route path="/cinema-city/order/success" element={<SuccessPayment />} />
        <Route path="/cinema-city/order/:showtimeId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
