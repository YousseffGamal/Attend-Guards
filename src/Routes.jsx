import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddEmployee from "./Pages/Add Employee/Add Employee";
import EmployeesRecords from "./Pages/employeesRecord/employeesRecord"; 
import DailyRecords from "./Pages/dailyRecords/dailyRecords";
import Login from "./Pages/Login/Login";
import SetLocation from "./Pages/Location/Location";
import Users from "./Pages/users/users";
import ProfilePage from "./Pages/profile/profile";
import Adduser from "./Pages/addUser/addUser";
import AddAdmin from "./Pages/addAdmin/addAdmin";
import ProtectedRoute from './utiliteis/protectedRoute';
// 
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/AddEmployee" element={<AddEmployee />} /> */}

          {/* <Route element={<ProtectedRoute redirectTo="/" />}> */}


          <Route path="/dailyrecords" element={<DailyRecords />} />
          <Route path="/employeesrecords" element={<EmployeesRecords />} />
          <Route path="/setlocation" element={<SetLocation />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/addadmin" element={<AddAdmin />} />


          {/* </Route> */}

        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
