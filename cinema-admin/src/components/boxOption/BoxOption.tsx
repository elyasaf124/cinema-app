import "./boxOption.css";
import { useNavigate } from "react-router-dom";

const BoxOption = (props: any) => {
  const navigate = useNavigate();
  return (
    <div className="box-option">
      <div
        className="box-option-container"
        onClick={() => navigate(`/control/${props.moveTo}`)}
      >
        <div className="box">
          <h1 className="box-title">{props.title}</h1>
          <p className="box-desc">
            ביצוע פעולות שונות כגון: הוספת {props.action}, מחיקה עדכון ועוד...
          </p>
          <ul className="box-ul">
            <li className="box-li">הוספת {props.action}</li>
            <li className="box-li">עדכון {props.action}</li>
            <li className="box-li">מחיקת {props.action}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxOption;
