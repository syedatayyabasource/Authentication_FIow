import React from "react";
import { Link } from "react-router-dom";

export default function AuthShell({ children, mode }) {
  const signup = mode === "signup";

  return (
    <div className="page">
      <header className="nav">
        <Link to="/login" className="logo">
          <span className="logo-box">N</span>
          <span>Northstar</span>
        </Link>
        <span className="nav-note">Secure account portal</span>
      </header>

      <main className="auth-main">
        <section className="hero-copy">
          <span className="kicker">ACCOUNT ACCESS</span>
          <h1>{signup ? "Create your account." : "Welcome back."}</h1>
          <p>
            {signup
              ? "Set up your account in a few simple steps and access your private workspace."
              : "Sign in securely to continue to your private workspace."}
          </p>

          <div className="feature-list">
            <div><span>01</span><p>Secure password handling</p></div>
            <div><span>02</span><p>Protected authenticated pages</p></div>
            <div><span>03</span><p>Simple, reliable session control</p></div>
          </div>
        </section>

        <section className="auth-card">{children}</section>
      </main>

      <footer>Northstar Account Portal</footer>
    </div>
  );
}
