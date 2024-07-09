import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Location.css";
import Vector from "../../assets/images/Vector.png"
import profileImg from "../../assets/images/Group 1653.png"
import Navbar from '../../component/navbar/navbar';
const Location = () => {
  return (
    <>
  <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="text-center Attend-title">Attend Guards</h1>
          <p className="text-center Attend-suptitle">Add Location</p>
          
        </div>
        <img src={profileImg} alt="Profile" className="img-fluid" style={{ maxWidth: '100px' }} />

        
      </div>
    </div>
          {/* Responsive Map */}
          <div className="map-container">
        <iframe
          title="Map"
          className="responsive-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107761.9878026566!2d-73.9653557216112!3d40.782864406779405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2594b413b0d7b%3A0xa2f3596ae8a8125e!2sCentral%20Park%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1625709769875!5m2!1sen!2sus"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>

    <Navbar activeIcon="map" />

    </>
  );
}

export default Location;
