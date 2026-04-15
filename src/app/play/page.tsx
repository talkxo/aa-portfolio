"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";
import { profileData, tvAndFilms } from "@/data/portfolio";

// --- Configuration ---
const MAP_SIZE = { w: 2500, h: 2500 };
const START_POS = { x: 1250, y: 1250 };
const MOVEMENT_SPEED = 6;
const PROXIMITY_RADIUS = 150;

// --- Hardcoded Locations ---
const LOCATIONS = [
  {
    id: "school",
    title: "School",
    x: 600,
    y: 600,
    emoji: "🏫",
    color: "#E8305A",
    content: (
      <div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>School & Life</h3>
        <div style={{ lineHeight: 1.6, color: "var(--ink-2)", fontSize: ".9rem" }} dangerouslySetInnerHTML={{__html: profileData.bio}} />
      </div>
    )
  },
  {
    id: "bollyland",
    title: "Bollyland",
    x: 1900,
    y: 700,
    emoji: "🎬",
    color: "#800020",
    content: (
      <div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 16 }}>My Portfolio</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tvAndFilms.map((p: any) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
              <strong style={{fontSize: ".9rem"}}>{p.title}</strong>
              <span style={{color: "var(--rose)", fontSize: ".8rem"}}>{p.platform}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "tv",
    title: "TV Room",
    x: 1800,
    y: 1800,
    emoji: "📺",
    color: "#4A90E2",
    content: (
      <div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Favorite Shows</h3>
        <ul style={{ paddingLeft: 20, color: "var(--ink-2)", lineHeight: 1.8 }}>
          <li>Peppa Pig (A classic!)</li>
          <li>Bluey</li>
          <li>Dora the Explorer</li>
          <li>My Little Pony</li>
        </ul>
      </div>
    )
  },
  {
    id: "library",
    title: "Library",
    x: 400,
    y: 1600,
    emoji: "📚",
    color: "#8B5A2B",
    content: (
      <div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Favorite Books</h3>
        <ul style={{ paddingLeft: 20, color: "var(--ink-2)", lineHeight: 1.8 }}>
          <li>Matilda by Roald Dahl</li>
          <li>Alice in Wonderland</li>
          <li>The Very Hungry Caterpillar</li>
          <li>Geronimo Stilton Series</li>
        </ul>
      </div>
    )
  },
  {
    id: "artist_island",
    title: "Artist Island",
    x: 1250,
    y: 2100,
    emoji: "🎨",
    color: "#50C878",
    content: (
      <div>
        <h3 style={{ fontSize: "1.4rem", marginBottom: 16 }}>My Artworks</h3>
        <p style={{ color: "var(--ink-2)", fontSize: ".9rem", marginBottom: 12 }}>
          When I&apos;m not acting, I love to paint and draw! Here are some things I enjoy creating:
        </p>
        <ul style={{ paddingLeft: 20, color: "var(--ink-2)", lineHeight: 1.8 }}>
          <li>Watercolor Landscapes</li>
          <li>Crayon Portraits of my Family</li>
          <li>Clay Modeling</li>
        </ul>
      </div>
    )
  }
];

