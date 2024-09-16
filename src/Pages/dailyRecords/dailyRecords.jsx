import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";
import Style from "./dailyRecords.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import classNames from "classnames";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal components
import { Link } from "react-router-dom";
import Vector from "../../assets/images/Vector.png";
import { useParams } from 'react-router-dom';
import axiosInstance from "../../axios";
import { useAuth } from '../../store/authContext';
const EmployeesRecord = () => {
  const { auth ,logout} = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showExportBtn, setShowExportBtn] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false); // State for showing export modal
  const { employeeId } = useParams();

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedSelectedRows = {};
    if (!selectAll) {
      for (let i = 0; i < data.length; i++) {
        updatedSelectedRows[i] = true;
      }
    }
    setSelectedRows(updatedSelectedRows);
    updateExportBtnState(updatedSelectedRows);
  };

  const handleRowSelect = (index) => {
    const updatedSelectedRows = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(updatedSelectedRows);
    updateExportBtnState(updatedSelectedRows);
  };

  const updateExportBtnState = (rows) => {
    const anySelected = Object.values(rows).some((isSelected) => isSelected);
    setShowExportBtn(anySelected);
  };

  const handleExport = () => {
    setShowExportModal(true); // Show export modal on export click
  };

  const handleProfileClick = (index) => {
    alert(`Opening profile for user at index: ${index}`);
    // You can replace this with the actual logic to open the user's profile
  };

  const data = [
    { day: "Wed, 1/5", hours: "9:00 AM - 5:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { day: "Wed, 1/5", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
  ];
  const [empRecords,setEmpRecords] = useState([])

  useEffect(() =>{

    axiosInstance.get(`/get_attendance/${employeeId}`)
    .then((res) =>{
      console.log(res.data.AllAttendanceForAnEmployee)
      console.log('from emp records')
      setEmpRecords(res.data.AllAttendanceForAnEmployee)
    })
    .catch((err) =>{
    console.log(err)
    })
    

  },[])
  return (
    <>
  
      <div>
        <div className={classNames("container")}>
          <div className={classNames("row", "align-items-center")}>
            <div className={classNames("col")}>
              <h1 className={classNames(Style.attendTitle, "text-center")}>
                Attend Guards
              </h1>
              <p className={classNames(Style.attendSuptitle, "text-center")}>
              {empRecords[0]?.employee_id.name}’s Daily Records

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
                    <li style={{ padding: "5px 10px", cursor: "pointer" }}onClick={logout} >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={classNames(Style.tableContainer, "table-responsive")}>
          <table className={classNames(Style.table, "table-responsive", "table")}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>DAY</th>
                <th style={{ textAlign: "center" }}>HOURS</th>
                <th style={{ textAlign: "right" }}>FROM:TO</th>
              </tr>
            </thead>
            <tbody>
              {empRecords.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows[index] || false}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>
                  {(() => {
                    const date = new Date(row.createdAt);

                    // Get the day of the week (e.g., 'Wed')
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

                    // Get the month/day in "M/D" format (e.g., '9/10')
                    const monthDay = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });

                    // Return the formatted date (e.g., 'Wed, 9/10')
                    return `${dayOfWeek}, ${monthDay}`;
                  })()}
                </td>
                  <td style={{ textAlign: "center" }}>{row.duration}</td>
                  <td style={{ textAlign: "right" }}>
                  {(() => {
    // Convert check_in_time to a Date object
    const checkInDate = new Date(row.check_in_time);
    const checkOutDate = new Date(row.check_out_time);

    // Format check_in_time to "H:MM AM/PM" (e.g., '7:00 AM')
    const checkInFormatted = checkInDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // Format check_out_time to "H:MM AM/PM" (e.g., '5:00 PM')
    const checkOutFormatted = checkOutDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // Return the formatted string with both times
    return `${checkInFormatted} - ${checkOutFormatted}`;
  })()}
                    </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showExportBtn && (
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleExport}>
              Export Selected
            </button>
          </div>
        )}

        {/* Export Modal */}
        <Modal show={showExportModal} onHide={() => setShowExportModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Export Selected Rows</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to export the selected rows?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleExport}>
              Export
            </Button>
          </Modal.Footer>
        </Modal>

        <Navbar activeIcon="clock" />
      </div>
    </>
  );
};

export default EmployeesRecord;
