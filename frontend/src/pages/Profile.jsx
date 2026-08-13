import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { request } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    request("/auth/me").then(d => setUser(d.user)).catch(e => setError(e.message));
  }, []);
  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="dashboard-main">
        <span className="kicker">ACCOUNT PROFILE</span>
        <h1 className="page-title">Your profile.</h1>
        <p className="page-lead">Your account details are loaded from the protected backend.</p>
        {error && <div className="alert">{error}</div>}
        {user && <section className="profile-card">
          <div className="avatar large">{user.name.charAt(0).toUpperCase()}</div>
          <div><span className="profile-label">FULL NAME</span><h2>{user.name}</h2><span className="profile-label">EMAIL ADDRESS</span><p>{user.email}</p></div>
        </section>}
      </main>
    </div>
  );
}
