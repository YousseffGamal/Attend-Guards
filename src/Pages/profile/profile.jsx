import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaEdit } from "react-icons/fa";
import Navbar from '../../component/navbar/navbar';
import classNames from "classnames";
import Style from "./profile.module.css";
import profileImgs from "../../assets/images/image.png"; // Example profile image
import { Modal, Button } from "react-bootstrap";
import { useAuth } from '../../store/authContext';
import axiosInstance from "../../axios";


const ProfilePage = () => {

  const { auth } = useAuth();   
  const [name, setName] = useState(auth.user.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const [profileImage, setProfileImage] = useState(profileImgs); // Initial profile image
  const [newProfileImage, setNewProfileImage] = useState(null); // State to hold newly uploaded image


  const [showEditModal, setShowEditModal] = useState(false);
  const validatePass = () =>{
    if(!password || !confirmPassword || password != confirmPassword ){
      alert('Ensure both passwords match in both fields')
      return
    } else {
      changePassword(password)
    }
   
  }
  const changePassword = async(newPassword) =>{
    try {
      await axiosInstance.patch(`changepassword/${auth.user._id}`,{newPassword}) 
      console.log(newPassword)
      alert('password changed successfully')
      setShowEditModal(false);
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = () => {
    // Logic for saving changes, like updating the profile image
    validatePass()
    
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setNewProfileImage(reader.result); // Store newly uploaded image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={classNames(Style.container)}>
    <div>
    <div className={classNames("d-flex", "justify-content-center", "align-items-center", "flex-column", "mt-5")}>
        <h1 className={classNames(Style.attendTitle, "text-center")}>Attend Guards</h1>
        <p className={classNames(Style.attendSuptitle, "text-center")}>Profile</p>
        <div className={classNames("d-flex", "align-items-center", "mt-3")}>
          <div style={{ position: "relative" }}>
            <img src={newProfileImage || profileImage} alt="Profile" style={{ width: "227px", height: "227px", borderRadius: "50%" }} />
          </div>
       
        </div>
    
        <div className={classNames("text-center", "mt-3")}>
          <p style={{ margin: "0" }} className={classNames(Style.userName)}>
            @{auth.user.email.split('@')[0]}
          </p>
          <p className={classNames(Style.role)}>Admin</p>
        </div>
        <div className={classNames("mt-3")}>
          <p className={classNames(Style.rem)} >
            <strong className={classNames(Style.mid)} style={{ marginRight: "70px", color: "#23303B", fontSize: "31px" }}>
              Name:
            </strong>
            <span className={classNames(Style.light)} style={{ color: "#23303B", fontSize: "31px" }}>
              {name}
            </span>
            <FaEdit size={24} style={{ marginLeft: "10px", cursor: "pointer", color: "#466EFA" }} onClick={handleEditClick} />
          </p>
          <p className={classNames(Style.rem)}> 
            <strong className={classNames(Style.mid)} style={{ marginRight: "70px", color: "#23303B", fontSize: "31px" }}>
              Email:
            </strong>
            <span className={classNames(Style.light)} style={{ color: "#23303B", fontSize: "31px" }}>
              {auth.user.email}
            </span>
          </p>
        </div>
      </div>
    
    </div>
      
      <div className={classNames(Style.footer)}>
      <Navbar />
      </div>
   

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="editName">Name</label>
            <input
              type="text"
              id="editName"
              className="form-control"
              value={name}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="editPassword">New Password</label>
            <input
              type="password"
              id="editPassword"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
      </div>
    </>
  );
};

export default ProfilePage;
