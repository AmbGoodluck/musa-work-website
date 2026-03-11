// AboutPage.jsx — professional auto-play slideshow; all content text preserved exactly
import { useState, useEffect, useCallback, useRef } from "react";
import "./AboutPage.css";

// ── Slideshow photos — served from public/images/about/
// Add more: public/images/about/photo-07.jpg, photo-08.jpg …
const slideshowSrcs = [
  "/images/about/photo-01.jpg",
  "/images/about/photo-02.jpg",
  "/images/about/photo-03.jpg",
  "/images/about/photo-04.jpg",
  "/images/about/photo-05.jpg",
  "/images/about/photo-06.jpg",
];

const slides = slideshowSrcs.map((url, idx) => ({
  url,
  caption: `Moment ${idx + 1}`,
}));

// ── Fast facts sidebar ───────────────────────────────────────
const fastFacts = [
  { label: "Location",    value: "Freetown, Sierra Leone" },
  { label: "Languages",   value: "English · Mende · Krio" },
  { label: "Experience",  value: "20+ years of public-interest work" },
  { label: "Focus areas", value: "WaSH · Peacebuilding · Gender · Youth" },
];

const INTERVAL_MS = 4800;

// ── Professional Slideshow component ────────────────────────
function AboutSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const touchStartX = useRef(null);

  const total = slides.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  // Auto-play
  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next, total]);

  // Keyboard nav (when no lightbox open)
  useEffect(() => {
    if (lightbox !== null) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, lightbox]);

  // Lightbox keyboard
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")      setLightbox(null);
      if (e.key === "ArrowRight")  setLightbox((i) => (i + 1) % total);
      if (e.key === "ArrowLeft")   setLightbox((i) => (i - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, total]);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (slides.length === 0) {
    return (
      <div className="ashow-empty">
        <span>Drop 5+ photos into<br /><code>src/assets/about-photos/</code></span>
      </div>
    );
  }

  return (
    <>
      <div
        className="ashow"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Photo slideshow"
      >
        {/* ── Slides ─────────────────────────────────────────── */}
        <div className="ashow__track">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`ashow__slide${idx === current ? " active" : ""}`}
              aria-hidden={idx !== current}
            >
              <img
                src={s.url}
                alt={s.caption}
                className="ashow__img"
                loading="lazy"
              />
              {/* Caption */}
              <div className="ashow__caption-bar">
                <span className="ashow__caption">{s.caption}</span>
                <button
                  className="ashow__expand"
                  onClick={() => setLightbox(idx)}
                  aria-label="View full screen"
                >⤢</button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Progress bar ──────────────────────────────────── */}
        <div className="ashow__progress" aria-hidden="true">
          <div
            className="ashow__progress-fill"
            key={current}                       /* restart animation on change */
            style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
          />
        </div>

        {/* ── Counter ───────────────────────────────────────── */}
        <div className="ashow__counter" aria-live="polite">
          {current + 1} / {total}
        </div>

        {/* ── Arrows ────────────────────────────────────────── */}
        {total > 1 && (
          <>
            <button className="ashow__arrow ashow__arrow--prev" onClick={prev} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="ashow__arrow ashow__arrow--next" onClick={next} aria-label="Next photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}

        {/* ── Dot navigation ────────────────────────────────── */}
        {total > 1 && (
          <div className="ashow__dots" role="tablist" aria-label="Slide navigation">
            {slides.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                className={`ashow__dot${idx === current ? " active" : ""}`}
                onClick={() => { setCurrent(idx); setPaused(true); setTimeout(() => setPaused(false), 6000); }}
                aria-label={`Photo ${idx + 1}`}
                aria-selected={idx === current}
              />
            ))}
          </div>
        )}

        {/* ── Pause indicator ───────────────────────────────── */}
        {paused && total > 1 && (
          <div className="ashow__paused-badge" aria-label="Paused">❙❙</div>
        )}
      </div>

      {/* ── Thumbnail strip ───────────────────────────────────── */}
      <div className="ashow__thumbs" aria-label="Thumbnail navigation">
        {slides.map((s, idx) => (
          <button
            key={idx}
            className={`ashow__thumb${idx === current ? " active" : ""}`}
            onClick={() => { setCurrent(idx); setPaused(true); setTimeout(() => setPaused(false), 6000); }}
            aria-label={`Go to photo ${idx + 1}`}
          >
            <img src={s.url} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="about-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button className="about-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close lightbox">&times;</button>
          <button
            className="about-lightbox-arrow left"
            onClick={() => setLightbox((i) => (i - 1 + total) % total)}
            aria-label="Previous photo"
          >&#8592;</button>
          <div className="about-lightbox-img-wrap">
            <img src={slides[lightbox].url} alt={slides[lightbox].caption} className="about-lightbox-img" />
            <div className="about-lightbox-caption">{slides[lightbox].caption}</div>
            <div className="about-lightbox-count">{lightbox + 1} / {total}</div>
          </div>
          <button
            className="about-lightbox-arrow right"
            onClick={() => setLightbox((i) => (i + 1) % total)}
            aria-label="Next photo"
          >&#8594;</button>
        </div>
      )}
    </>
  );
}

