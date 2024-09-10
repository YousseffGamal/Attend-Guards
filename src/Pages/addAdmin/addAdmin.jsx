import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./addAdmin.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import classNames from "classnames";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios";

const addAdmin = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [companies , setCompanies] = useState([])
  const [Data , setData] = useState({
    name : '',
    phone : '',
    email : '',
    password : '',
    companyId: '',
  })


  const handleChange = (e) =>{
    const {name , value} = e.target;
    setData({
      ...Data,
      [name] : value,
    })
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Data)
    axiosInstance.post('/signup',Data)
    .then((res) =>{
      alert('New Admin added successfully')
      setData({
        name : '',
        phone : '',
        email : '',
        password : '',
        companyId : '',
      })
      
    })
    .catch((err) =>{
      alert(`Faild to add Admin : ${err.response.data.message}`)      

    })
  };














 

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  
  useEffect(() =>{
    axiosInstance.get('/getallcompanies')
    .then((res) =>{
      console.log(res.data)
      console.log('from register Admin')
      setCompanies(res.data)
    })
    .catch((err) =>{
    console.log(err)
    })
    
  },[])


  return (
    <>
      <div className={classNames("container")}>
        <div className={classNames("row", "align-items-center")}>
          <div className={classNames("col")}>
            <h1 className={classNames(Style.attendTitle, "text-center")}>
              Attend Guards
            </h1>
            <p className={classNames(Style.attendSuptitle, "text-center")}>
            Add Admin
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
                    name='name'
                    id="name"
                    value={Data.name}
                    onChange={handleChange}
                  type="text"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Name"
                />
             
                <input
                    name='email'
                    id="email"
                    value={Data.email}
                    onChange={handleChange}
                  type="email"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Email"
                />
                  

                <input
                    name='password'
                    id="password"
                    value={Data.password}
                    onChange={handleChange}
                  type="password"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Password"
                />
                 <input
                  name='phone'
                  id="phone"
                  value={Data.phone}
                  onChange={handleChange}
                  type="text"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Phone "
                />
                {/* Option Input */}
                <select
                 name='companyId'
                 id="companyId"
                 value={Data.companyId}
                 onChange={handleChange}
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                >
                  <option value="">Company </option>
                  {companies?.map((comp) => (
                  <option key={comp._id} value={comp._id}>
                    {comp.companyName}
                  </option>
                ))}
                                
         

                </select>
                {/* Select Input */}
          
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

export default addAdmin;
