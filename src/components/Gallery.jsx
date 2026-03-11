import { Link } from "react-router-dom";
import "../styles/global.css";

const images = Array.from({ length: 19 }, (_, i) =>
  `/images/gallery/photo-${String(i + 1).padStart(2, "0")}.jpg`
);

// Duplicate for seamless infinite scroll
const track = [...images, ...images];

const Gallery = () => (
  <section className="gallery-section" id="gallery">
    <div className="gallery-strip-header">
      <h2 className="section-title">Gallery</h2>
      <Link to="/media" className="gallery-viewmore">View full gallery →</Link>
    </div>
    <div className="gallery-strip-outer" aria-label="Photo gallery">
      <div className="gallery-strip-track">
        {track.map((src, idx) => (
          <div className="gallery-strip-item" key={idx} aria-hidden={idx >= images.length}>
            <img src={src} alt={`Musa Ansumana Soko — photo ${(idx % images.length) + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
