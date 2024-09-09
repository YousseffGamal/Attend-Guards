import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./addAdmin.module.css";
import profileImg from "../../assets/images/Group 1653.png";
import classNames from "classnames";
import Navbar from "../../component/navbar/navbar";
import { Link } from "react-router-dom";

const addAdmin = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
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
            <form>
              <div className={classNames("form-group")}>
                <input
                  type="text"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Name"
                />
             
                <input
                  type="email"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Email"
                />
                  

                <input
                  type="password"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Password"
                />
              <input
                  type="text"
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                  placeholder="Company Name"
                />
                 <input
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
                  className={classNames(
                    "form-control",
                    Style.customInput,
                    "mb-3"
                  )}
                >
                  <option value="">Plane </option>
                  <option value="Plan1">Plan 1 </option>
                  <option value="Plan2">Plan 2 </option>
                  <option value="Plan3">Plan 3 </option>

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
