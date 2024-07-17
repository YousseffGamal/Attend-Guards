import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserEdit, FaEdit } from "react-icons/fa";
import Navbar from '../../component/navbar/navbar';
import classNames from "classnames";
import Style from "./profile.module.css";
import profileImgs from "../../assets/images/image.png"; // Example profile image
import { Modal, Button } from "react-bootstrap";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState("Faisal Mohammed");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(profileImgs); // Initial profile image
  const [newProfileImage, setNewProfileImage] = useState(null); // State to hold newly uploaded image

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = () => {
    // Logic for saving changes, like updating the profile image
    if (newProfileImage) {
      setProfileImage(newProfileImage);
      setNewProfileImage(null); // Clear new image state
    }
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    setShowEditModal(false);
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
      <div className={classNames("d-flex", "justify-content-center", "align-items-center", "flex-column", "mt-5")}>
        <h1 className={classNames(Style.attendTitle, "text-center")}>Attend Guards</h1>
        <p className={classNames(Style.attendSuptitle, "text-center")}>Profile</p>
        <div className={classNames("d-flex", "align-items-center", "mt-3")}>
          <div style={{ position: "relative" }}>
            <img src={newProfileImage || profileImage} alt="Profile" style={{ width: "227px", height: "227px", borderRadius: "50%" }} />
            <label htmlFor="imageUpload" style={{ position: "absolute", bottom: "10px", right: "10px" }}>
              <FaUserEdit size={24} style={{ cursor: "pointer", color: "#466EFA" }} />
            </label>
          </div>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        {newProfileImage && (
          <div className="mt-2 text-center">
            <Button variant="primary" size="sm" onClick={handleSaveChanges} className="mr-2">
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setNewProfileImage(null)}>
              Cancel
            </Button>
          </div>
        )}
        <div className={classNames("text-center", "mt-3")}>
          <p style={{ margin: "0" }} className={classNames(Style.userName)}>
            @faisalmohammed
          </p>
          <p className={classNames(Style.role)}>Graphic Designer</p>
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
              faisalmohammed@gmail.com
            </span>
          </p>
        </div>
      </div>
      <Navbar />

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
              onChange={(e) => setName(e.target.value)}
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
    </>
  );
};

export default ProfilePage;
