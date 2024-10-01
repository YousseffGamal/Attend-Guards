import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./addUser.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import classNames from "classnames";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import axiosInstance from '../../axios'; // Import your axios instance
import { useAuth } from '../../store/authContext';

const AddUser = () => {
  const { auth ,logout} = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [CompanyLocations, setCompanyLocations] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyId: auth.companyId,
    locationId:'',

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
    try {
      const response = await axiosInstance.post('/addemployee', formData);
      setFormData({
        title:'',
        name: '',
        email: '',
        password: '',
        phone: '',
        companyId:auth.companyId,
        locationId:'',
      })
      alert('Employee Add successfully')

    } catch (error) {
      alert(`Faild to add Employee ${error.response?.data.message || error}`)
      console.error('Error adding employee:', error.response?.data.message || error);
    }
  };

 

  useEffect(() => {


    axiosInstance.get(`/getLocationsByCompany/${auth.companyId}`)
    .then((res) =>{
      console.log(res.data.Locations)
    setCompanyLocations(res.data.Locations)
    })
    .catch((err) =>{
    console.log(err)
    })
    
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
                  <li style={{ padding: "5px 10px", cursor: "pointer" }} onClick={logout}>
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
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="title"
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
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Phone"
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
                <select
                id="locationId"
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                >
                  <option value="">Select Location</option>
                    {CompanyLocations?.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.locationName}
                  </option>
                ))}
                
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
      <div className={classNames(Style.footer)}>
      <Navbar activeIcon="plus" />
      </div>
      </div>
    </>
  );
};

export default AddUser;
