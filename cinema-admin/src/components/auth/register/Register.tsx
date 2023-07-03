import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../..";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    role: "",
    email: "",
    password: Number,
    passwordConfirm: Number,
  });

  const onChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(form);
  };

  const register = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    axios
      .post(
        `${baseUrl}/auth/register`,
        {
          user: form,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("login", "true");
          navigate("/");
        }
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <form className="register-form">
          <div className="label-container">
            <label className="label-text">שם: </label>
            <input
              onChange={(e) => onChange(e)}
              id="firstName"
              className="input-label"
              type="text"
            />
          </div>
          <div className="label-container">
            <label className="label-text">שם משפחה: </label>
            <input
              onChange={(e) => onChange(e)}
              id="lastName"
              className="input-label"
              type="text"
            />
          </div>
          <div className="label-container">
            <label className="label-text">גיל: </label>
            <input
              onChange={(e) => onChange(e)}
              id="age"
              className="input-label"
              type="number"
            />
          </div>
          <div className="label-container">
            <label className="label-text">אימייל: </label>
            <input
              onChange={(e) => onChange(e)}
              id="email"
              className="input-label"
              type="email"
            />
          </div>
          <div className="label-container">
            <label className="label-text">סוג: </label>
            <select
              onChange={(e) => onChange(e)}
              className="input-label"
              name=""
              id="role"
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
          <div className="label-container">
            <label className="label-text">סיסמא: </label>
            <input
              onChange={(e) => onChange(e)}
              id="password"
              className="input-label"
              type="password"
            />
          </div>
          <div className="label-container">
            <label className="label-text">ודא סיסמא: </label>
            <input
              onChange={(e) => onChange(e)}
              id="passwordConfirm"
              className="input-label"
              type="password"
            />
          </div>
          <div onClick={(e) => register(e)} className="btn-container">
            <button className="register-btn">הרשם</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
