import React from "react";

const workItems = [
  {
    title: "Peacebuilding & Youth Leadership",
    desc: "Programs on conflict resolution, reconciliation, and empowering young leaders to build a peaceful future.",
    icon: "🕊️",
  },
  {
    title: "Governance & Accountability",
    desc: "Campaigns for transparency, civic participation, and open governance to strengthen democracy.",
    icon: "⚖️",
  },
  {
    title: "Water, Sanitation and Hygiene (WASH)",
    desc: "Initiatives to improve access to safe water, sanitation, and hygiene for healthier communities.",
    icon: "💧",
  },
  {
    title: "Gender Equality & Women’s Rights",
    desc: "Projects addressing gender-based violence and advancing women’s empowerment and leadership.",
    icon: "♀️",
  },
];

function WorkImpact() {
  return (
    <div className="work-impact">
      <h2>Work & Impact</h2>
      <div className="work-impact__grid">
        {workItems.map((item) => (
          <div className="work-impact__card" key={item.title}>
            <div className="work-impact__icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkImpact;
