import React from "react";
import AppHeader from "../components/AppHeader";
import { request } from "../services/api";

export default function Security() {
  async function backupAccount() {
    const data = await request("/auth/me");
    const blob = new Blob([JSON.stringify({ account: data.user, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "northstar-account-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="dashboard-page">
      <AppHeader />
      <main className="dashboard-main">
        <span className="kicker">SECURITY</span>
        <h1 className="page-title">Account security.</h1>
        <p className="page-lead">A clear overview of the authentication controls used by this account.</p>
        <div className="security-list">
          <div><span className="status-dot">✓</span><div><strong>Password protection</strong><p>Passwords are hashed on the server before storage.</p></div></div>
          <div><span className="status-dot">✓</span><div><strong>JWT session</strong><p>Authenticated requests use a signed access token.</p></div></div>
          <div><span className="status-dot">✓</span><div><strong>Protected routes</strong><p>Private pages require a valid authenticated session.</p></div></div>
          <div><span className="status-dot">✓</span><div><strong>Logout</strong><p>Logging out clears the browser session token.</p></div></div>
        </div>
        <div className="backup-card">
          <div><strong>Account backup</strong><p>Download your basic account profile for your records. Passwords and authentication tokens are never included.</p></div>
          <button onClick={backupAccount}>Download backup</button>
        </div>
      </main>
    </div>
  );
}
