import React from "react";

function About() {
  return (
    <div className="about">
      <div className="about__visual">
        {/* Drop about/secondary image here: src/assets/about.jpg */}
        <div className="about__image-placeholder" aria-label="About visual"></div>
      </div>
      <div className="about__text">
        <h2>About Musa</h2>
        <p>
          With over 15 years of experience, Musa Ansumana Soko has championed the rights of marginalized communities in Sierra Leone and beyond. In the aftermath of the civil war, he dedicated himself to rebuilding hope and opportunity, focusing on peacebuilding, youth empowerment, and social justice.
        </p>
        <p>
          Musa is the founder of <strong>Youth Partnership for Peace and Development (YPPD)</strong> and leads the <strong>Water, Sanitation and Hygiene Network (WASH-Net)</strong> in Sierra Leone.
        </p>
        <ul className="about__values">
          <li>Integrity</li>
          <li>Solidarity</li>
          <li>Social Justice</li>
          <li>Community-Driven Change</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
