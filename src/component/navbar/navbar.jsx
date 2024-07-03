// src/components/Login.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import f from "../../assets/images/f.png";
import s from "../../assets/images/s.png";
import t from "../../assets/images/t.png";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto nav">
            <div className="images-container">
              <img src={f} alt="First" className="nav-image" />
              <img src={s} alt="Second" className="nav-image" />
              <img src={t} alt="Third" className="nav-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
