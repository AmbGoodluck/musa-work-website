// AboutPage.jsx
// Dedicated About page for Musa Ansumana Soko with a horizontal image slider
import React, { useRef } from "react";
import "./AboutPage.css";

// Use local images from gallery for scalability
const sliderImages = Object.entries(import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,gif}', { eager: true, as: 'url' }))
  .map(([path, url], idx) => ({
    url,
    caption: `Moment ${idx + 1}`
  }));

export default function AboutPage() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.querySelector(".about-slider-card");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24;
    slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="aboutpage-bg">
      <div className="aboutpage-container">
        <h1 className="aboutpage-heading">About Musa Ansumana Soko</h1>
        <div className="aboutpage-text">
          <p>
            Musa Ansumana Soko is a leading advocate and development professional based in Freetown, Sierra Leone. With a steadfast commitment to social justice and community empowerment, Musa’s work centers on creating lasting change for marginalized groups across the country. His vision is rooted in building resilient communities, advancing human rights, and ensuring that every voice is heard.
          </p>
          <p>
            Musa’s activism is shaped by his dedication to tackling gender-based and domestic violence, championing water, sanitation, and hygiene (WaSH) initiatives, and empowering youth and women. Through his leadership, he has raised awareness about the impact of domestic violence, trained community leaders in conflict resolution, and worked to integrate these critical issues into education and policy. Musa is especially passionate about expanding opportunities for women, helping them achieve greater independence and economic freedom.
          </p>
          <p>
            Over the years, Musa has held pivotal roles including Executive Coordinator of the Youth Partnership for Peace and Development (YPPD), Team Lead of the Water, Sanitation and Hygiene Network of Sierra Leone (WaSH-Net), and National Contact Point for the Global Call to Action Against Poverty (GCAP). His journey has also taken him to international platforms as a Youth Adviser at UN-Habitat and as an Exchange Fellow at the Shelter for Abused Women and Children in Florida. Musa’s experience spans campaign strategy, program management, and advocacy for people with disabilities, always with a focus on those most in need.
          </p>
          <p>
            Recognized as an outstanding youth activist and goodwill ambassador for children, Musa is driven by a belief in dignity, solidarity, and the power of collective action. He is fluent in Mende, English, and Krio, and is known for his strong project coordination skills and unwavering dedication to building a more just and inclusive Sierra Leone.
          </p>
        </div>
        <div className="aboutpage-divider" />
        <h2 className="aboutpage-slider-heading">Moments from the Journey</h2>
        <div className="about-slider-wrapper">
          <button
            className="about-slider-arrow left"
            aria-label="Scroll left"
            onClick={() => scrollSlider(-1)}
          >
            &#8592;
          </button>
          <div className="about-slider" ref={sliderRef}>
            {sliderImages.map((img, idx) => (
              <div className="about-slider-card" key={idx}>
                <img src={img.url} alt={img.caption} className="about-slider-img" />
                <div className="about-slider-caption">{img.caption}</div>
              </div>
            ))}
          </div>
          <button
            className="about-slider-arrow right"
            aria-label="Scroll right"
            onClick={() => scrollSlider(1)}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}
