import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaRuler, FaSearch } from 'react-icons/fa';
import Style from "./location.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from '../../component/navbar/navbar';
import classNames from "classnames";
import { Link } from "react-router-dom";

const Location = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState('');
  const [range, setRange] = useState(0); // Initialize range with 0

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRange(parseInt(e.target.value)); // Parse value as integer
  };

  return (
    <>
      <div className={classNames("container")}>
        <div className={classNames("row", "align-items-center")}>
          <div className={classNames("col")}>
            <h1 className={classNames(Style.attendTitle, "text-center")}>
              Attend Guards
            </h1>
            <p className={classNames(Style.attendSuptitle, "text-center")}>
              Add Location
            </p>
          </div>
          <div
            className={classNames("col-auto")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
          >
            <img
              className={classNames("img-fluid")}
              src={profileImg}
              alt="Profile"
              style={{ maxWidth: "100px", cursor: "pointer" }}
            />
            {showOptions && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  zIndex: 1,
                }}
              >
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "10px",
                    margin: "0",
                  }}
                >
                  <li style={{ padding: "5px 10px", cursor: "pointer" }}>
                  <Link to="/ProfilePage">
                    Profile 
                    </Link>
                  </li>
                  <li style={{ padding: "5px 10px", cursor: "pointer" }}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={classNames(Style.searchBarContainer)}>
        <form className={classNames("d-flex", "justify-content-center", "mb-3")}>
          <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
            <input type="text" className="form-control" placeholder="Search location" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Responsive Map */}
      <div className={classNames(Style.mapContainer)}>
        <iframe
          title="Map"
          className={classNames(Style.responsiveMap)}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107761.9878026566!2d-73.9653557216112!3d40.782864406779405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2594b413b0d7b%3A0xa2f3596ae8a8125e!2sCentral%20Park%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1625709769875!5m2!1sen!2sus"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>

      {/* Name and Range Inputs */}
      <div className={classNames("container", "mb-3", Style.customInputs)}>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaUser style={{fontSize:"1.5rem"}} />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          
          <div className="col-md-4 mb-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaRuler style={{fontSize:"1.5rem"}}  />
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="Range in meter"

                onChange={handleRangeChange}
              />
            </div>
          </div>
        </div>
      </div>

      <Navbar activeIcon="map" />
    </>
  );
}

export default Location;
