import axios from "axios";
import "./login.css";
import React, { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../..";
import { setLogin } from "../../../features/loginMoodSlice";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Login = () => {
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [failLog, setFailLog] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/auth/login`,
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("login", "true");
          dispatch(setLogin());
          setLoading(false);
          setFailLog(false);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response?.data.status === "fail") {
          setLoading(false);
          setFailLog(true);
        }
      });
  };
  return (
    <div className="login">
      <div className="login-container">
        <form className="login-form">
          <label className="login-label">איימיל</label>
          <input
            className="login-input"
            id="email"
            onChange={(e) => onchange(e)}
            type="email"
          />
          <label className="login-label">סיסמא</label>
          <input
            className="login-input"
            id="password"
            onChange={(e) => onchange(e)}
            type="password"
          />
          {failLog ? (
            <span className="fail-log">סיסמא או אימייל אינם נכונים</span>
          ) : null}
          <button className="login-btn" onClick={(e) => login(e)}>
            {loading ? (
              <PulseLoader
                loading={loading}
                cssOverride={override}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <span>התחבר</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
