import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Style from "./users.module.css";
import Vector from "../../assets/images/Vector.png";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUser, FaEdit, FaSave } from "react-icons/fa"; // Added FaEdit and FaSave icons
import { Modal, Button, Form } from "react-bootstrap"; // Import Form
import SaveIcon from '@mui/icons-material/Save'; // Using MUI Save icon

const Users = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showExportBtn, setShowExportBtn] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);

  // Fetch companyId from localStorage or other source
  const companyId = localStorage.getItem('companyId'); // Adjust as needed

  useEffect(() => {
    // Fetch employee data from the API using axios
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employees/company/${companyId}`);
        setEmployees(response.data.employees); // Update state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false); // Set loading to false even on error
      }
    };

    if (companyId) {
      fetchEmployees();
    } else {
      setLoading(false); // Set loading to false if companyId is not available
    }
  }, [companyId]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/deleteemployee/${id}`);
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedSelectedRows = {};
    if (!selectAll) {
      employees.forEach((_, index) => {
        updatedSelectedRows[index] = true;
      });
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
    setShowExportModal(true); // Show export modal
  };

  const handleConfirmExport = () => {
    console.log("Exporting selected rows:", selectedRows);
    setShowExportModal(false); // Close the modal after export
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true); // Show edit modal
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedEmployee((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { _id, username, phone, email, companyId, locationId } = selectedEmployee;
      const updatedEmployeeData = { username, phone, email, companyId, locationId };

      await axios.patch(`http://localhost:3000/updateemployee/${_id}`, updatedEmployeeData);

      // Update the employee in the local state
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === _id ? { ...employee, ...updatedEmployeeData } : employee
        )
      );
      setShowEditModal(false);
      setShowSaveConfirmationModal(true); // Show save confirmation modal
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Email or phone already exists:", error.response.data.message);
      } else {
        console.error("Error updating employee:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (employees.length === 0) return <div>No employees found</div>;

  return (
    <>
      <div>
        <div className={classNames("container")}>
          <div className={classNames("row", "align-items-center")}>
            <div className={classNames("col")}>
              <h1 className={classNames(Style.attendTitle, "text-center")}>Attend Guards</h1>
              <p className={classNames(Style.attendSuptitle, "text-center")}>Employees</p>
            </div>
            <div
              className={classNames("col-auto")}
              onMouseEnter={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
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
                  <ul style={{ listStyleType: "none", padding: "10px", margin: "0" }}>
                    <li style={{ padding: "5px 10px", cursor: "pointer" }}>
                      <Link to="/ProfilePage">Profile</Link>
                    </li>
                    <li style={{ padding: "5px 10px", cursor: "pointer" }}>Logout</li>
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
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
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
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee._id)}>
                      Delete
                    </button>
                    <FaEdit onClick={() => handleEdit(employee)} style={{ cursor: "pointer", marginLeft: "10px" }} />
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
            <Modal.Title>Export Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to export the selected rows?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirmExport}>
              Export
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  value={selectedEmployee?.username || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  value={selectedEmployee?.phone || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  value={selectedEmployee?.email || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company ID</Form.Label>
                <Form.Control
                  type="text"
                  id="companyId"
                  value={selectedEmployee?.companyId || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location ID</Form.Label>
                <Form.Control
                  type="text"
                  id="locationId"
                  value={selectedEmployee?.locationId || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              <FaSave style={{ marginRight: "5px" }} /> Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Save Confirmation Modal */}
        <Modal show={showSaveConfirmationModal} onHide={() => setShowSaveConfirmationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Save Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Employee details updated successfully.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSaveConfirmationModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Users;
