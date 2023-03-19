import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <li className="footer__list-item">
          <p className="footer__developer-name">Developed by LavisCannon</p>
        </li>

        <li className="footer__list-item">
          <p className="footer__developer-year">2023</p>
        </li>
      </div>
    </footer>
  );
}
