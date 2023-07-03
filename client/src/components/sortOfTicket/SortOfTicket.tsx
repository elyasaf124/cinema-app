import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPrevStepBuy, setStepBuy } from "../../features/showTimeSlice";
import SortOfTicketItem from "../sortOfTicketItem/SortOfTicketItem";
import { useStripe } from "@stripe/react-stripe-js";
import "./sortOfTicket.css";
import DetailsAndPayment from "../detailsAndPayment/DetailsAndPayment";

interface SortOfTicketProps {
  setStepTwo: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortOfTicket = ({ setStepTwo }: SortOfTicketProps) => {
  const showTime = useSelector((state: any) => state.showtime);
  const dispatch = useDispatch();

  const nextStep = () => {
    setStepThree(true);
  };

  const [stepThree, setStepThree] = useState(false);

  const stapBack = () => {
    setStepTwo(false);
    dispatch(setPrevStepBuy());
  };

  return (
    <>
      {!stepThree ? (
        <div className="sortOfTicket">
          <div className="sort-of-tickets-container">
            <div className="sort-of-tickets-title">בחרו סוג כרטיס</div>
            <SortOfTicketItem />
            <div className="total-container">
              <div className="total-tickets">
                סה"כ כרטיסים {showTime.temposeats.seats.length}
              </div>
              <div className="total-price">
                סה"כ לתשלום ₪{showTime.temposeats.seats.length * 47}
              </div>
            </div>
            <div className="btns-container">
              <div onClick={() => nextStep()} className="next-btn">
                <span className="next-text">הבא</span>
                <span className="next-sub-text">
                  כרטיסים: {showTime.temposeats.seats.length} - ₪
                  {showTime.temposeats.seats.length * 47}
                </span>
              </div>
              <div onClick={() => stapBack()} className="back-btn">
                <span className="back-text">חזרה</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailsAndPayment setStepThree={setStepThree} />
      )}
    </>
  );
};

export default SortOfTicket;
