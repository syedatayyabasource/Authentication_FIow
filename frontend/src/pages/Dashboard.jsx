import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { removeToken, request } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    request("/auth/me").then(d => setUser(d.user)).catch(() => {
      removeToken(); navigate("/login", { replace: true });
    });
  }, [navigate]);
  if (!user) return <div className="loading-screen">Checking your secure session...</div>;
  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div><span className="kicker">PROTECTED WORKSPACE</span><h1>Welcome, {user.name.split(" ")[0]}.</h1><p>Your private workspace is active and protected by backend authentication.</p></div>
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
        </div>
        <div className="dashboard-grid">
          <article><span>ACCOUNT NAME</span><strong>{user.name}</strong></article>
          <article><span>EMAIL</span><strong>{user.email}</strong></article>
          <article><span>SESSION</span><strong>Authenticated</strong></article>
        </div>
        <section className="secure-banner"><div className="secure-icon">✓</div><div><strong>Protected session active</strong><p>The backend verified your JWT before returning this account data.</p></div><button onClick={() => {removeToken(); navigate("/login",{replace:true});}}>Sign out</button></section>
      </main>
    </div>
  );
}
