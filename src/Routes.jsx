import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddEmployee from "./Pages/Add Employee/Add Employee";
import DailyRecords from "./Pages/dailyRecords/dailyRecords";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Location/Location";
import Users from "./Pages/users/users";
import ProfilePage from "./Pages/profile/profile";
import Adduser from "./Pages/addUser/addUser";
import ViewLocation from "./Pages/ViewLocation/ViewLocation";

import ProtectedRoute from './utiliteis/protectedRoute';
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
         
          <Route element={<ProtectedRoute redirectTo="/" />}>

          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/setlocation" element={<SetLocation />} />

          <Route path="/ViewLocation" element={<ViewLocation />} />
       
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dailyrecords/:employeeId" element={<DailyRecords />} />


          </Route>

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
