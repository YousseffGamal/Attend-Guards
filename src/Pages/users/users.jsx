import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import axios (this is correct if you don't have an axiosInstance)
import Style from "./users.module.css";
import Vector from "../../assets/images/Vector.png";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUser } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal components

const Users = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showExportBtn, setShowExportBtn] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false); // State for showing export modal
  const [employees, setEmployees] = useState([]); // State for storing employee data
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch employee data from the API using axios
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getallemployees"); // Replace with your actual API endpoint
        setEmployees(response.data.AllEmployees); // Update state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchEmployees();
  }, []);

  // Delete function using axios
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/deleteemployee/${id}`); // Use axios.delete
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

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
      for (let i = 0; i < employees.length; i++) {
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

  // Show modal when clicking Export
  const handleExport = () => {
    setShowExportModal(true); // Show export modal
  };

  // Confirm export inside the modal
  const handleConfirmExport = () => {
    // Handle your export logic here
    console.log("Exporting selected rows:", selectedRows);

    // Close the modal after export
    setShowExportModal(false);
  };

  const handleProfileClick = (index) => {
    alert(`Opening profile for user at index: ${index}`);
    // You can replace this with the actual logic to open the user's profile
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
                Employees
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
                      <Link to="/ProfilePage">Profile</Link>
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
                <th>NAME</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>ROLES</th>
                <th>RECORDS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows[index] || false}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>{employee.name || "N/A"}</td>
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>
                    <Link to={`/dailyrecords/${employee._id}`}>
                      <img src={Vector} alt="Navigate" />
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee._id)}     
                    >
                      Delete
                    </button>
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
            <Button variant="primary" onClick={handleConfirmExport}> {/* Use handleConfirmExport here */}
              Export
            </Button>
          </Modal.Footer>
        </Modal>

        <Navbar activeIcon="users" />
      </div>
    </>
  );
};

export default Users;
