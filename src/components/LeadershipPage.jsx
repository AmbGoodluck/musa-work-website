import React from "react";
import "./LeadershipPage.css";

const leadershipRoles = [
  {
    title: "Team Lead, WaSH‑Net Sierra Leone",
    org: "WaSH‑Net",
    level: "National",
    desc: "Leads Sierra Leone’s foremost civil society platform on water, sanitation, and hygiene. Coordinates national, district, and regional stakeholders to drive policy reform, secure budget commitments, and ensure marginalized communities have a voice in sector planning and delivery."
  },
  {
    title: "Executive Coordinator, Youth Partnership for Peace and Development (YPPD)",
    org: "YPPD",
    level: "National/Regional",
    desc: "Heads administration, legal representation, and strategy for a leading youth‑led organization. Oversees peacebuilding, gender‑based violence prevention, and development programs, empowering young people and women to lead change in post‑conflict Sierra Leone."
  },
  {
    title: "National Contact Point, Global Call to Action Against Poverty (GCAP)",
    org: "GCAP",
    level: "National/Global",
    desc: "Represents Sierra Leone in global anti‑poverty campaigns. Leads national advocacy on the SDGs, poverty, and inequality, engaging with media, policymakers, and international partners to advance social justice and accountability."
  },
  {
    title: "Leadership, Civil Society Platform for Peacebuilding and Statebuilding (CSPPS)",
    org: "CSPPS",
    level: "Regional/Global",
    desc: "Holds leadership roles in a global civil society platform focused on peacebuilding, statebuilding, and SDG16. Represents Sierra Leonean civil society in regional and international policy forums, shaping strategies for inclusive governance and conflict prevention."
  },
  {
    title: "Youth Adviser, UN‑Habitat (Past)",
    org: "UN‑Habitat",
    level: "Africa‑wide",
    desc: "Served as a youth adviser on urban policy, advising UN‑Habitat on youth engagement across Africa. Contributed to policy development, advocacy, and the design of youth‑centered urban initiatives."
  }
];

const boards = [
  "Civil Society Platform for Peacebuilding and Statebuilding (CSPPS) – executive and advisory roles on SDG16 and peacebuilding.",
  "Global Call to Action Against Poverty (GCAP) – national representation in global anti‑poverty campaigns.",
  "UN‑Habitat youth structures – advisory role on urban youth engagement (Africa‑wide).",
  "National and regional working groups on WaSH, governance, and inclusive development."
];

export default function LeadershipPage() {
  return (
    <main className="leadership-main">
      <div className="leadership-container">
        {/* Hero */}
        <section className="leadership-hero">
          <h1 className="leadership-title">Leadership & Governance</h1>
          <p className="leadership-overview">
            Musa Ansumana Soko is a national and global leader whose work bridges grassroots realities and international policy. As Team Lead of WaSH‑Net Sierra Leone and Executive Coordinator of YPPD, he leads national platforms advancing water, sanitation, peacebuilding, and youth empowerment. Musa’s leadership spans civil society, government, and multilateral spaces, connecting local voices to global campaigns on governance, rights, and social justice.
          </p>
        </section>

        {/* Leadership Roles Grid */}
        <section className="leadership-roles-section">
          <h2 className="leadership-section-heading">Leadership Roles</h2>
          <div className="leadership-roles-grid">
            {leadershipRoles.map((role, idx) => (
              <div className="leadership-role-card" key={idx}>
                <div className="leadership-role-title">{role.title}</div>
                <div className="leadership-role-meta">
                  <span className="leadership-role-org">{role.org}</span>
                  <span className="leadership-role-dot">•</span>
                  <span className="leadership-role-level">{role.level}</span>
                </div>
                <div className="leadership-role-desc">{role.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Philosophy */}
        <section className="leadership-philosophy-section">
          <h2 className="leadership-section-heading">Leadership Philosophy</h2>
          <div className="leadership-philosophy-text">
            Musa’s approach to leadership is participatory, evidence-informed, and grounded in the lived experience of communities. He believes in building legitimacy from the grassroots up, while engaging confidently in international policy spaces. His leadership is defined by a commitment to accountability, dignity, and the elevation of marginalized voices, especially women, youth, and people with disabilities. Musa’s work is driven by the conviction that sustainable change comes from collaboration, strategic vision, and a relentless focus on social justice.
          </div>
        </section>

        {/* Boards, Committees & Advisory Roles */}
        <section className="leadership-boards-section">
          <h2 className="leadership-section-heading">Boards, Committees & Advisory Roles</h2>
          <ul className="leadership-boards-list">
            {boards.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
