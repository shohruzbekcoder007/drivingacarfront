import React from "react"
import { useSelector } from "react-redux"
import Login from './components/Login/';
import { Routes, Route, Navigate } from "react-router-dom"
import Main from "./components/Main";
import Device from "./components/Device";
import Users from "./components/Users";

function App() {

  const user = useSelector((state) => state.user);

  return (
    <Routes>
        {sessionStorage.getItem("x-auth-token") && (
          <Route path="/" element={<Main/>}>
            <Route index element={<Device/>}/>
            <Route path="users" element={<Users/>}/>
          </Route>
        )}
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<Navigate to={user ? "/" : "login"} />} />
    </Routes>
  );
}

export default App;
