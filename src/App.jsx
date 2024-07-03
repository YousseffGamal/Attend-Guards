import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./Pages/Login/Login"
import EmployeesRecord from "./Pages/Employees Record/Employees Record"
import Navbar from "./component/navbar/navbar"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmployeesRecord/>
    </>
  )
}

export default App
