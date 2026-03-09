import React from "react";

function Hero({ scrollToContact, scrollToWork }) {
  return (
    <div className="hero">
      <div className="hero__content">
        <h1>Musa Ansumana Soko</h1>
        <h2>
          Award-winning activist, peacebuilder, and development advocate from Sierra Leone.
        </h2>
        <p>
          Musa works at the intersection of peacebuilding, governance, health systems, youth empowerment, gender justice, and access to water and sanitation. With a passion for community-driven change, he has dedicated his career to advancing dignity, equity, and opportunity for all.
        </p>
        <div className="hero__buttons">
          <button className="btn btn--primary" onClick={scrollToContact}>
            Invite Musa to speak
          </button>
          <button className="btn btn--secondary" onClick={scrollToWork}>
            Explore his work
          </button>
        </div>
      </div>
      <div className="hero__image">
        {/* Replace the URL below with a real portrait if available */}
        <div className="hero__portrait-placeholder" aria-label="Portrait of Musa Ansumana Soko">
          {/* Drop portrait image here: src/assets/portrait.jpg */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
