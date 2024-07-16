import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";
import Style from "./dailyRecords.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import classNames from "classnames";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal components
import { Link } from "react-router-dom";
import Vector from "../../assets/images/Vector.png";

const EmployeesRecord = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showExportBtn, setShowExportBtn] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false); // State for showing export modal

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
              Frank’s Daily Records
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
                      Profile
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
              {data.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows[index] || false}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>{row.day}</td>
                  <td style={{ textAlign: "center" }}>{row.hours}</td>
                  <td style={{ textAlign: "right" }}>{row.period}</td>
                
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
