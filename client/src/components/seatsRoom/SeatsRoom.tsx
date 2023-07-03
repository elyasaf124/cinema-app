import axios from "axios";
import { count } from "console";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OneSeat from "../oneSeat/OneSeat";
import SortOfTicket from "../sortOfTicket/SortOfTicket";
import "./seatsRoom.css";
import { useDispatch } from "react-redux";
import { setStepBuy } from "../../features/showTimeSlice";
import { IAllShowTime } from "../../types/movieTypes";

interface IAllShowTimeProps {
  showtime: IAllShowTime[];
}

const SeatsRoom = ({ showtime }: IAllShowTimeProps) => {
  const seatRows: any[] = [];
  const [steptwo, setStepTwo] = useState<boolean>(false);
  const dispatch = useDispatch();

  let seatsPerLine = showtime[0].roomId.numsSetEachRow.map((el: number) => el);
  let numLines = showtime[0].roomId.numsRows;

  const showTime = useSelector((state: any) => state.showtime.showtime);
  const temposeats = useSelector((state: any) => state.showtime.temposeats);

  const buyTicket = () => {
    if (temposeats.seats.length === 0) {
      return;
    } else {
      setStepTwo(true);
      dispatch(setStepBuy());
    }
  };

  for (let line = 0; line < numLines; line++) {
    const seatRow = [];

    for (let seat = 0; seat < seatsPerLine[line]; seat++) {
      seatRow.push(
        <OneSeat
          seat={seat}
          line={line}
          showtime={showTime}
          key={`${seat}${line}`}
        />
      );
    }

    seatRows.push(
      <div className="row" key={line}>
        {line + 1}
        {seatRow}
      </div>
    );
  }

  return (
    <>
      {!steptwo ? (
        <div className="seatsRoom">
          <div className="seats-room-container">
            <div className="seats-room-title">בחרו מושבים</div>
            <div className="screen-box">
              <div className="screen-container">
                <span className="screen-text">מסך</span>
                <div className="screen"></div>
              </div>
            </div>
            <div className="seats">
              <div className="seats-container">{seatRows}</div>
            </div>
            <div className="status-seat">
              <div className="status-seat-container">
                <div className="seat-color-status clearing"></div>
                <div className="seat-text-status">מושב פנוי</div>
              </div>
              <div className="status-seat-container">
                <div className="seat-color-status selected "></div>
                <div className="seat-text-status">מושב נבחר</div>
              </div>
              <div className="status-seat-container ">
                <div className="seat-color-status catch"></div>
                <div className="seat-text-status">מושב תפוס</div>
              </div>
            </div>
            <div onClick={buyTicket} className="next-btn">
              <span className="next-text">הבא</span>
              <span className="next-sub-text">
                נבחרו {temposeats.seats.length} מושבים
              </span>
            </div>
          </div>
        </div>
      ) : (
        // <DetailsAndPayment />
        <SortOfTicket setStepTwo={setStepTwo} />
      )}
    </>
  );
};

export default SeatsRoom;
