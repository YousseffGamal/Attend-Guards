import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Style from "./users.module.css";
import Vector from "../../assets/images/Vector.png";
import profileImg from "../../assets/images/Group 1653.png";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUser, FaEdit, FaSave,FaArrowLeft,FaArrowRight,FaAngleDoubleRight,FaAngleDoubleLeft } from "react-icons/fa"; // Added FaEdit and FaSave icons
import { Modal, Button, Form } from "react-bootstrap"; // Import Form
import SaveIcon from '@mui/icons-material/Save'; // Using MUI Save icon
import { useAuth } from '../../store/authContext';
import axiosInstance from "../../axios";
const Users = () => {
  const { auth,logout } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [CompanyLocations, setCompanyLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);

  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);

  const pagination = (i) =>{
       if(i > lastPage || i < 1){
        return
    }
    fetchEmployees(i)
  }
  const [lastPage ,setLastPage] =useState('')
  const [currentPage , setCurrentPage] = useState('');
  



  const fetchEmployees = async (i) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/employees/company/${auth.companyId}?page=${i}&limit=7`);
      console.log(response)
      setLastPage(response.data.totalPages) 
      setCurrentPage(response.data.currentPage)
      setEmployees(response.data.employees); // Update state with fetched data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false); // Set loading to false even on error
    }
  };
  useEffect(() => {
    // Fetch employee data from the API using axios
   

    if (auth.companyId) {
      fetchEmployees();
    } else {
      setLoading(false); // Set loading to false if companyId is not available
    }
  }, [auth.companyId]);



  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/deleteemployee/${id}/${auth.companyId}`);
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };



  const handleEdit = (employee) => {
    getLocations()
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
      await axiosInstance.patch(`http://localhost:3000/updateemployee/${selectedEmployee._id}`, selectedEmployee)
      .then((res) =>{
        fetchEmployees()
        setShowEditModal(false);
        setShowSaveConfirmationModal(true); 
      console.log(res.data)
      })
      .catch((err) =>{
      console.error(err.response.data.message);
      console.log(err)
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



  if (loading) {
    return <p>Loading...</p>;
  }
  if (employees.length === 0) return <div>No employees found</div>;

  return (
    <>
      <div className={classNames(Style.container)}>
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
                    <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={logout}>Logout</li>
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
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>LOCATION</th>
                <th>RECORDS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>
                  {index +1 }
                  </td>
                  <td>{employee.name || "N/A"}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone }</td>
                  <td>{employee.locationId.locationName }</td>
                  <td>
                    <Link to={`/dailyrecords/${employee._id}`}>
                      <img src={Vector} alt="Navigate" />
                    </Link>
                  </td>
                  <td>
                  <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(employee)}     
                    >
                      update
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee._id)}>
                      Delete
                    </button>
                  
                    {/* <FaEdit onClick={() => handleEdit(employee)} style={{ cursor: "pointer", marginLeft: "10px" }} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              <div style={{ 'display': 'flex','justify-content': 'center', 'align-items': 'center' }}>
        <FaArrowLeft onClick={()=> pagination(1)}  style={{ 'font-size': '18px', 'color':'#6c757d', 'cursor':'pointer',pointerEvents: currentPage == 1 ? 'none' : 'auto'}}/>
        <FaAngleDoubleLeft className="LeftArrow" onClick={()=> pagination(currentPage -1)} style={{ 'font-size': '18px', 'margin': '4px', 'color':'#6c757d', 'cursor':'pointer'}}/>
        <span style={{ 'font-size': '20px'}} >{currentPage}</span>
        <FaAngleDoubleRight  onClick={()=> pagination(currentPage +1)} style={{ 'font-size': '18px', 'margin': '4px', 'color':'#6c757d', 'cursor':'pointer'}} />
        <FaArrowRight onClick={()=> pagination(lastPage)} style={{'font-size': '18px', 'color':'#6c757d', 'cursor':'pointer',pointerEvents: lastPage == currentPage ? 'none' : 'auto' }}/>
        
              </div>
      
        


        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  value={selectedEmployee?.name || ""}
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
              <Form.Label>Location</Form.Label>
              <select
                 name='locationId'
                 id="locationId"
                value={selectedEmployee?.locationId._id}
                onChange={handleInputChange}
                className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                >
                  <option value="">Locations </option>
                  {CompanyLocations?.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.locationName}
                  </option>
                ))}
                 </select>
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
      <div className={classNames(Style.footer)}>
      <Navbar activeIcon="users" />

      </div>
  
    
    </>
  );
};

export default Users;
