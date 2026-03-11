// LeadershipPage.jsx — timeline + cards hybrid; all content text preserved exactly
import "./LeadershipPage.css";
import { useScrollFade, useStaggeredFade } from "../hooks/useScrollFade";

const leadershipRoles = [
  {
    title: "Team Lead, WaSH‑Net Sierra Leone",
    org: "WaSH‑Net",
    period: "2018–Present",
    level: "National",
    desc: "Leads Sierra Leone's foremost civil society platform on water, sanitation, and hygiene. Coordinates national, district, and regional stakeholders to drive policy reform, secure budget commitments, and ensure marginalized communities have a voice in sector planning and delivery.",
  },
  {
    title: "Executive Coordinator, Youth Partnership for Peace and Development (YPPD)",
    org: "YPPD",
    period: "2012–2018",
    level: "National / Regional",
    desc: "Heads administration, legal representation, and strategy for a leading youth‑led organization. Oversees peacebuilding, gender‑based violence prevention, and development programs, empowering young people and women to lead change in post‑conflict Sierra Leone.",
  },
  {
    title: "National Contact Point, Global Call to Action Against Poverty (GCAP)",
    org: "GCAP",
    period: "2014–2019",
    level: "National / Global",
    desc: "Represents Sierra Leone in global anti‑poverty campaigns. Leads national advocacy on the SDGs, poverty, and inequality, engaging with media, policymakers, and international partners to advance social justice and accountability.",
  },
  {
    title: "Leadership, Civil Society Platform for Peacebuilding and Statebuilding (CSPPS)",
    org: "CSPPS",
    period: "2016–2020",
    level: "Regional / Global",
    desc: "Holds leadership roles in a global civil society platform focused on peacebuilding, statebuilding, and SDG16. Represents Sierra Leonean civil society in regional and international policy forums, shaping strategies for inclusive governance and conflict prevention.",
  },
  {
    title: "Youth Adviser, UN‑Habitat (Past)",
    org: "UN‑Habitat",
    period: "2020–2022",
    level: "Africa‑wide",
    desc: "Served as a youth adviser on urban policy, advising UN‑Habitat on youth engagement across Africa. Contributed to policy development, advocacy, and the design of youth‑centered urban initiatives.",
  },
];

const boards = [
  "Civil Society Platform for Peacebuilding and Statebuilding (CSPPS) – executive and advisory roles on SDG16 and peacebuilding.",
  "Global Call to Action Against Poverty (GCAP) – national representation in global anti‑poverty campaigns.",
  "UN‑Habitat youth structures – advisory role on urban youth engagement (Africa‑wide).",
  "National and regional working groups on WaSH, governance, and inclusive development.",
];

export default function LeadershipPage() {
  const overviewRef = useScrollFade();
  const timelineRef = useStaggeredFade();
  const philRef     = useScrollFade();
  const boardsRef   = useScrollFade();

  return (
    <div className="lp-page">

      {/* ── Header band ──────────────────────────────────────── */}
      <div className="lp-header-band">
        <div className="lp-header-inner">
          <span className="lp-eyebrow">Leadership</span>
          <h1 className="lp-title">Leadership &amp; Governance</h1>
        </div>
      </div>

      <div className="lp-container">

        {/* ── Overview ─────────────────────────────────────────── */}
        <div className="lp-overview fade-up" ref={overviewRef}>
          <p>
            Musa Ansumana Soko is a national and global leader whose work bridges grassroots realities and international policy. As Team Lead of WaSH‑Net Sierra Leone and Executive Coordinator of YPPD, he leads national platforms advancing water, sanitation, peacebuilding, and youth empowerment. Musa's leadership spans civil society, government, and multilateral spaces, connecting local voices to global campaigns on governance, rights, and social justice.
          </p>
        </div>

        {/* ── Timeline / Roles ─────────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-section-header">
            <span className="lp-section-label">Roles</span>
            <h2>Leadership Roles</h2>
          </div>

          <div className="lp-timeline" ref={timelineRef}>
            {leadershipRoles.map((role, idx) => (
              <div className="lp-timeline-item fade-up" key={idx}>
                {/* Left — period + org badge */}
                <div className="lp-timeline-meta">
                  <span className="lp-timeline-period">{role.period}</span>
                  <span className="lp-timeline-org">{role.org}</span>
                  <span className="lp-timeline-level">{role.level}</span>
                </div>

                {/* Centre — dot + line */}
                <div className="lp-timeline-spine" aria-hidden="true">
                  <div className="lp-timeline-dot" />
                  {idx < leadershipRoles.length - 1 && <div className="lp-timeline-line" />}
                </div>

                {/* Right — card */}
                <div className="lp-role-card">
                  <h3 className="lp-role-title">{role.title}</h3>
                  <p className="lp-role-desc">{role.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Philosophy callout ───────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-section-header">
            <span className="lp-section-label">Philosophy</span>
            <h2>Leadership Philosophy</h2>
          </div>
          <div className="lp-philosophy fade-up" ref={philRef}>
            <span className="lp-philosophy-quote" aria-hidden="true">"</span>
            <p>
              Musa's approach to leadership is participatory, evidence-informed, and grounded in the lived experience of communities. He believes in building legitimacy from the grassroots up, while engaging confidently in international policy spaces. His leadership is defined by a commitment to accountability, dignity, and the elevation of marginalized voices, especially women, youth, and people with disabilities. Musa's work is driven by the conviction that sustainable change comes from collaboration, strategic vision, and a relentless focus on social justice.
            </p>
          </div>
        </section>

        {/* ── Boards & advisory ────────────────────────────────── */}
        <section className="lp-section">
          <div className="lp-section-header">
            <span className="lp-section-label">Advisory</span>
            <h2>Boards, Committees &amp; Advisory Roles</h2>
          </div>
          <ul className="lp-boards-list fade-up" ref={boardsRef}>
            {boards.map((item, idx) => (
              <li key={idx}>
                <span className="lp-boards-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
