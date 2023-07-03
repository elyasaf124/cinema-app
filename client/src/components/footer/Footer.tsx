import React from "react";
import "./footer.css";
import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { CgFacebook } from "@react-icons/all-files/cg/CgFacebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="line"></div>
      <div className="footer-container">
        <div className="footer-content-container">
          <ul className="footer-content">
            <li className="footer-content-li">
              <b>אודות</b>
            </li>
            <li className="footer-content-li">בדיקה/ביטול הזמנה</li>
            <li className="footer-content-li">צור קשר</li>
            <li className="footer-content-li">אודות סינמה סיטי</li>
            <li className="footer-content-li">מידע כללי</li>
            <li className="footer-content-li">המתחמים שלנו</li>
          </ul>
          <ul className="footer-content">
            <li className="footer-content-li">
              <b>קישורים</b>
            </li>
            <li className="footer-content-li">כנסים ואירועים</li>
            <li className="footer-content-li">יום הולדת מהסרטים</li>
            <li className="footer-content-li">זמן אשכול – מרכז לימודי פנאי</li>
            <li className="footer-content-li">פרסום וקד"מ</li>
            <li className="footer-content-li">דרושים</li>
          </ul>
          <ul className="footer-content">
            <li className="footer-content-li">
              <b>תנאי שימוש</b>
            </li>
            <li className="footer-content-li">תקנון</li>
            <li className="footer-content-li">זכויות</li>
            <li className="footer-content-li">נגישות</li>
            <li className="footer-content-li">הצהרת נגישות</li>
          </ul>
        </div>
        <div className="newsletter">
          <div className="newsletter-container">
            <div className="icons">
              <CgFacebook className="icon-social" />
              <AiOutlineInstagram className="icon-social" />
              <SiTiktok className="icon-social" />
            </div>
            <div className="newsletter-register-container">
              <span className="newsletter-register-text">הרשם לניוזלטר</span>
              <div className="newsletter-input-container">
                <input
                  placeholder="דואר אלקטרוני"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">שלח</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
