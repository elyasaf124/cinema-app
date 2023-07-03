import { useEffect } from "react";
import "./successPayment.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../..";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let seats: any = [];
  let mySeats: string | null = localStorage.getItem("seats");
  const showtimeId: string | null = localStorage.getItem("showtimeId");

  // Parse JSON string into array
  if (mySeats !== null) {
    seats = JSON.parse(mySeats);
  }

  useEffect(() => {
    console.log(baseUrl);
    const session = queryParams.get("session_id");
    let session_id = session?.split(" = ")[0];
    axios.get(`${baseUrl}/webhook/${session_id}`).then((res) => {
      if (res.data.session.status === "complete") {
        axios
          .patch(`${baseUrl}/showtimes/update/${showtimeId}`, {
            arr: [...seats],
          })
          .then((res) => {
            console.log(res.data.status);
            if (res.data.status === "success") {
              localStorage.removeItem("seats");
              localStorage.removeItem("showtimeId");
            }
          });
      }
    });
  }, [location]);

  return (
    <div className="successPayment">
      <div className="successPayment-container">
        <h1>הזמנה בוצעה בהצלחה!</h1>
        <p>תודה על רכישתך מקווים שתהנה חשבונית תישלח למייל בדקות הקרובות</p>
        <button onClick={() => navigate("/")} className="btn-success">
          המשך לאתר
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
