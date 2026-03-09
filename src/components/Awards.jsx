import React from "react";

const awards = [
  {
    title: "Giraffe Heroes Project Recognition",
    org: "Giraffe Heroes Project",
    desc: "Honored for courageous and selfless service to community and country.",
    icon: "🏅",
  },
  {
    title: "Humanitarian Leadership Award",
    org: "African Civic Forum",
    desc: "Recognized for outstanding leadership in humanitarian and civic initiatives.",
    icon: "🏆",
  },
  {
    title: "Peacebuilder of the Year",
    org: "Sierra Leone Peace Foundation",
    desc: "Awarded for exceptional contributions to peace and reconciliation.",
    icon: "🥇",
  },
];

function Awards() {
  return (
    <div className="awards">
      <h2>Awards & Recognition</h2>
      <div className="awards__grid">
        {awards.map((award, idx) => (
          <div className="awards__card" key={idx}>
            <div className="awards__icon">{award.icon}</div>
            <div>
              <h3>{award.title}</h3>
              <div className="awards__org">{award.org}</div>
              <p>{award.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Awards;
