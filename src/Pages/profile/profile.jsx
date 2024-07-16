import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import profileImg from "../../assets/images/Group 1653.png"; // Example profile image

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [role, setRole] = useState("User");

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = () => {
    // Implement save changes logic here
    setShowEditModal(false);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="profile-card">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <div className="profile-content">
              <h2 className="profile-name">{userName}</h2>
              <p className="profile-email">{email}</p>
              <p className="profile-role">{role}</p>
              <Button variant="outline-primary" onClick={handleEditProfile}>
                <FaUserEdit className="mr-2" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>User</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
