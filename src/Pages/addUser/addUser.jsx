import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./addUser.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import classNames from "classnames";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import axiosInstance from '../../axios'; // Import your axios instance

const AddUser = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, username, email, password, role } = formData;
    
    // Retrieve companyId from localStorage
    let companyId = localStorage.getItem('companyId');
  
    // Ensure companyId is a plain string without extra quotes
    companyId = companyId ? companyId.replace(/^"|"$/g, '') : '';
  
    console.log('Company ID:', companyId); 
  
    try {
      const response = await axiosInstance.post('/addemployee', {
        name,
        username,
        email,
        password,
        role,
        companyId 
      });
      console.log('Employee added:', response.data);
    } catch (error) {
      console.error('Error adding employee:', error.response?.data || error);
    }
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
              Add Employee
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

        {/* Form Section */}
        <div className={classNames("row justify-content-center mt-5")}>
          <div className={classNames("col-md-auto")}>
            <form onSubmit={handleSubmit}>
              <div className={classNames("form-group")}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Username"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Password"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Confirm Password"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                >
                  <option value="">Select Location</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
                <button
                  type="submit"
                  className={classNames(
                    "btn",
                    "btn-primary",
                    Style.customButton,
                    "mt-3"
                  )}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Navbar activeIcon="plus" />
    </>
  );
};

export default AddUser;
