import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Style from "./Login.module.css";
import classNames from "classnames";
import { useAuth } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // State for form data, error, and success messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // For error message
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
      const response = await login(formData); // Assuming login() returns a promise
      if (response.success) {
       
      navigate('/users') // Redirect after success
      } else {
        setErrorMessage(response.message); // Display error message
        setSuccessMessage(''); // Clear success message
      }
  };

  // Add class to body for styling and cleanup
  useEffect(() => {
    document.body.className = Style.loginBody;
    return () => {
      document.body.className = '';
    };
  }, []);
  
  return (
    <div className={classNames(Style.loginBody)}>
      <div className={classNames('d-flex', 'align-items-center', 'justify-content-center', 'vh-100')}>
        <form className={classNames(Style.loginForm, 'p-5')} onSubmit={handleSubmit}>
          <h2 className={classNames(Style.loginTitle, 'mb-4', 'text-center')}>Login to Your Account</h2>
          <p className={classNames(Style.Loginsuptitle)}>Take control of your work schedule with Attend Guards!</p>

        

          <div className={classNames(Style.inputGroup, "input-group", "mb-3")}>
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              className={classNames(Style.in, "form-control")}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classNames(Style.inputGroup, "input-group", "mb-3")} style={{ marginTop: "38px" }}>
            <span className="input-group-text"><FaLock /></span>
            <input
              className={classNames(Style.in, "form-control")}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
         

{errorMessage && (
  <div className={classNames(Style.in, "alert", "alert-danger", "w-100")}>
    {errorMessage}
  </div>
)}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button className={classNames(Style.loginBtn, "btn", "btn-primary", "w-100")} type="submit">
              Login
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;