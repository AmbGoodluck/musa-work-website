import React, { useState } from "react";
import "../styles/MediaPage.css";

// Social profiles data
const socialProfiles = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/musaansumanasoko/",
    label: "LinkedIn – Professional profile & updates",
    description: "Connect for professional updates, thought leadership, and Musa’s work in governance and development.",
    button: "View on LinkedIn",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/musa.ansumana.soko",
    label: "Facebook – Community reflections & civic commentary",
    description: "Follow for community reflections, civic commentary, and engagement with partners and supporters.",
    button: "View on Facebook",
  },
];

// Video data (placeholder)
const videos = [
  {
    id: "1",
    title: "Civic Compass: Youth Voices in Governance",
    description: "Episode 1 – Engaging youth leaders on public service.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    embedId: "dQw4w9WgXcQ",
    date: "Jan 2026",
  },
  {
    id: "2",
    title: "Civic Compass: Water & Sanitation Dialogues",
    description: "Episode 2 – Discussing WaSH and local impact.",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    embedId: "3JZ_D3ELwOQ",
    date: "Feb 2026",
  },
  {
    id: "3",
    title: "Civic Compass: Peacebuilding in Sierra Leone",
    description: "Episode 3 – Peacebuilding strategies and stories.",
    thumbnail: "https://img.youtube.com/vi/V-_O7nl0Ii0/hqdefault.jpg",
    embedId: "V-_O7nl0Ii0",
    date: "Mar 2026",
  },
  // Add more as needed
];

// Import all images from the gallery folder (Vite root is src)
const galleryImports = import.meta.glob("./assets/gallery/*.{jpg,png,jpeg}", { eager: true });
const galleryImageFiles = Object.entries(galleryImports);

// Example captions for the first images (customize as needed)
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

const galleryImages = galleryImageFiles.map(([path, mod], idx) => ({
  id: idx + 1,
  src: mod.default,
  alt: captions[idx] || `Gallery photo ${idx + 1}`,
  caption: captions[idx] || `Gallery photo ${idx + 1}`,
}));

const INITIAL_VISIBLE = 8;
const LOAD_MORE_COUNT = 6;

function MediaPage() {
  // Gallery state
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Video modal state
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Handlers
  const openLightbox = (idx) => {
    setSelectedImageIndex(idx);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const showPrevImage = () => setSelectedImageIndex((i) => (i > 0 ? i - 1 : i));
  const showNextImage = () => setSelectedImageIndex((i) => (i < visibleCount - 1 ? i + 1 : i));

  const openVideo = (video) => setSelectedVideo(video);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <main className="media-page">
      {/* Page Header */}
      <header className="media-header">
        <h1>Media &amp; Social Presence</h1>
        <p>
          This page gathers Musa’s public profiles, videos, and photo highlights so partners and supporters can explore his work visually. Connect with Musa, watch his digital series, and browse snapshots from his community engagements.
        </p>
      </header>

      {/* Social Profiles */}
      <section className="media-section">
        <h2>Connect with Musa</h2>
        <div className="media-social-cards">
          {socialProfiles.map((profile) => (
            <div className="media-social-card" key={profile.platform}>
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

      {/* Video Section */}
      <section className="media-section">
        <h2>Videos – Civic Compass &amp; More</h2>
        <p className="media-section-desc">
          Musa hosts ‘Civic Compass’, a digital series where he speaks with citizens, youth leaders and decision‑makers about governance, peacebuilding and public services in Sierra Leone and beyond.
        </p>
        <div className="media-video-strip">
          {videos.map((video, idx) => (
            <div
              className="media-video-card"
              key={video.id}
              tabIndex={0}
              onClick={() => openVideo(video)}
              onKeyDown={(e) => (e.key === "Enter" ? openVideo(video) : null)}
              aria-label={`Play video: ${video.title}`}
            >
              <img src={video.thumbnail} alt={video.title} className="media-video-thumb" />
              <div className="media-video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
                <span className="media-video-date">{video.date}</span>
              </div>
            </div>
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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="media-modal" role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="media-modal-content">
            <button className="media-modal-close" onClick={closeVideo} aria-label="Close video">&times;</button>
            <div className="media-modal-video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="media-modal-caption">
              <h4>{selectedVideo.title}</h4>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <section className="media-section">
        <h2>Photo Gallery</h2>
        <p className="media-section-desc">
          Snapshots from community engagements, public talks and field work.
        </p>
        <div className="media-gallery-grid">
          {galleryImages.length === 0 ? (
            <div style={{ color: '#c00', fontWeight: 'bold', padding: '2rem', textAlign: 'center' }}>
              No gallery images found. Please check your src/assets/gallery folder and Vite config.
            </div>
          ) : (
            galleryImages.slice(0, visibleCount).map((img, idx) => (
              <div
                className="media-gallery-thumb"
                key={img.id}
                tabIndex={0}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => (e.key === "Enter" ? openLightbox(idx) : null)}
                aria-label={`View photo: ${img.caption}`}
              >
                <img src={img.src} alt={img.alt} />
                <span className="media-gallery-caption">{img.caption}</span>
              </div>
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

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="media-modal" role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="media-modal-content media-lightbox-content">
            <button className="media-modal-close" onClick={closeLightbox} aria-label="Close photo">&times;</button>
            <div className="media-lightbox-image">
              <img
                src={galleryImages[selectedImageIndex].src}
                alt={galleryImages[selectedImageIndex].alt}
              />
              <span className="media-gallery-caption">
                {galleryImages[selectedImageIndex].caption}
              </span>
            </div>
            <div className="media-lightbox-nav">
              <button
                onClick={showPrevImage}
                disabled={selectedImageIndex === 0}
                aria-label="Previous photo"
              >
                &#8592;
              </button>
              <button
                onClick={showNextImage}
                disabled={selectedImageIndex >= visibleCount - 1}
                aria-label="Next photo"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MediaPage;
