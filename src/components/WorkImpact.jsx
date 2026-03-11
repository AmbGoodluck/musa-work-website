import { Link } from "react-router-dom";

const workItems = [
  {
    title: "Peacebuilding & Youth Leadership",
    desc: "Programs on conflict resolution, reconciliation, and empowering young leaders to build a peaceful future.",
    icon: "🕊️",
    to: "/work-and-impact#projects",
  },
  {
    title: "Governance & Accountability",
    desc: "Campaigns for transparency, civic participation, and open governance to strengthen democracy.",
    icon: "⚖️",
    to: "/work-and-impact#sectors",
  },
  {
    title: "Water, Sanitation and Hygiene (WASH)",
    desc: "Initiatives to improve access to safe water, sanitation, and hygiene for healthier communities.",
    icon: "💧",
    to: "/work-and-impact#projects",
  },
  {
    title: "Gender Equality & Women's Rights",
    desc: "Projects addressing gender-based violence and advancing women's empowerment and leadership.",
    icon: "♀️",
    to: "/work-and-impact#projects",
  },
];

function WorkImpact() {
  return (
    <div className="work-impact">
      <h2>Work & Impact</h2>
      <div className="work-impact__grid">
        {workItems.map((item) => (
          <Link className="work-impact__card" key={item.title} to={item.to}>
            <div className="work-impact__icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="work-impact__card-cta">Learn more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkImpact;
