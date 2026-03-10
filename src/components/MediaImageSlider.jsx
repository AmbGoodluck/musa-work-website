import React, { useRef } from "react";
import "../styles/global.css";

// Import all images from gallery folder
const images = Object.values(import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,gif}', { eager: true, as: 'url' }));

const MediaImageSlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="media-slider-container">
      <button className="media-slider-btn left" onClick={() => scroll('left')} aria-label="Scroll left">&#8592;</button>
      <div className="media-slider-row" ref={scrollRef}>
        {images.map((img, idx) => (
          <div className="media-slider-img-wrapper" key={idx}>
            <img src={img} alt={`Media ${idx + 1}`} className="media-slider-img" loading="lazy" />
          </div>
        ))}
      </div>
      <button className="media-slider-btn right" onClick={() => scroll('right')} aria-label="Scroll right">&#8594;</button>
    </div>
  );
};

export default MediaImageSlider;
