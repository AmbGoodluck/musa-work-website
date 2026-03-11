import { useState } from "react";
import { Link } from "react-router-dom";

const videos = [
  {
    id: "tkrUpPME4I8",
    title: "Civic Compass: Youth Voices in Governance",
    desc: "Youth leaders on public service and civic participation.",
  },
  {
    id: "NXnAlXG9Bxg",
    title: "Civic Compass: Water & Sanitation Dialogues",
    desc: "Discussing WaSH access and community-level impact.",
  },
  {
    id: "jHG2IGN7wUI",
    title: "Civic Compass: Peacebuilding in Sierra Leone",
    desc: "Peacebuilding strategies, stories, and the road ahead.",
  },
];

// Gallery photos from public/images/gallery/
const galleryPhotos = Array.from({ length: 19 }, (_, i) =>
  `/images/gallery/photo-${String(i + 1).padStart(2, "0")}.jpg`
);

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div className="ms-video-card">
      {playing ? (
        <div className="ms-video-embed">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button className="ms-video-thumb-btn" onClick={() => setPlaying(true)} aria-label={`Play: ${video.title}`}>
          <img src={thumb} alt={video.title} className="ms-video-thumb" />
          <span className="ms-video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </button>
      )}
      <div className="ms-video-info">
        <h4>{video.title}</h4>
        <p>{video.desc}</p>
      </div>
    </div>
  );
}

function MediaSpeaking() {
  return (
    <div className="media-speaking">
      <h2>Media &amp; Speaking</h2>

      {/* ── Video grid ──────────────────────────────────────── */}
      <div className="ms-videos-grid">
        {videos.map((v) => <VideoCard key={v.id} video={v} />)}
      </div>

      {/* ── Speaking topics ──────────────────────────────────── */}
      <div className="ms-topics">
        <ul>
          <li>UN and regional forums on peacebuilding, SDG16, and governance</li>
          <li>Panels on youth leadership and post-conflict reconstruction</li>
          <li>National media interviews on WASH, accountability, and gender justice</li>
        </ul>
        <div className="media-speaking__cta">
          For speaking invitations, please use the contact form below.
        </div>
      </div>

      {/* ── Gallery preview ──────────────────────────────────── */}
      <div className="ms-gallery-section">
        <div className="ms-gallery-heading">
          <span className="ms-gallery-label">Gallery</span>
          <Link to="/media" className="ms-gallery-viewmore">View full gallery →</Link>
        </div>
        <div className="ms-gallery-grid">
          {galleryPhotos.slice(0, 8).map((src, idx) => (
            <div key={idx} className="ms-gallery-thumb">
              <img src={src} alt={`Musa Ansumana Soko — photo ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaSpeaking;
