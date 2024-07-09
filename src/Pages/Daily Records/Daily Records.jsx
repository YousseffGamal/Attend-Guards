import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Daily Records.css";
import Vector from "../../assets/images/Vector.png"
import profileImg from "../../assets/images/Group 1653.png"
import Navbar from '../../component/navbar/navbar';
const DailyRecords = () => {
  return (
    <>
  <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="text-center Attend-title">Attend Guards</h1>
          <p className="text-center Attend-suptitle">Frank’s Daily Records</p>
          
        </div>
        <img src={profileImg} alt="Profile" className="img-fluid" style={{ maxWidth: '100px' }} />

        
      </div>
    </div>

    <div className="table-container">
      <table className="table table-responsive " style={{background:"red"}}>
        <thead>
          <tr>
            <th>DAY</th>
            <th style={{textAlign:"center"}}>HOURS</th>
            <th style={{textAlign:"right"}}>FROM:TO</th>
    
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>9:00 AM - 5:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}}>1/5 : 21/5</td>
            
          </tr>
          <tr style={{border:"none"}}>
            <td>Wed, 1/5</td>
            <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
            <td style={{textAlign:"right"}} >1/5 : 21/5</td>
            
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    <Navbar activeIcon="clock" />

    </>
  );
}

export default DailyRecords;
