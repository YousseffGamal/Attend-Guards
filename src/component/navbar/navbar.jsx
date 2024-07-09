// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { FaUserClock, FaMapMarkerAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = ({ activeIcon }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto nav">
            <div className="images-container">
              <FaUserClock className={`nav-image ${activeIcon === 'clock' ? 'active-icon' : ''}`} />
              <FaMapMarkerAlt className={`nav-image ${activeIcon === 'map' ? 'active-icon' : ''}`} />
              <FaUserPlus className={`nav-image ${activeIcon === 'plus' ? 'active-icon' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
