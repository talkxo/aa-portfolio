"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // If logged in, fetch data
    if (loggedIn && !data) {
      fetch('/api/portfolio')
        .then(res => res.json())
        .then(json => setData(json));
    }
  }, [loggedIn, data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aradhya2025") { // Hardcoded simple password
      setLoggedIn(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert("Changes saved successfully!");
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      alert("Error saving: " + String(err));
    } finally {
      setSaving(false);
    }
  };

  const updateProfileData = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      profileData: {
        ...prev.profileData,
        [key]: value
      }
    }));
  };

  const updateCurrentLook = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      profileData: {
        ...prev.profileData,
        currentLook: {
          ...prev.profileData.currentLook,
          [key]: value
        }
      }
    }));
  };

  const updateIntroVideo = (value: string) => setData((prev:any) => ({...prev, introVideo: value}));
  
  const updateArrayItem = (arrayName: string, index: number, key: string, value: string) => {
    setData((prev: any) => {
      const newArr = [...prev[arrayName]];
      newArr[index] = { ...newArr[index], [key]: value };
      return { ...prev, [arrayName]: newArr };
    });
  };

  if (!loggedIn) {
    return (
      <main className="wrap" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{ background: "#fff", padding: 40, borderRadius: 24, boxShadow: "var(--shadow-lift)", width: "100%", maxWidth: 400 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 20 }}>Studio Login</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: ".85rem", fontWeight: 700, color: "var(--ink-2)" }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #ccc", outline: "none", fontSize: "1rem" }}
            />
            <button type="submit" className="btn btn-rose" style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
              Enter
            </button>
          </div>
        </form>
      </main>
    );
  }

  if (!data) return <main className="wrap section">Loading data...</main>;

  return (
    <main className="wrap section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,.1)", paddingBottom: 24, marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem" }}>Content Studio</h1>
        <button className="btn btn-rose" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 600 }}>
        
        {/* Profile Settings */}
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Profile Basics</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--ink-2)" }}>Hero Tagline</label>
              <input 
                type="text" 
                value={data.profileData.tagline} 
                onChange={e => updateProfileData('tagline', e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", width: "100%" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--ink-2)" }}>Short Bio</label>
              <textarea 
                value={data.profileData.bio} 
                onChange={e => updateProfileData('bio', e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", width: "100%", minHeight: 100 }}
              />
            </div>
          </div>
        </div>

        {/* Current Look Settings */}
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Current Look</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--ink-2)" }}>Image URL</label>
              <input 
                type="text" 
                value={data.profileData.currentLook.imageUrl} 
                onChange={e => updateCurrentLook('imageUrl', e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", width: "100%" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--ink-2)" }}>Date Label</label>
              <input 
                type="text" 
                value={data.profileData.currentLook.date} 
                onChange={e => updateCurrentLook('date', e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", width: "100%" }}
              />
            </div>
          </div>
        </div>
        
        {/* Intro Video */}
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Industrial / Featured Video</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--ink-2)" }}>YouTube Embed URL</label>
            <input 
              type="text" 
              value={data.introVideo} 
              onChange={e => updateIntroVideo(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 6, border: "1px solid #ddd", width: "100%" }}
            />
          </div>
        </div>

        {/* TV And Films */}
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Portfolio (Films & Series)</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {data.tvAndFilms.map((item: any, idx: number) => (
              <div key={idx} style={{ padding: 16, background: "rgba(0,0,0,.03)", border: "1px solid rgba(0,0,0,.05)", borderRadius: 8, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Title</label>
                    <input type="text" value={item.title} onChange={e => updateArrayItem('tvAndFilms', idx, 'title', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Platform</label>
                    <input type="text" value={item.platform} onChange={e => updateArrayItem('tvAndFilms', idx, 'platform', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Type</label>
                    <input type="text" value={item.type} onChange={e => updateArrayItem('tvAndFilms', idx, 'type', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Trailer URL</label>
                    <input type="text" value={item.videoUrl} onChange={e => updateArrayItem('tvAndFilms', idx, 'videoUrl', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                  {item.poster !== undefined && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Poster URL</label>
                      <input type="text" value={item.poster || ""} onChange={e => updateArrayItem('tvAndFilms', idx, 'poster', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercials */}
        <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20 }}>Commercials</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {data.commercials.map((item: any, idx: number) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                     <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Brand ({idx+1})</label>
                     <input type="text" value={item.brand} onChange={e => updateArrayItem('commercials', idx, 'brand', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                  <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 6 }}>
                     <label style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--ink-2)" }}>Video URL</label>
                     <input type="text" value={item.videoUrl} onChange={e => updateArrayItem('commercials', idx, 'videoUrl', e.target.value)} style={{ padding: "8px", borderRadius: 4, border: "1px solid #ddd", width: "100%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
