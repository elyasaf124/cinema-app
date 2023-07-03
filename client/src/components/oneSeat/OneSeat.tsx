import React, { useEffect, useState } from "react";
import "./oneSeat.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addSeats, removeSeats } from "../../features/showTimeSlice";
import { nanoid } from "nanoid";

interface Iprops {
  line: number;
  seat: number;
  showtime: Array<mov>;
}

interface mov {
  _id: String;
  seats: [];
}

interface Iseat {
  id: string | number;
  seatNum: string;
  lineNum: string;
}

const OneSeat = ({ line, seat, showtime }: Iprops) => {
  const [popUp, setPopUp] = useState(false);
  const [seatSelected, setSeatSelected] = useState(false);
  const showTime = useSelector((state: any) => state.showtime.temposeats);

  const dispatch = useDispatch();

  const seatSelectedFunc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const obj = {
      id: (e.target as HTMLButtonElement).id,
      seatNum: "",
      lineSeat: "",
    };
    if (seatSelected) {
      dispatch(removeSeats(obj));
      setSeatSelected(false);
      return;
    } else {
      const seat = (e.target as HTMLButtonElement).id.split(",");

      seat.forEach(() => {
        obj.lineSeat = seat[0];
        obj.seatNum = seat[1];
      });
      dispatch(addSeats(obj));
      setSeatSelected(true);
    }
  };

  const selectClass = (): string => {
    let isSeatOccupied = false;
    let isSelected = false;

    showtime[0].seats.forEach((seatP: Iseat) => {
      if (seatP.id === `${line + 1},${seat + 1}`) {
        isSeatOccupied = true;
      }
    });

    if (isSeatOccupied) {
      return "seat-btn seatOcupid" + (seatSelected ? " select" : "");
    }
    showTime.seats.forEach((seatP: Iseat) => {
      if (seatP.id === `${line + 1},${seat + 1}`) {
        isSelected = true;
      }
    });
    if (isSelected) {
      return "seat-btn select";
    } else {
      return "seat-btn" + (seatSelected ? " select" : "");
    }
  };

  return (
    <button
      className={selectClass()}
      {...(selectClass().includes("seatOcupid") ? { disabled: true } : {})}
      onMouseEnter={() => setPopUp(true)}
      onMouseLeave={() => setPopUp(false)}
      onClick={(e) => seatSelectedFunc(e)}
      id={`${line + 1},${seat + 1}`}
      key={nanoid()}
    >
      <span>
        {popUp && (
          <div className="pop-container">
            <div className="pop">
              שורה:{line + 1} מושב:{seat + 1}
            </div>
          </div>
        )}
      </span>
    </button>
  );
};

export default OneSeat;
