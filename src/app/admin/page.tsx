"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <div className="container section">
        <h1 className="section-title text-gradient">CMS Dashboard</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>
          Welcome back! This dashboard will connect to your headless CMS (Sanity/Supabase) to allow instant publishing of new projects, videos, and photos.
        </p>
        
        <div className="grid-2">
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ marginBottom: "16px" }}>Manage Projects</h3>
            <button className="btn-outline" style={{ display: "block", width: "100%", marginBottom: "12px" }}>+ Add Commercial</button>
            <button className="btn-outline" style={{ display: "block", width: "100%" }}>+ Add TV / Series</button>
          </div>
          
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ marginBottom: "16px" }}>Update Look</h3>
            <button className="btn-primary" style={{ display: "block", width: "100%", marginBottom: "12px" }}>Upload New Headshot</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ padding: "40px", width: "100%", maxWidth: "400px", textAlign: "center" }}
      >
        <h2 style={{ marginBottom: "24px" }} className="text-gradient">Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter Passcode..." 
          style={{ 
            width: "100%", 
            padding: "16px", 
            borderRadius: "var(--border-radius-sm)", 
            border: "1px solid rgba(255,255,255,0.1)", 
            background: "rgba(0,0,0,0.3)", 
            color: "white", 
            marginBottom: "24px"
          }} 
        />
        <button 
          className="btn-primary" 
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => setLoggedIn(true)}
        >
          Secure Login
        </button>
      </motion.div>
    </div>
  );
}
