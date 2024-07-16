// src/components/Login.js
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Style from "./Login.module.css";
import classNames from "classnames";

const Login = () => {

  useEffect(()=>{
    document.body.className=Style.loginBody
    return()=>{
      document.body.className=""
    }
  },[])
  return (
    <div className={classNames(Style.loginBody)}>
    <div className={classNames('d-flex','align-items-center','justify-content-center','vh-100')}>
      <form className={classNames(Style.loginForm,'p-5')}>
        <h2 className={classNames(Style.loginTitle,'mb-4','text-center')}>Login to Your Accounts</h2>
        <p className={classNames(Style.Loginsuptitle)}>Take control of your work schedule with Attend Guards!</p>
        <div className={classNames(Style.inputGroup,"input-group","mb-3")}>
          <span className={classNames("input-group-text")} ><FaEnvelope /></span>
          <input className={classNames(Style.in,"form-control")} type="email"id="email" name="email" placeholder="Email" />
        </div>
        <div className={classNames(Style.inputGroup,"input-group","mb-3")} style={{marginTop:"38px"}}>  
          <span className={classNames("input-group-text")}><FaLock /></span>
          <input className={classNames(Style.in,"form-control")} type="password" id="password" name="password" placeholder="Password" />
        </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <button className={classNames(Style.loginBtn,"btn","btn-primary","w-100")}  type="submit" >Login</button>
      </div>
      </form>
    </div>
    </div>

  );
}

export default Login;
