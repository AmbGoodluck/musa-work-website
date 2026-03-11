// WorkAndImpactPage.jsx — redesigned layout; all content text preserved exactly
import "./WorkAndImpactPage.css";
import { useStaggeredFade } from "../hooks/useScrollFade";

const projects = [
  {
    title: "Scaling Community WaSH Committees in Rural Sierra Leone",
    location: "Kailahun, Kono & Kenema, 2021–2023",
    summary: "Led the expansion of community-based water, sanitation, and hygiene committees across three rural districts. Coordinated local leaders, trained facilitators, and improved access to safe water for 50+ villages. Resulted in measurable improvements in hygiene practices and reduced waterborne disease.",
    icon: "💧",
  },
  {
    title: "Faith-Based Approaches to Domestic Violence Prevention",
    location: "Freetown & Bo, 2019–2022",
    summary: "Partnered with faith leaders and women's groups to design culturally sensitive domestic violence prevention programs. Developed training materials, facilitated workshops, and supported survivor-centered outreach. Contributed to increased reporting and community dialogue.",
    icon: "🤝",
  },
  {
    title: "Youth-Led Peace Circles in Post-Conflict Communities",
    location: "Makeni & Koidu, 2018–2020",
    summary: "Founded and mentored youth peace circles to foster reconciliation and civic engagement in post-conflict areas. Guided youth leaders in dialogue facilitation, conflict resolution, and advocacy. Helped reduce local tensions and build trust between youth and authorities.",
    icon: "☮️",
  },
];

const methods = [
  {
    title: "Listen",
    desc: "Engage communities and stakeholders to understand needs, context, and lived experience.",
    icon: "👂",
  },
  {
    title: "Co-Design",
    desc: "Collaborate with partners and beneficiaries to design solutions that fit local realities.",
    icon: "✏️",
  },
  {
    title: "Mobilize",
    desc: "Coordinate multi-stakeholder action: government, CSOs, youth, faith leaders, for collective impact.",
    icon: "🌐",
  },
  {
    title: "Influence Policy",
    desc: "Advocate for evidence-based policy change and scale up successful models.",
    icon: "📋",
  },
];

const sectors = [
  "Water, Sanitation & Hygiene",
  "Gender & GBV",
  "Peacebuilding & Governance",
  "Youth & Education",
  "Disability & Inclusive ICT",
];
const stakeholders = [
  "Governments & Ministries",
  "UN agencies & multilaterals",
  "International and local NGOs",
  "Faith-based organizations",
  "Youth networks and community-based groups",
];

const impact = [
  { label: "Communities engaged in WaSH & governance", value: "50+" },
  { label: "Community leaders trained on domestic violence", value: "120+" },
  { label: "Youth reached through peacebuilding", value: "2,000+" },
];

const services = [
  {
    title: "Speaking & Facilitation",
    desc: "Panels, workshops, retreats, and events on peacebuilding, WaSH, and social justice.",
    icon: "🎤",
  },
  {
    title: "Advisory & Consulting",
    desc: "Program design, strategy, and policy advocacy for NGOs, agencies, and networks.",
    icon: "💡",
  },
  {
    title: "Partnership & Co-Implementation",
    desc: "Joint projects, pilots, and mentoring for youth and community organizations.",
    icon: "🔗",
  },
];

export default function WorkAndImpactPage() {
  const impactRef   = useStaggeredFade();
  const projectsRef = useStaggeredFade();
  const methodsRef  = useStaggeredFade();

  return (
    <div className="wip-page">

      {/* ── Page header band ──────────────────────────────────── */}
      <div className="wip-header-band">
        <div className="wip-header-inner">
          <span className="wip-eyebrow">Portfolio</span>
          <h1 className="wip-title">Work &amp; Impact</h1>
          <p className="wip-subtitle">
            Two decades of community-driven change across Sierra Leone and beyond.
          </p>
        </div>
      </div>

      {/* ── Impact snapshot ───────────────────────────────────── */}
      <div className="wip-impact-band">
        <div className="wip-container">
          <div className="impact-row" ref={impactRef}>
            {impact.map((item) => (
              <div className="impact-card fade-up" key={item.value}>
                <div className="impact-value">{item.value}</div>
                <div className="impact-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wip-container">

        {/* ── Featured projects ─────────────────────────────────── */}
        <section className="wip-section" id="projects">
          <div className="wip-section-header">
            <span className="wip-section-label">Case Studies</span>
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-grid" ref={projectsRef}>
            {projects.map((p) => (
              <div className="project-card fade-up" key={p.title}>
                <div className="project-card-icon" aria-hidden="true">{p.icon}</div>
                <h3>{p.title}</h3>
                <div className="project-meta">{p.location}</div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="wip-divider" />

        {/* ── Methods & approach ────────────────────────────────── */}
        <section className="wip-section" id="methods">
          <div className="wip-section-header">
            <span className="wip-section-label">How I Work</span>
            <h2>Methods &amp; Approach</h2>
          </div>
          <div className="methods-row" ref={methodsRef}>
            {methods.map((m, i) => (
              <div className="method-step fade-up" key={m.title}>
                <div className="method-step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <div className="method-icon" aria-hidden="true">{m.icon}</div>
                <div className="method-title">{m.title}</div>
                <div className="method-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="wip-divider" />

        {/* ── Sectors & stakeholders ────────────────────────────── */}
        <section className="wip-section" id="sectors">
          <div className="wip-section-header">
            <span className="wip-section-label">Partnerships</span>
            <h2>Who I Work With</h2>
          </div>
          <div className="sectors-stakeholders">
            <div className="sectors-col">
              <h3>Sectors</h3>
              <ul>
                {sectors.map((s) => (
                  <li key={s}><span className="ss-dot" aria-hidden="true" />{s}</li>
                ))}
              </ul>
            </div>
            <div className="sectors-col">
              <h3>Stakeholders</h3>
              <ul>
                {stakeholders.map((s) => (
                  <li key={s}><span className="ss-dot" aria-hidden="true" />{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="wip-divider" />

        {/* ── Collaboration & services ──────────────────────────── */}
        <section className="wip-section" id="services">
          <div className="wip-section-header">
            <span className="wip-section-label">Collaborate</span>
            <h2>Collaboration &amp; Services</h2>
          </div>
          <div className="services-row">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <p>
              Interested in partnering, learning more, or discussing a project?<br />
              <b>UN agencies, INGOs, foundations, and networks</b> are welcome to connect.<br />
              <b>Youth and community organizations</b> are invited to reach out for mentorship or joint initiatives.
            </p>
            <a className="cta-btn btn btn--secondary" href="/contact">Discuss a partnership</a>
          </div>
        </section>

      </div>
    </div>
  );
}
