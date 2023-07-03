import { CgTrash } from "react-icons/cg";
import { FaTicketAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeSeats } from "../../features/showTimeSlice";
import "./sortOfTicketItem.css";

interface ItempoSeat {
  id: string;
  seatNum: string;
  lineSeat: string;
}

const SortOfTicketItem = () => {
  const showTime = useSelector((state: any) => state.showtime);

  const dispatch = useDispatch();
  return (
    <>
      {showTime.temposeats.seats.map((show: ItempoSeat, i: number) => {
        return (
          <div key={show.id} className="sortOfTicketItem">
            <div className="sort-of-ticket-item-container">
              <div className="right-ticket">
                <span>{[i + 1]}</span>
                <FaTicketAlt className="ticket-icon" />
              </div>
              <div className="left-ticket">
                <div className="left-ticket-row-top">
                  <div className="sort-ticket">רגיל</div>
                  <div className="dot-line"></div>
                  <span className="price-ticket">₪47.9</span>
                  <button
                    onClick={() => dispatch(removeSeats(show))}
                    className="delete-ticket"
                  >
                    <CgTrash />
                  </button>
                </div>
                <div className="sub-left-ticket">
                  <div>
                    <div className="area">
                      אזור: אולם {showTime.showtime[0].roomId.roomNumber}
                    </div>
                    <div className="seat-and-row">
                      שורה: {show.lineSeat}, מושב: {show.seatNum}
                    </div>
                  </div>
                  <div>
                    <div className="cupon">
                      <button className="cupon-btn">
                        מבצעים/הטבות/שובר? לחצו כאן
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SortOfTicketItem;
