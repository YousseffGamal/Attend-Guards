import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    companyId: localStorage.getItem("companyId") || null,

  });
  // const companyId = localStorage.getItem("companyId");
  const login = async (cred) => {
    try {
      const { data } = await axiosInstance.post("/signin", cred);
      console.log(data)
     
      setAuth({
        token: data.user.token,
        user: data.user.userExist,
        companyId: data.user.userExist.companyId
      });
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user.userExist));
      localStorage.setItem("companyId", data.user.userExist.companyId); 
      return { success: true, data };
    } catch (error) {
      console.log("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };


  const logout = () => {
    axiosInstance.post('logout')
    .then((res) =>{
      setAuth({ token: "", user: null,companyId:'' }); // Reset permissions state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("companyId")
    })
    .catch((err) =>{
      setAuth({ token: "", user: null,companyId:'' }); // Reset permissions state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("companyId")
    })
  ; 
    
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) { // Token expired or unauthorized
         
          logout(); // Logout the user and redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [logout]);


  return (
    <AuthContext.Provider value={{ auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);