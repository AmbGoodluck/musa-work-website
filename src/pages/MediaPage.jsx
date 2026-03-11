// MediaPage.jsx — redesigned; all content text preserved exactly
import { useState, useEffect } from "react";
import "../styles/MediaPage.css";

// Social profiles
const socialProfiles = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/musaansumanasoko/",
    label: "LinkedIn – Professional profile & updates",
    description: "Connect for professional updates, thought leadership, and Musa's work in governance and development.",
    button: "View on LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/musa.ansumana.soko",
    label: "Facebook – Community reflections & civic commentary",
    description: "Follow for community reflections, civic commentary, and engagement with partners and supporters.",
    button: "View on Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    platform: "Twitter",
    url: "https://x.com/Musa_A_Soko?s=20",
    label: "Twitter – Real-time updates & advocacy",
    description: "Follow for real-time updates, advocacy, and engagement on peacebuilding and development.",
    button: "View on Twitter",
    color: "#1DA1F2",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" fill="#1DA1F2">
        <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
      </svg>
    ),
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/@CivicCompasswithMusaAnsumana",
    label: "YouTube – Talks, interviews & features",
    description: "Watch talks, interviews, and featured videos on peace, youth, and development.",
    button: "View on YouTube",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" width="32" height="32" fill="#FF0000">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.117C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.386.569A2.994 2.994 0 0 0 .502 6.186C0 8.114 0 12 0 12s0 3.886.502 5.814a2.994 2.994 0 0 0 2.112 2.117C4.542 20.5 12 20.5 12 20.5s7.458 0 9.386-.569a2.994 2.994 0 0 0 2.112-2.117C24 15.886 24 12 24 12s0-3.886-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

// Video data
const videos = [
  {
    id: "1",
    title: "Civic Compass: Youth Voices in Governance",
    description: "Episode 1 – Engaging youth leaders on public service.",
    thumbnail: "https://img.youtube.com/vi/tkrUpPME4I8/hqdefault.jpg",
    embedId: "tkrUpPME4I8",
    date: "2025",
  },
  {
    id: "2",
    title: "Civic Compass: Water & Sanitation Dialogues",
    description: "Episode 2 – Discussing WaSH and local impact.",
    thumbnail: "https://img.youtube.com/vi/NXnAlXG9Bxg/hqdefault.jpg",
    embedId: "NXnAlXG9Bxg",
    date: "2025",
  },
  {
    id: "3",
    title: "Civic Compass: Peacebuilding in Sierra Leone",
    description: "Episode 3 – Peacebuilding strategies and stories.",
    thumbnail: "https://img.youtube.com/vi/jHG2IGN7wUI/hqdefault.jpg",
    embedId: "jHG2IGN7wUI",
    date: "2025",
  },
];

// Gallery images — served from public/images/gallery/
const captions = [
  "Community dialogue in Freetown",
  "Youth leadership workshop",
  "Panel discussion on WaSH and governance",
  "Field visit to rural water points",
  "Public talk on governance",
  "Community engagement event",
  "Youth empowerment session",
  "Panel on public services",
  "Leadership training workshop",
  "Community meeting in Bo",
];

const galleryImages = Array.from({ length: 19 }, (_, idx) => ({
  id: idx + 1,
  src: `/images/gallery/photo-${String(idx + 1).padStart(2, "0")}.jpg`,
  alt: captions[idx] || `Gallery photo ${idx + 1}`,
  caption: captions[idx] || `Gallery photo ${idx + 1}`,
}));

const INITIAL_VISIBLE = 8;
const LOAD_MORE_COUNT = 6;

