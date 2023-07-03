import React from "react";
import { useEffect, useState } from "react";
import { RiArrowUpSLine } from "@react-icons/all-files/ri/RiArrowUpSLine";
import "./goTop.css";

const GoTop = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 1000);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);

  return (
    <div className={showGoTop ? "" : "goTopHidden"} onClick={handleScrollUp}>
      <button type={"button"} className="goTop">
        <span className="goTopIcon">
          <RiArrowUpSLine className="iconTop" />
          {/* <ion-icon class="iconTop" name="chevron-up-circle-outline"></ion-icon> */}
        </span>
      </button>
    </div>
  );
};

export default GoTop;
