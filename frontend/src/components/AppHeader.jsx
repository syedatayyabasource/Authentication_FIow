import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../services/api";

export default function AppHeader() {
  const navigate = useNavigate();
  function logout() {
    removeToken();
    navigate("/login", { replace: true });
  }
  return (
    <header className="dashboard-nav">
      <NavLink to="/dashboard" className="logo"><span className="logo-box">N</span><span>Northstar</span></NavLink>
      <nav className="app-nav">
        <NavLink to="/dashboard">Overview</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/security">Security</NavLink>
      </nav>
      <button className="logout-button" onClick={logout}>Log out</button>
    </header>
  );
}
