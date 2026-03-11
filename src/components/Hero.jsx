import { useState, useEffect, useCallback } from "react";
import "./Hero.css";

// ── Hero photos — served from public/images/hero/
// Add more photos: public/images/hero/photo-04.jpg, photo-05.jpg …
import photo01 from "../assets/gallery/photo-01.jpg";
import photo02 from "../assets/gallery/photo-02.jpg";
import photo03 from "../assets/gallery/photo-03.jpg";
import photo04 from "../assets/gallery/photo-04.jpg";
import photo05 from "../assets/gallery/photo-05.jpg";
import photo06 from "../assets/gallery/photo-06.jpg";
import photo07 from "../assets/gallery/photo-07.jpg";
import photo08 from "../assets/gallery/photo-08.jpg";
import photo09 from "../assets/gallery/photo-09.jpg";
import photo10 from "../assets/gallery/photo-10.jpg";
import photo11 from "../assets/gallery/photo-11.jpg";
import photo12 from "../assets/gallery/photo-12.jpg";
import photo13 from "../assets/gallery/photo-13.jpg";
import photo14 from "../assets/gallery/photo-14.jpg";
import photo15 from "../assets/gallery/photo-15.jpg";
import photo16 from "../assets/gallery/photo-16.jpg";
import photo17 from "../assets/gallery/photo-17.jpg";
import photo18 from "../assets/gallery/photo-18.jpg";
import photo19 from "../assets/gallery/photo-19.jpg";

const photos = [
  photo01,
  photo02,
  photo03,
  photo04,
  photo05,
  photo06,
  photo07,
  photo08,
  photo09,
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
];

const orgTags = ["WaSH‑Net", "YPPD", "CSPPS", "GCAP", "UN‑Habitat"];

const INTERVAL_MS = 4500;

function Hero({ scrollToContact, scrollToWork }) {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [dir,     setDir]     = useState(1); // 1 = forward, -1 = backward

  const next = useCallback(() => {
    setDir(1);
    setCurrent((i) => (i + 1) % photos.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((i) => (i - 1 + photos.length) % photos.length);
  }, []);

  const goTo = (idx) => { setDir(idx > current ? 1 : -1); setCurrent(idx); };

  // Auto-advance
  useEffect(() => {
    if (paused || photos.length <= 1) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const hasPhotos = photos.length > 0;

  return (
    <div className="hero">
      <div className="hero__bg-shape" aria-hidden="true" />

      {/* ── Left: text ──────────────────────────────────────── */}
      <div className="hero__content">
        <span className="hero__eyebrow">Activist · Peacebuilder · Development Leader</span>

        <h1>Musa Ansumana Soko</h1>

        <h2>
          Award-winning activist, peacebuilder, and development advocate from Sierra Leone.
        </h2>

        <p>
          Musa works at the intersection of peacebuilding, governance, health systems, youth
          empowerment, gender justice, and access to water and sanitation. With a passion for
          community-driven change, he has dedicated his career to advancing dignity, equity,
          and opportunity for all.
        </p>

        <div className="hero__buttons">
          <button className="btn btn--primary" onClick={scrollToContact}>
            Invite Musa to speak
          </button>
          <button className="btn btn--ghost" onClick={scrollToWork}>
            Explore his work
          </button>
        </div>

        <div className="hero__orgs" aria-label="Associated organisations">
          <span className="hero__orgs-label">Also with</span>
          {orgTags.map((tag) => (
            <span key={tag} className="hero__org-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* ── Right: photo slideshow ───────────────────────────── */}
      <div
        className="hero__image"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero__portrait-frame">

          {hasPhotos ? (
            <>
              {/* Slides */}
              <div className="hero__slides" aria-label="Photo carousel">
                {photos.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Musa Ansumana Soko — photo ${idx + 1}`}
                    className={`hero__slide${idx === current ? " active" : ""}`}
                  />
                ))}
              </div>

              {/* Prev / Next — only if more than one photo */}
              {photos.length > 1 && (
                <>
                  <button
                    className="hero__slide-arrow hero__slide-arrow--prev"
                    onClick={prev}
                    aria-label="Previous photo"
                  >&#8592;</button>
                  <button
                    className="hero__slide-arrow hero__slide-arrow--next"
                    onClick={next}
                    aria-label="Next photo"
                  >&#8594;</button>
                </>
              )}

              {/* Dot navigation */}
              {photos.length > 1 && (
                <div className="hero__slide-dots" role="tablist" aria-label="Photos">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      role="tab"
                      className={`hero__slide-dot${idx === current ? " active" : ""}`}
                      onClick={() => goTo(idx)}
                      aria-label={`Photo ${idx + 1}`}
                      aria-selected={idx === current}
                    />
                  ))}
                </div>
              )}

              {/* Counter */}
              {photos.length > 1 && (
                <div className="hero__slide-counter" aria-live="polite">
                  {current + 1} / {photos.length}
                </div>
              )}

              {/* Name badge */}
              <div className="hero__name-badge" aria-hidden="true">
                <span className="hero__name-badge-name">Musa Ansumana Soko</span>
                <span className="hero__name-badge-role">Activist · Peacebuilder</span>
              </div>
            </>
          ) : (
            /* Placeholder when folder is empty */
            <div className="hero__portrait-placeholder" aria-label="Portrait placeholder">
              <span>Drop photos in<br />src/assets/hero-photos/</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