export default function PlayMode() {
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [activePopup, setActivePopup] = useState<any | null>(null);
  
  const [isWalking, setIsWalking] = useState(false);
  const [facing, setFacing] = useState<"up"|"down"|"left"|"right">("down");
  const [coins, setCoins] = useState(0);

  const frameRef = useRef<number>(null);
  const visitedRef = useRef<string | null>(null);
  const posRef = useRef(START_POS);
  const mapRef = useRef<HTMLDivElement>(null);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: true }));
    const handleKeyUp   = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: false }));
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Main Game Loop using requestAnimationFrame
  useEffect(() => {
    const loop = () => {
      // Pause movement if a modal is open!
      if (activePopup) {
        setIsWalking(false);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      let dx = 0;
      let dy = 0;

      if (keys["w"] || keys["arrowup"]) { dy -= MOVEMENT_SPEED; setFacing("up"); }
      if (keys["s"] || keys["arrowdown"]) { dy += MOVEMENT_SPEED; setFacing("down"); }
      if (keys["a"] || keys["arrowleft"]) { dx -= MOVEMENT_SPEED; setFacing("left"); }
      if (keys["d"] || keys["arrowright"]) { dx += MOVEMENT_SPEED; setFacing("right"); }

      // Mobile On-Screen Joystick / Touch state can map to 'keys' state too in the future

      if (dx !== 0 || dy !== 0) {
        setIsWalking(true);
        // Normalize diagonal speed
        if (dx !== 0 && dy !== 0) {
          dx *= 0.707;
          dy *= 0.707;
        }

        let nx = posRef.current.x + dx;
        let ny = posRef.current.y + dy;
        // Constrain to MAP bounds
        nx = Math.max(50, Math.min(MAP_SIZE.w - 50, nx));
        ny = Math.max(50, Math.min(MAP_SIZE.h - 50, ny));

        posRef.current = { x: nx, y: ny };

        if (mapRef.current) {
          const vX = window.innerWidth / 2;
          const vY = window.innerHeight / 2;
          mapRef.current.style.transform = `translate(${vX - nx}px, ${vY - ny}px)`;
        }

        // Proximity Trigger Check
        const nearbyLoc = LOCATIONS.find(loc => {
          const dist = Math.hypot(loc.x - nx, loc.y - ny);
          return dist < PROXIMITY_RADIUS;
        });

        if (nearbyLoc) {
          if (!activePopup && visitedRef.current !== nearbyLoc.id) {
            setActivePopup(nearbyLoc);
            visitedRef.current = nearbyLoc.id;
            setKeys({}); // Reset keys so user doesn't keep running after closing
            setCoins(prev => prev + 50);
            
            confetti({
              particleCount: 40,
              spread: 70,
              origin: { y: 0.5 },
              colors: ['#FFD700', '#F5C518', '#FFE066'],
              shapes: ['circle'],
              scalar: 1.2,
              ticks: 80
            });
          }
        } else {
          visitedRef.current = null;
        }
      } else {
        setIsWalking(false);
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current!);
  }, [keys, activePopup]);

  // Center point of the viewport
  const viewportX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const viewportY = typeof window !== "undefined" ? window.innerHeight / 2 : 500;

  // Clue Logic: Find nearest location to point towards
  const nearest = LOCATIONS.reduce((prev, curr) => {
    const distP = Math.hypot(prev.x - posRef.current.x, prev.y - posRef.current.y);
    const distC = Math.hypot(curr.x - posRef.current.x, curr.y - posRef.current.y);
    return distC < distP ? curr : prev;
  });
  const distToNearest = Math.hypot(nearest.x - posRef.current.x, nearest.y - posRef.current.y);
  const angleToNearest = Math.atan2(nearest.y - posRef.current.y, nearest.x - posRef.current.x) * (180 / Math.PI);

  return (
    <div style={{ width: "100vw", height: "100dvh", overflow: "hidden", background: "#7EB67C", position: "relative" }}>
      
      {/* ── UI OVERLAY ── */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 100, display: "flex", gap: 12 }}>
        <Link href="/" style={{ background: "#fff", padding: "8px 16px", borderRadius: 99, fontWeight: 800, color: "var(--ink)", textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>
          ← Exit
        </Link>
        <div style={{ background: "#FFD700", padding: "8px 16px", borderRadius: 99, fontWeight: 800, color: "#806600", boxShadow: "0 4px 12px rgba(0,0,0,.15)", display: "flex", gap: 6, alignItems: "center" }}>
          <span>🪙</span> {coins}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        {/* Clue Indicator */}
        {distToNearest > 300 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              background: "#fff", padding: "10px 14px", borderRadius: 20, boxShadow: "0 8px 24px rgba(0,0,0,.2)",
              display: "flex", alignItems: "center", gap: 10, fontSize: ".75rem", fontWeight: 800, color: "var(--ink)"
            }}
          >
            <span>FIND {nearest.title.toUpperCase()}</span>
            <div style={{ transform: `rotate(${angleToNearest}deg)`, fontSize: "1.2rem", display: "inline-block" }}>➔</div>
          </motion.div>
        )}
        <div style={{ background: "rgba(0,0,0,.5)", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: ".8rem", fontWeight: 700 }}>
          Use W A S D or Arrow Keys
        </div>
      </div>

      {/* ── THE WORLD MAP ── */}
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          width: MAP_SIZE.w,
          height: MAP_SIZE.h,
          transform: `translate(${viewportX - posRef.current.x}px, ${viewportY - posRef.current.y}px)`,
          willChange: "transform",
          backgroundImage: "repeating-linear-gradient(rgba(255,255,255,.05) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 40px)"
        }}
      >
        {/* Render Locations */}
        {LOCATIONS.map(loc => (
          <div
            key={loc.id}
            style={{
              position: "absolute",
              left: loc.x,
              top: loc.y,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {/* The Building / Island Area Indicator (Radius Shadow) */}
            <div style={{
              position: "absolute",
              width: PROXIMITY_RADIUS * 2,
              height: PROXIMITY_RADIUS * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${loc.color}22 0%, transparent 70%)`
            }} />
            
            <div style={{
              width: 100,
              height: 100,
              background: loc.color,
              border: "6px solid #fff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              boxShadow: "0 12px 24px rgba(0,0,0,.2)",
              zIndex: 10
            }}>
              {loc.emoji}
            </div>
            
            <div style={{
              marginTop: 12,
              background: "#fff",
              padding: "4px 12px",
              borderRadius: 99,
              fontWeight: 800,
              fontSize: ".85rem",
              color: "var(--ink)",
              boxShadow: "0 4px 12px rgba(0,0,0,.15)",
              zIndex: 10
            }}>
              {loc.title}
            </div>
          </div>
        ))}
        
        {/* Adding some random CSS trees for scenery */}
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: (Math.sin(i * 342) * .5 + .5) * MAP_SIZE.w,
            top: (Math.cos(i * 123) * .5 + .5) * MAP_SIZE.h,
            fontSize: "2.5rem",
            filter: "saturate(0.8) hue-rotate(-20deg)",
            transform: "translate(-50%, -50%)"
          }}>
            🌳
          </div>
        ))}
      </div>

      {/* ── THE PLAYER ── */}
      {/* Player stays fixed in the exact center of screen */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50
        }}
      >
        <motion.div
           animate={isWalking ? {
             y: [0, -12, 0],
             rotate: [0, 6, -6, 0],
           } : {
             y: 0,
             rotate: 0,
           }}
           transition={{
             repeat: Infinity,
             duration: 0.3,
             ease: "easeInOut"
           }}
           style={{
             fontSize: "4.2rem", 
             filter: "drop-shadow(0 12px 12px rgba(0,0,0,.3))",
             scaleX: facing === "left" ? -1 : 1
           }}
        >
          👧🏻
        </motion.div>
      </div>

      {/* ── MOBILE CONTROLS (D-PAD) ── */}
      <div className="md-hidden" style={{ position: "absolute", bottom: 40, left: 40, right: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 100 }}>
        {/* Joystick wrapper */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, opacity: 0.8 }}>
          <div />
          <button 
            onPointerDown={()=>setKeys(k=>({...k, w: true}))} 
            onPointerUp={()=>setKeys(k=>({...k, w: false}))} 
            onPointerLeave={()=>setKeys(k=>({...k, w: false}))}
            style={{ 
              width: 50, height: 50, borderRadius: "50%", border: "none", background: "#fff", 
              display: "flex", alignItems:"center", justifyContent:"center",
              userSelect: "none", WebkitUserSelect: "none", touchAction: "none", WebkitTapHighlightColor: "transparent"
            }}
          >
            ↑
          </button>
          <div />
          <button 
            onPointerDown={()=>setKeys(k=>({...k, a: true}))} 
            onPointerUp={()=>setKeys(k=>({...k, a: false}))} 
            onPointerLeave={()=>setKeys(k=>({...k, a: false}))}
            style={{ 
              width: 50, height: 50, borderRadius: "50%", border: "none", background: "#fff", 
              display: "flex", alignItems:"center", justifyContent:"center",
              userSelect: "none", WebkitUserSelect: "none", touchAction: "none", WebkitTapHighlightColor: "transparent"
            }}
          >
            ←
          </button>
          <button 
            onPointerDown={()=>setKeys(k=>({...k, s: true}))} 
            onPointerUp={()=>setKeys(k=>({...k, s: false}))} 
            onPointerLeave={()=>setKeys(k=>({...k, s: false}))}
            style={{ 
              width: 50, height: 50, borderRadius: "50%", border: "none", background: "#fff", 
              display: "flex", alignItems:"center", justifyContent:"center",
              userSelect: "none", WebkitUserSelect: "none", touchAction: "none", WebkitTapHighlightColor: "transparent"
            }}
          >
            ↓
          </button>
          <button 
            onPointerDown={()=>setKeys(k=>({...k, d: true}))} 
            onPointerUp={()=>setKeys(k=>({...k, d: false}))} 
            onPointerLeave={()=>setKeys(k=>({...k, d: false}))}
            style={{ 
              width: 50, height: 50, borderRadius: "50%", border: "none", background: "#fff", 
              display: "flex", alignItems:"center", justifyContent:"center",
              userSelect: "none", WebkitUserSelect: "none", touchAction: "none", WebkitTapHighlightColor: "transparent"
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* ── MODALS / POPUPS ── */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.6)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              style={{
                background: "#fff",
                borderRadius: 24,
                width: "100%",
                maxWidth: 500,
                padding: 40,
                position: "relative",
                boxShadow: "0 24px 60px rgba(0,0,0,.3)"
              }}
            >
              <button 
                onClick={() => setActivePopup(null)}
                style={{
                  position: "absolute", top: 16, right: 16, border: "none", background: "none", 
                  fontSize: "1.5rem", cursor: "pointer", opacity: .5
                }}
              >
                ✕
              </button>
              
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, borderBottom: "1px solid #eee", paddingBottom: 16 }}>
                <span style={{ fontSize: "2.5rem" }}>{activePopup.emoji}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem" }}>{activePopup.title}</h2>
              </div>
              
              {activePopup.content}

              <button 
                onClick={() => setActivePopup(null)}
                className="btn btn-rose" 
                style={{ width: "100%", justifyContent: "center", marginTop: 32, padding: "14px", fontSize: "1.1rem" }}
              >
                Let&apos;s keep exploring!
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
