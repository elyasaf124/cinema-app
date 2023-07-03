import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import BoxOption from "./components/boxOption/BoxOption";
import MovieController from "./pages/controller-pages/controller-movie/MovieController";
import Header from "./components/header/Header";
import ShowTimeController from "./pages/controller-pages/showTimeController/ShowTimeController";
import Regiser from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/register" element={<Regiser />} />
          <Route path="/" element={<Home />} />
          <Route path="/box" element={<BoxOption />} />
          <Route path="/control/movie" element={<MovieController />} />
          <Route path="/control/showtime" element={<ShowTimeController />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
