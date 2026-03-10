import React from "react";
import MediaImageSlider from "./MediaImageSlider";

function MediaSpeaking() {
  return (
    <div className="media-speaking">
      <h2>Media & Speaking</h2>
      <div className="media-speaking__content">
        <div className="media-speaking__video">
          {/* Replace src with real YouTube embed if available */}
          <iframe
            title="Civic Compass with Musa Ansumana Soko"
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="media-speaking__list">
          <ul>
            <li>UN and regional forums on peacebuilding, SDG16, and governance</li>
            <li>Panels on youth leadership and post-conflict reconstruction</li>
            <li>National media interviews on WASH, accountability, and gender justice</li>
          </ul>
          <div className="media-speaking__cta">
            For speaking invitations, please use the contact form below.
          </div>
        </div>
      </div>
      {/* Modern, scalable image slider below */}
      <MediaImageSlider />
    </div>
  );
}

export default MediaSpeaking;
