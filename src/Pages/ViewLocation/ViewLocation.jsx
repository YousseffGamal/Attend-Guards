import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import axios (this is correct if you don't have an axiosInstance)
import Style from "./ViewLocation.module.css";
import Vector from "../../assets/images/Vector.png";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUser } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal components
import axiosInstance from "../../axios";
import { useAuth } from '../../store/authContext';

const Users = () => {
    const { auth } = useAuth();
    const [CompanyLocations, setCompanyLocations] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [plans, setPlans] = useState([]); // State for storing employee data
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState('');
  // Delete function using axios
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Location?");
    if (confirmed) {
    
        axiosInstance.delete(`/deletelocation/${id}`)
        .then((res) =>{
        setCompanyLocations((prev) => prev.filter((plan) => plan._id !== id));
          alert("Location deleted successfully.");
        })
        .catch((err) =>{
        console.error("Error deleting location:", err);
        alert("Failed to delete plan.");
        })
      
    }
  };

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setEditItem({
      ...editItem,
      [name] : value,
    })
  }

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };


  const handleEditClick = (i) => {
    setEditItem(i)
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = () => {

    axiosInstance.put(`/updateLocation/${editItem._id}`,editItem)
    .then((res) =>{
      alert("location updated successfully.");
      getLocations()
      setShowEditModal(false);
   
    })
    .catch((err) =>{
    console.error("Error uppdating Location:", error);
    alert("Failed to update User.");
    })
  
  };






  const getLocations = () =>{
    axiosInstance.get(`/getLocationsByCompany/${auth.companyId}`)
    .then((res) =>{
      console.log(res.data.Locations)
    setCompanyLocations(res.data.Locations)
    })
    .catch((err) =>{
    console.log(err)
    })
  }
  
  useEffect(() => {

    getLocations()
  
    
  }, []);



  return (
    <>



      <div className={classNames(Style.container)}>


        <div className={classNames("container")}>
          <div className={classNames("row", "align-items-center")}>
            <div className={classNames("col")}>
              <h1 className={classNames(Style.attendTitle, "text-center")}>
                Attend Guards
              </h1>
              <p className={classNames(Style.attendSuptitle, "text-center")}>
                Locations
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
                    <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={logout}>
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
                ID
                </th>
                <th>Location Name</th>
                <th>Radius</th>
               
          
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {CompanyLocations?.map((loc, index) => (
                <tr key={loc._id}>
                  <td>
                   {index+1}
                  </td>
                  <td>{loc.locationName || "N/A"}</td>
                  <td>{loc.radius  }</td>
                
              
            
                
                                                     
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(loc)}     
                    >
                      update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(loc._id)}     
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        <div className={classNames(Style.footer)}>
        <Navbar activeIcon="ViewLocation" />
        </div>
      </div>
        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="locationName">Location Name</label>
            <input
              type="text"
              id="locationName"
              name='locationName'
              className="form-control"
              value={editItem.locationName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="radius">Radius</label>
            <input
              type="number"
              id="radius"
                  name='radius'
              className="form-control"
              value={editItem.radius}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