// ── Main AboutPage ──────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="aboutpage-bg">

      {/* Header band */}
      <div className="aboutpage-header-band">
        <div className="aboutpage-header-inner">
          <span className="aboutpage-eyebrow">About</span>
          <h1 className="aboutpage-heading">About Musa Ansumana Soko</h1>
        </div>
      </div>

      <div className="aboutpage-container">

        {/* Two-column: text + sidebar */}
        <div className="aboutpage-two-col">
          <div className="aboutpage-text-col">
            <div className="aboutpage-text">
              <p>
                Musa Ansumana Soko is a leading advocate and development professional based in Freetown, Sierra Leone. With a steadfast commitment to social justice and community empowerment, Musa's work centers on creating lasting change for marginalized groups across the country. His vision is rooted in building resilient communities, advancing human rights, and ensuring that every voice is heard.
              </p>
              <p>
                Musa's activism is shaped by his dedication to tackling gender-based and domestic violence, championing water, sanitation, and hygiene (WaSH) initiatives, and empowering youth and women. Through his leadership, he has raised awareness about the impact of domestic violence, trained community leaders in conflict resolution, and worked to integrate these critical issues into education and policy. Musa is especially passionate about expanding opportunities for women, helping them achieve greater independence and economic freedom.
              </p>
              <p>
                Over the years, Musa has held pivotal roles including Executive Coordinator of the Youth Partnership for Peace and Development (YPPD), Team Lead of the Water, Sanitation and Hygiene Network of Sierra Leone (WaSH-Net), and National Contact Point for the Global Call to Action Against Poverty (GCAP). His journey has also taken him to international platforms as a Youth Adviser at UN-Habitat and as an Exchange Fellow at the Shelter for Abused Women and Children in Florida. Musa's experience spans campaign strategy, program management, and advocacy for people with disabilities, always with a focus on those most in need.
              </p>
              <p>
                Recognized as an outstanding youth activist and goodwill ambassador for children, Musa is driven by a belief in dignity, solidarity, and the power of collective action. He is fluent in Mende, English, and Krio, and is known for his strong project coordination skills and unwavering dedication to building a more just and inclusive Sierra Leone.
              </p>
            </div>
          </div>

          <aside className="aboutpage-sidebar">
            <div className="aboutpage-profile-card">
              <div className="aboutpage-profile-avatar" aria-hidden="true">MAS</div>
              <div className="aboutpage-profile-name">Musa Ansumana Soko</div>
              <div className="aboutpage-profile-role">Activist &amp; Development Leader</div>
            </div>
            <div className="aboutpage-fast-facts">
              <div className="aboutpage-facts-heading">Quick Facts</div>
              <ul className="aboutpage-facts-list">
                {fastFacts.map((f) => (
                  <li key={f.label}>
                    <span className="aboutpage-fact-label">{f.label}</span>
                    <span className="aboutpage-fact-value">{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Journey section */}
        <section className="aboutpage-journey-section">
          <div className="aboutpage-journey-layout">
            <div className="aboutpage-journey-main">
              <div className="aboutpage-journey-heading">
                <span className="aboutpage-journey-bar" />
                <h2>Professional Journey &amp; Contributions</h2>
              </div>
              <div className="aboutpage-journey-text">
                <p>
                  Musa Ansumana Soko's professional journey brings together grassroots organizing, policy advocacy and international engagement across more than two decades of public‑interest work in Sierra Leone and beyond. As <span className="aboutpage-role">Team Lead of the Water, Sanitation and Hygiene Network of Sierra Leone (WaSH‑Net)</span> and <span className="aboutpage-role">Executive Coordinator of the Youth Partnership for Peace and Development (YPPD)</span>, he has helped shape national conversations on access to safe water, domestic and gender‑based violence, youth leadership and inclusive governance. His roles as <span className="aboutpage-role">National Contact Point for the Global Call to Action Against Poverty</span> and former <span className="aboutpage-role">Youth Adviser to UN‑Habitat</span> reflect a career that connects local realities to regional and global policy spaces.
                </p>
                <p>
                  Through WaSH‑Net, Musa has led efforts to build multi‑stakeholder platforms at national, district and regional levels that bring together government ministries, civil society organizations and communities around water, sanitation and hygiene. He has contributed to advocacy for stronger budget allocations to the WaSH sector, promoted practical policy options that reflect the demands of marginalized communities, and supported initiatives that increase access to potable water, improved sanitation facilities and positive hygiene practices, particularly for poor and vulnerable households.
                </p>
                <p>
                  His long‑standing engagement with the Youth Partnership for Peace and Development has focused on challenging gender‑based and domestic violence and widening opportunities for women and young people. As Executive Coordinator, Musa has overseen programs that raise community awareness about domestic violence, train community and faith leaders in conflict resolution and mitigation, and integrate discussions of domestic and gender‑based violence into education and community dialogue. He has also championed the expansion of livelihoods and skills programmes for women as a pathway to greater independence, economic freedom and long‑term resilience.
                </p>
                <p>
                  Beyond these roles, Musa's experience includes designing domestic‑violence intervention models as a fellow at the Shelter for Abused Women and Children in Florida, advising peacebuilding research for The Australian National University, and pioneering ICT training and Braille book projects for blind and visually impaired learners in Sierra Leone. These contributions underline his commitment to inclusive development, whether by improving services for communities without safe water, creating safer environments for women and girls, or opening access to education and technology for people with disabilities. In every setting, he brings a strategic, evidence‑informed approach that links local lived experience with policy change and long‑term social impact.
                </p>
              </div>
            </div>
            <aside className="aboutpage-journey-highlights">
              <div className="aboutpage-highlight-title">Highlights</div>
              <ul className="aboutpage-highlight-list">
                <li>WaSH‑Net Team Lead</li>
                <li>YPPD Executive Coordinator</li>
                <li>GCAP National Contact Point</li>
                <li>UN‑Habitat Youth Adviser</li>
              </ul>
            </aside>
          </div>
        </section>

        <div className="aboutpage-divider" />

        {/* Professional slideshow */}
        <section className="aboutpage-carousel-section">
          <h2 className="aboutpage-slider-heading">Moments from the Journey</h2>
          <AboutSlideshow />
        </section>

      </div>
    </div>
  );
}
