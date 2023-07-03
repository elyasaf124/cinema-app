import axios from "axios";
import React, { useState } from "react";
import "./detailsAndPayment.css";
import { Stripe } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPrevStepBuy, setUser } from "../../features/showTimeSlice";
import { useParams } from "react-router-dom";
import { baseUrl } from "../..";

const DetailsAndPayment = ({ setStepThree }: any) => {
  const stripe = useStripe();
  const { showtimeId } = useParams();
  const showTime = useSelector((state: any) => state.showtime);
  const movie = useSelector(
    (state: any) => state.showtime.showtime[0].movies[0]
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleGuestCheckout = async () => {
    const seats = JSON.stringify(showTime.temposeats.seats);

    // Store JSON string in LocalStorage
    localStorage.setItem("seats", seats);
    localStorage.setItem("showtimeId", showtimeId as string);
    const line_items = [
      {
        quantity: showTime.temposeats.seats.length,
        price_data: {
          currency: "usd",
          unit_amount: 47 * 100, // amount is in cents
          product_data: {
            name: movie.Title,
            description: movie.Plot,
            images: [movie.Poster],
          },
        },
      },
    ];
    let isCancelled = false;
    if (!isCancelled) {
      await axios
        .post(`${baseUrl}/stripe/create-checkout-session`, {
          line_items,
          customer_email: email,
          seats: showTime.temposeats.seats,
          showtimeId: showtimeId,
        })
        .then(async (res: any) => {
          const { sessionId } = res.data;
          if (stripe) {
            const { error } = await stripe.redirectToCheckout({
              sessionId,
            });
            if (error) {
              console.log(error);
            }
          }
        });
    }
    return () => {
      isCancelled = true;
    };
  };
  return (
    <div className="detailsAndPayment">
      <div className="detailsAndPayment-container">
        <div className="detailsAndPayment-content">
          <h1 className="detailsAndPayment-title">פרטים ותשלום</h1>
          <div className="order-info">
            <span>סה"כ כרטיסים: 1</span>
            <span>סה"כ לתשלום: 13.9₪</span>
          </div>
          <form className="detailsAndPayment-form">
            <div className="detailsAndPayment-form-box">
              <span className="detailsAndPayment-form-box-text">שם פרטי</span>
              <input
                id="firstname"
                className="detailsAndPayment-form-box-input"
              />
            </div>
            <div className="detailsAndPayment-form-box">
              <span className="detailsAndPayment-form-box-text">שם משפחה</span>
              <input
                id="lastname"
                className="detailsAndPayment-form-box-input"
              />
            </div>
            <div className="detailsAndPayment-form-box">
              <span className="detailsAndPayment-form-box-text">
                תעודת זהות
              </span>
              <input
                id="identityCard"
                className="detailsAndPayment-form-box-input"
              />
            </div>
            <div className="detailsAndPayment-form-box">
              <span className="detailsAndPayment-form-box-text">
                דואר אלקטרוני
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="Email"
                className="detailsAndPayment-form-box-input"
              />
            </div>
            <div className="detailsAndPayment-form-box">
              <span className="detailsAndPayment-form-box-text">
                טלפון נייד
              </span>
              <input
                onChange={(e) => dispatch(setUser(e.target))}
                id="phone"
                className="detailsAndPayment-form-box-input"
              />
            </div>
            <div className="checkbox-container">
              <input className="checkbox-input" type={"checkbox"} />
              <span className="checkbox-text">
                מאשר שקראתי והבנתי את התקנון
              </span>
            </div>
            <div className="btns-container">
              <div onClick={handleGuestCheckout} className="next-btn">
                <span className="next-text">לתשלום בכרטיס אשראי</span>
                <span className="next-sub-text">(13.90)</span>
              </div>
              <div onClick={() => setStepThree(false)} className="back-btn">
                <span className="back-text">חזרה</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsAndPayment;
