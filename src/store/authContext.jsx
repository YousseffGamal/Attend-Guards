import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    companyId: JSON.parse(localStorage.getItem("companyId")) || null,
    
    
    
  });

  const login = async (cred) => {
    try {
      const { data } = await axiosInstance.post("/signin", cred);
      console.log(data);
      console.log('from login ');
     
      setAuth({
        token: data.token,
        user: data.user,
        companyId: data.user.companyId
      });

      // Save data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("companyId", JSON.stringify(data.user.companyId));
      return { success: true, data };
    } catch (error) {
      console.log("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setAuth({ token: "", user: null, permissions: [] }); // Reset permissions state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("companyId"); 
    
  };

  const hasPermissions = (permissionNames) =>{
    return permissionNames.some(permission => auth.permissions.includes(permission))
  }


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
    <AuthContext.Provider value={{ auth, login, logout,hasPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);