// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { FaUserClock, FaMapMarkerAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Navbar = ({ activeIcon }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto nav">
            <div className="images-container">
            <Link to="/DailyRecords">
            <FaUserClock className={`nav-image ${activeIcon === 'clock' ? 'active-icon' : ''}`} />
            </Link>
            <Link to="/SetLocation">
            <FaMapMarkerAlt className={`nav-image ${activeIcon === 'map' ? 'active-icon' : ''}`} />
            </Link> 
            <Link to="/Adduser">
            <FaUserPlus className={`nav-image ${activeIcon === 'plus' ? 'active-icon' : ''}`} />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
