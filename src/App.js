import React from "react"
import { useSelector } from "react-redux"
import Login from './components/Login/';
import { Routes, Route, Navigate } from "react-router-dom"
import Main from "./components/Main";
import Device from "./components/Device";
import Users from "./components/Users";
// import ChartUsers from "./components/ChartUsers";
import Condition from "./components/Condition";
import Statistics from "./components/Statistics";
// import DateTime from "./components/DateTime";

function App() {

  const user = useSelector((state) => state.user);

  return (
    // <DateTime/>
    <Routes>
        {sessionStorage.getItem("x-auth-token") && (
          <Route path="/" element={<Main/>}>
            <Route index element={<Device/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="condition" element={<Condition/>}/>
            <Route path="statistics" element={<Statistics/>}/>
          </Route>
        )}
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<Navigate to={user ? "/" : "login"} />} />
    </Routes>
  );
}

export default App;
