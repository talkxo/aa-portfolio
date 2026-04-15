"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";
import { profileData, commercials, tvAndFilms, instagramReels, introVideo } from "@/data/portfolio";

const InstaEmbed = dynamic(() => import("@/components/InstaEmbed"), { ssr: false });

/* ── Icons ── */
const IcoPlay  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>;
const IcoStar  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoIG    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const IcoCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoFilm  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>;
const IcoSwipeLeft = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoSwipeRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

export default function Page() {
  const [activeTab,   setActiveTab]   = useState<"film"|"commercials">("film");
  const [activeVideo, setActiveVideo] = useState(commercials[0]);
  const [showIntro,   setShowIntro]   = useState(false);

  const kaalaPaani = tvAndFilms.find(f => f.title === "Kaala Paani")!;
  const others     = tvAndFilms.filter(f => f.title !== "Kaala Paani");

  const handleTabClick = (tab: "film"|"commercials") => {
    setActiveTab(tab);
    
    // Create custom shapes for emojis!
    const sparkle = confetti.shapeFromText({ text: '✨', scalar: 2 });
    const heart = confetti.shapeFromText({ text: '💖', scalar: 2 });
    
    // Confetti from both sides to meet in the middle
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      shapes: [sparkle, heart],
      scalar: 1.5
    });
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      shapes: [sparkle, heart],
      scalar: 1.5
    });
  };

  const handlePhotoHover = (e: React.MouseEvent) => {
    // Burst small amount of confetti at exact mouse location
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const star = confetti.shapeFromText({ text: '⭐', scalar: 2 });
    const heart = confetti.shapeFromText({ text: '💖', scalar: 2 });
    
    confetti({
      particleCount: 5,
      spread: 20,
      startVelocity: 10,
      origin: { x, y },
      shapes: [star, heart],
      scalar: 1.2,
      ticks: 50
    });
  };

  return (
    <main>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href={profileData.links.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost"><IcoIG /> Instagram</a>
        <a href={profileData.links.youtube} target="_blank" rel="noreferrer" className="btn btn-ghost">YouTube</a>
        <a href={profileData.links.imdb} target="_blank" rel="noreferrer" className="btn btn-rose"><IcoStar /> IMDB</a>
      </nav>

      {/* ── HERO ── */}
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 0 }}>
        <div className="hero-inner">
          <div>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} className="eyebrow">
              Child Actor · Model · Artist
            </motion.p>

            <motion.h1
              initial={{opacity:0,y:24}}
              animate={{opacity:1,y:0}}
              transition={{duration:.8,ease:[.16,1,.3,1]}}
              className="hero-name"
            >
              <span className="first">Aradhya</span>
              <span className="last">Aanjna</span>
              <span className="emoji">✨</span>
            </motion.h1>

            <motion.div
              initial={{opacity:0,y:12}}
              animate={{opacity:1,y:0}}
              transition={{duration:.6,delay:.15}}
              className="hero-bio"
              dangerouslySetInnerHTML={{ __html: profileData.bio }}
            />

            <motion.div
              initial={{opacity:0,y:12}}
              animate={{opacity:1,y:0}}
              transition={{duration:.6,delay:.25}}
              className="hero-ctas"
            >
              <button className="btn btn-rose" onClick={() => setShowIntro(true)}>
                <IcoFilm /> Watch Introduction
              </button>
              <a href="#featured-work" className="btn btn-ghost">Explore work ↓</a>
            </motion.div>

            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{delay:.3}}
              className="stat-row"
            >
              <span className="stat-chip"><span className="sl">Born</span> 2016</span>
              <span className="stat-chip"><span className="sl">Debut</span> 2018</span>
              <span className="stat-chip"><span className="sl">Base</span> Gurgaon</span>
              <span className="stat-chip accent"><span className="sl">Brands</span> 20+</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-photo-col"
            initial={{opacity:0,scale:.97}}
            animate={{opacity:1,scale:1}}
            transition={{duration:1,ease:[.16,1,.3,1]}}
          >
            <div className="hero-photo-wrap" onMouseMove={handlePhotoHover}>
              <div className="hero-photo">
                <img src={profileData.currentLook.imageUrl} alt="Aradhya Aanjna" />
              </div>
              <div className="current-look-badge">
                <span className="dot" />
                Current Look · {profileData.currentLook.date}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WORKS ── */}
      <section id="featured-work" className="wrap section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-h2">Selected Works</h2>
          </div>
          <div className="tab-group">
            <button className={`tab-pill ${activeTab==="film"?"active":""}`} onClick={()=>handleTabClick("film")}>
              {activeTab === "film" && (
                <motion.span layoutId="tab-bubble" className="tab-bubble" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
              )}
              <span className="tab-label">Films &amp; Series</span>
            </button>
            <button className={`tab-pill ${activeTab==="commercials"?"active":""}`} onClick={()=>handleTabClick("commercials")}>
              {activeTab === "commercials" && (
                <motion.span layoutId="tab-bubble" className="tab-bubble" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
              )}
              <span className="tab-label">Commercials</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "film" && (
            <motion.div key="film" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>
              <div className="bento-split">
                {/* Kaala Paani — hero card with real poster */}
                <div className="bento-hero">
                  <Image src={kaalaPaani.poster!} alt="Kaala Paani" fill priority />
                  <div className="bento-hero-overlay" />
                  <div className="bento-hero-content">
                    <p style={{color:"rgba(255,255,255,.6)",fontSize:".68rem",fontWeight:800,letterSpacing:".15em",textTransform:"uppercase",marginBottom:10}}>
                      {kaalaPaani.platform} · {kaalaPaani.type}
                    </p>
                    <h3 style={{fontFamily:"var(--font-display)",fontSize:"2.6rem",fontWeight:700,lineHeight:1,marginBottom:16}}>
                      {kaalaPaani.title}
                    </h3>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <a href={kaalaPaani.videoUrl} target="_blank" rel="noreferrer" className="btn btn-trailer-text" style={{color:"#fff"}}>
                        <IcoPlay /> Watch Trailer
                      </a>
                      {kaalaPaani.imdb && (
                        <a href={kaalaPaani.imdb} target="_blank" rel="noreferrer" className="btn btn-imdb-outline" style={{borderColor:"rgba(245,197,24,.6)",color:"#F5C518"}}>
                          <IcoStar /> IMDB
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Other cards as a clean sideways list */}
                <div className="bento-list">
                  {others.map(p => (
                    <div key={p.id} className="bento-list-item">
                      <div className="bento-list-info">
                        <p className="bento-platform" style={{color:"var(--rose)", marginBottom:2}}>{p.platform}</p>
                        <h4 style={{fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:700}}>{p.title}</h4>
                        <p style={{color:"var(--ink-2)", fontSize:".85rem"}}>{p.type}</p>
                      </div>
                      <div className="bento-list-actions">
                        {p.videoUrl && (
                          <a href={p.videoUrl} target="_blank" rel="noreferrer" className="btn btn-trailer-text">
                            <IcoPlay /> Trailer
                          </a>
                        )}
                        {p.imdb && (
                          <a href={p.imdb} target="_blank" rel="noreferrer" className="btn btn-imdb-outline">
                            <IcoStar /> IMDB
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "commercials" && (
            <motion.div key="com" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}} className="theater-wrap">
              <div className="theater-player">
                <iframe key={activeVideo.id} src={activeVideo.videoUrl} title={activeVideo.brand} allowFullScreen />
              </div>
              <div className="theater-meta">
                <div>
                  <h3>{activeVideo.brand}</h3>
                  <p>Featured television commercial</p>
                </div>
                <span style={{color:"var(--ink-2)",fontSize:".85rem",fontWeight:600}}>
                  {commercials.findIndex(c=>c.id===activeVideo.id)+1} / {commercials.length}
                </span>
              </div>
              <div className="brand-switcher">
                {commercials.map(v => (
                  <button key={v.id} className={`brand-chip ${v.id===activeVideo.id?"active":""}`} onClick={()=>setActiveVideo(v)}>
                    {v.id===activeVideo.id && <IcoCheck />}
                    {v.brand}
                  </button>
                ))}
              </div>
              <div className="scroll-hint md-hidden">
                <IcoSwipeLeft /> <span>Swipe</span> <IcoSwipeRight />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── REELS — using react-social-media-embed ── */}
      <section className="reels-section section-sm">
        <div className="wrap">
          <div className="section-header">
            <div>
              <span className="eyebrow">Off Camera</span>
              <h2 className="section-h2">Latest Reels</h2>
            </div>
            <a href={profileData.links.instagram} target="_blank" rel="noreferrer" className="btn btn-ig">
              <IcoIG /> Follow
            </a>
          </div>
          <div className="reels-row">
            {instagramReels.map((url, i) => (
              <div key={i} className="reel-cell">
                <InstaEmbed url={url} />
              </div>
            ))}
          </div>
          <div className="scroll-hint md-hidden" style={{marginTop: 12}}>
            <IcoSwipeLeft /> <span>Swipe</span> <IcoSwipeRight />
          </div>
        </div>
      </section>



      {/* ── Intro Video Modal ── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="modal-overlay"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={() => setShowIntro(false)}
          >
            <motion.div
              className="modal-content"
              initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowIntro(false)}>✕</button>
              <iframe src={introVideo} title="Introduction" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
