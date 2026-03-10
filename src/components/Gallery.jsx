import React from "react";
import "../styles/global.css";


// Vite: Import all images from gallery folder
const images = Object.values(import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,gif}', { eager: true, as: 'url' }));

const Gallery = () => (
  <section className="gallery-section" id="gallery">
    <div className="container">
      <h2 className="section-title">Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div className="gallery-card" key={idx}>
            <img src={img} alt={`Musa Ansumana Soko ${idx + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
