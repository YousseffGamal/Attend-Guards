import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddEmployee from "./Pages/Add Employee/Add Employee";
import EmployeesRecords from "./Pages/Employees Record/employeesRecord"; 
import DailyRecords from "./Pages/Daily Records/dailyRecords";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Location/Location";
import Users from "./Pages/users/users";
import ProfilePage from "./Pages/profile/profile";
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/AddEmployee" element={<AddEmployee />} /> */}
          <Route path="/DailyRecords" element={<DailyRecords />} />
          <Route path="/EmployeesRecords" element={<EmployeesRecords />} />
          <Route path="/SetLocation" element={<SetLocation />} />
          <Route path="/users" element={<Users />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />



        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