function MediaPage() {
  const [visibleCount, setVisibleCount]   = useState(INITIAL_VISIBLE);
  const [lightboxIdx, setLightboxIdx]     = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ESC closes modals; arrow keys navigate lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightboxIdx(null);
        setSelectedVideo(null);
      }
      if (lightboxIdx !== null) {
        if (e.key === "ArrowRight") setLightboxIdx((i) => Math.min(i + 1, visibleCount - 1));
        if (e.key === "ArrowLeft")  setLightboxIdx((i) => Math.max(i - 1, 0));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIdx, visibleCount]);

  return (
    <main className="media-page">

      {/* ── Header band ──────────────────────────────────────── */}
      <div className="media-header-band">
        <div className="media-header-inner">
          <span className="media-eyebrow">Media</span>
          <h1>Media &amp; Social Presence</h1>
          <p>
            This page gathers Musa's public profiles, videos, and photo highlights so partners
            and supporters can explore his work visually. Connect with Musa, watch his digital
            series, and browse snapshots from his community engagements.
          </p>
        </div>
      </div>

      <div className="media-inner">

        {/* ── Social profiles ──────────────────────────────────── */}
        <section className="media-section">
          <div className="media-section-head">
            <span className="media-section-label">Profiles</span>
            <h2>Connect with Musa</h2>
          </div>
          <div className="media-social-cards">
            {socialProfiles.map((profile) => (
              <div
                className="media-social-card"
                key={profile.platform}
                style={{ "--platform-color": profile.color }}
              >
                <div className="media-social-icon">{profile.icon}</div>
                <h3>{profile.platform}</h3>
                <p className="media-social-label">{profile.label}</p>
                <p className="media-social-desc">{profile.description}</p>
                <a
                  href={profile.url}
                  className="media-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.button}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Videos ───────────────────────────────────────────── */}
        <section className="media-section">
          <div className="media-section-head">
            <span className="media-section-label">Videos</span>
            <h2>Videos – Civic Compass &amp; More</h2>
          </div>
          <p className="media-section-desc">
            Musa hosts 'Civic Compass', a digital series where he speaks with citizens, youth
            leaders and decision‑makers about governance, peacebuilding and public services in
            Sierra Leone and beyond.
          </p>
          <div className="media-video-strip">
            {videos.map((video) => (
              <button
                className="media-video-card"
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play video: ${video.title}`}
              >
                <div className="media-video-thumb-wrap">
                  <img src={video.thumbnail} alt={video.title} className="media-video-thumb" />
                  <span className="media-video-play-btn" aria-hidden="true">▶</span>
                </div>
                <div className="media-video-info">
                  <h4>{video.title}</h4>
                  <p>{video.description}</p>
                  <span className="media-video-date">{video.date}</span>
                </div>
              </button>
            ))}
          </div>
          <a
            href="https://www.youtube.com/@CivicCompasswithMusaAnsumana"
            className="media-channel-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View channel on YouTube
          </a>
        </section>

        {/* ── Gallery ──────────────────────────────────────────── */}
        <section className="media-section">
          <div className="media-section-head">
            <span className="media-section-label">Gallery</span>
            <h2>Photo Gallery</h2>
          </div>
          <p className="media-section-desc">
            Snapshots from community engagements, public talks and field work.
          </p>
          <div className="media-gallery-grid">
            {galleryImages.length === 0 ? (
              <div style={{ color: "#c00", fontWeight: "bold", padding: "2rem", textAlign: "center" }}>
                No gallery images found. Please check your src/assets/gallery folder and Vite config.
              </div>
            ) : (
              galleryImages.slice(0, visibleCount).map((img, idx) => (
                <button
                  className="media-gallery-thumb"
                  key={img.id}
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`View photo: ${img.caption}`}
                >
                  <img src={img.src} alt={img.alt} />
                  <div className="media-gallery-overlay" aria-hidden="true">
                    <span className="media-gallery-caption">{img.caption}</span>
                  </div>
                </button>
              ))
            )}
          </div>
          {visibleCount < galleryImages.length && (
            <button
              className="media-gallery-loadmore"
              onClick={() => setVisibleCount((v) => Math.min(v + LOAD_MORE_COUNT, galleryImages.length))}
            >
              View more photos
            </button>
          )}
        </section>

      </div>

      {/* ── Video modal ──────────────────────────────────────────── */}
      {selectedVideo && (
        <div
          className="media-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setSelectedVideo(null)}
        >
          <div className="media-modal-content">
            <button
              className="media-modal-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >&times;</button>
            <div className="media-modal-video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="media-modal-caption">
              <h4>{selectedVideo.title}</h4>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <div
          className="media-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setLightboxIdx(null)}
        >
          <div className="media-modal-content media-lightbox-content">
            <button
              className="media-modal-close"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close photo"
            >&times;</button>
            <div className="media-lightbox-image">
              <img
                src={galleryImages[lightboxIdx].src}
                alt={galleryImages[lightboxIdx].alt}
              />
              <span className="media-gallery-caption">
                {galleryImages[lightboxIdx].caption}
              </span>
            </div>
            <div className="media-lightbox-nav">
              <button
                onClick={() => setLightboxIdx((i) => Math.max(i - 1, 0))}
                disabled={lightboxIdx === 0}
                aria-label="Previous photo"
              >&#8592;</button>
              <span className="media-lightbox-count">
                {lightboxIdx + 1} / {Math.min(visibleCount, galleryImages.length)}
              </span>
              <button
                onClick={() => setLightboxIdx((i) => Math.min(i + 1, visibleCount - 1))}
                disabled={lightboxIdx >= visibleCount - 1}
                aria-label="Next photo"
              >&#8594;</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MediaPage;
