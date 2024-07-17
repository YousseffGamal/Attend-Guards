// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import { FaUserClock, FaMapMarkerAlt, FaUserPlus, FaUsers } from 'react-icons/fa'; // Import FaUsers icon
import { Link } from "react-router-dom";

const Navbar = ({ activeIcon }) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto nav">
            <div className="images-container">
              <Link to="/dailyrecords">
                <FaUserClock className={`nav-image ${activeIcon === 'clock' ? 'active-icon' : ''}`} />
              </Link>
              <Link to="/setlocation">
                <FaMapMarkerAlt className={`nav-image ${activeIcon === 'map' ? 'active-icon' : ''}`} />
              </Link> 
              <Link to="/adduser">
                <FaUserPlus className={`nav-image ${activeIcon === 'plus' ? 'active-icon' : ''}`} />
              </Link>
              <Link to="/users">
                <FaUsers className={`nav-image ${activeIcon === 'users' ? 'active-icon' : ''}`} /> {/* Icon for Users page */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
