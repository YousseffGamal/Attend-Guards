import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./employeesRecord.module.css";
import Vector from "../../assets/images/Vector.png";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUser } from "react-icons/fa";

const EmployeesRecord = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showExportBtn, setShowExportBtn] = useState(false);

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
    alert("Exporting selected rows...");
  };

  const data = [
    { name: "John Doe", hours: "9:00 AM - 5:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },
    { name: "Jane Smith", hours: "10:00 AM - 6:00 PM", period: "1/5 : 21/5" },


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
                Employees record
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
          <table
            className={classNames(Style.table, "table-responsive", "table")}
          >
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>NAME</th>
                <th>HOURS</th>
                <th>FROM:TO</th>
                <th></th>
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
                  <td>{row.name}</td>
                  <td>{row.hours}</td>
                  <td>{row.period}</td>
                  
                  <td>
                    <Link to="/DailyRecords">
                      <img src={Vector} alt="Navigate" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showExportBtn && (
          <div className="text-center ">
            <button className="btn btn-primary" onClick={handleExport}>
              Export Selected
            </button>
          </div>
        )}

        <Navbar activeIcon="clock" />
      </div>
    </>
  );
};

export default EmployeesRecord;
