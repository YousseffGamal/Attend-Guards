import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from "./employeesRecord.module.css";
import Vector from "../../assets/images/Vector.png"
import profileImg from "../../assets/images/Group 1653.png"
import Navbar from '../../component/navbar/navbar';
import { Link } from 'react-router-dom';

const EmployeesRecord = () => {
  return (
    <>
  <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="text-center Attend-title">Attend Guards</h1>
          <p className="text-center Attend-suptitle">Employees record</p>
          
        </div>
        <img src={profileImg} alt="Profile" className="img-fluid" style={{ maxWidth: '100px' }} />

        
      </div>
    </div>

    <div className="table-container">
      <table className="table table-responsive " style={{background:"red"}}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>HOURS</th>
            <th>FROM:TO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>9:00 AM - 5:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          <tr style={{border:"none"}}>
            <td>Jane Smith</td>
            <td>10:00 AM - 6:00 PM</td>
            <td>1/5 : 21/5</td>
             <td>
                <Link to="/DailyRecords">
                  <img src={Vector} alt="Navigate" />
                </Link>
              </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    <Navbar activeIcon="clock" />

    </>
  );
}

export default EmployeesRecord;
