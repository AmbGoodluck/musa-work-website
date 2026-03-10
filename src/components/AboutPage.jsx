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
        {/* Professional Journey & Contributions Section */}
        <section className="aboutpage-journey-section">
          <div className="aboutpage-journey-layout">
            <div className="aboutpage-journey-main">
              <div className="aboutpage-journey-heading">
                <span className="aboutpage-journey-bar" />
                <h2>Professional Journey & Contributions</h2>
              </div>
              <div className="aboutpage-journey-text">
                <p>
                  Musa Ansumana Soko’s professional journey brings together grassroots organizing, policy advocacy and international engagement across more than two decades of public‑interest work in Sierra Leone and beyond. As <span className="aboutpage-role">Team Lead of the Water, Sanitation and Hygiene Network of Sierra Leone (WaSH‑Net)</span> and <span className="aboutpage-role">Executive Coordinator of the Youth Partnership for Peace and Development (YPPD)</span>, he has helped shape national conversations on access to safe water, domestic and gender‑based violence, youth leadership and inclusive governance. His roles as <span className="aboutpage-role">National Contact Point for the Global Call to Action Against Poverty</span> and former <span className="aboutpage-role">Youth Adviser to UN‑Habitat</span> reflect a career that connects local realities to regional and global policy spaces.
                </p>
                <p>
                  Through WaSH‑Net, Musa has led efforts to build multi‑stakeholder platforms at national, district and regional levels that bring together government ministries, civil society organizations and communities around water, sanitation and hygiene. He has contributed to advocacy for stronger budget allocations to the WaSH sector, promoted practical policy options that reflect the demands of marginalized communities, and supported initiatives that increase access to potable water, improved sanitation facilities and positive hygiene practices, particularly for poor and vulnerable households.
                </p>
                <p>
                  His long‑standing engagement with the Youth Partnership for Peace and Development has focused on challenging gender‑based and domestic violence and widening opportunities for women and young people. As Executive Coordinator, Musa has overseen programs that raise community awareness about domestic violence, train community and faith leaders in conflict resolution and mitigation, and integrate discussions of domestic and gender‑based violence into education and community dialogue. He has also championed the expansion of livelihoods and skills programmes for women as a pathway to greater independence, economic freedom and long‑term resilience.
                </p>
                <p>
                  Beyond these roles, Musa’s experience includes designing domestic‑violence intervention models as a fellow at the Shelter for Abused Women and Children in Florida, advising peacebuilding research for The Australian National University, and pioneering ICT training and Braille book projects for blind and visually impaired learners in Sierra Leone. These contributions underline his commitment to inclusive development, whether by improving services for communities without safe water, creating safer environments for women and girls, or opening access to education and technology for people with disabilities. In every setting, he brings a strategic, evidence‑informed approach that links local lived experience with policy change and long‑term social impact.
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
