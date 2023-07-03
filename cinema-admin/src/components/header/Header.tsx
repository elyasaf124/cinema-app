import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../..";
import { setLogout } from "../../features/loginMoodSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = localStorage.getItem("login");

  const logOut = () => {
    axios
      .get(`${baseUrl}/auth/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/");
          dispatch(setLogout());
          localStorage.clear();
        }
      });
  };

  return (
    <div className="header">
      <div className="header-conainer">
        <div className="right-header">
          {status === "true" ? (
            <>
              <span className="hello-admin">שלום אדמין / </span>
              <span className="hello-admin logOut" onClick={logOut}>
                התנתק
              </span>
            </>
          ) : (
            <>
              <span className="hello-admin">
                שלום אורח{" "}
                <span onClick={() => navigate("/login")} className="hello-text">
                  להתחברות
                </span>{" "}
                /{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="hello-text"
                >
                  להרשמה
                </span>
              </span>
            </>
          )}
        </div>
        <div className="header-logo">
          <img
            onClick={() => navigate("/")}
            className="logo-header"
            src="https://www.cinema-city.co.il/img/logo.png"
          />
        </div>
        <div className="white-space"></div>
      </div>
    </div>
  );
};

export default Header;
