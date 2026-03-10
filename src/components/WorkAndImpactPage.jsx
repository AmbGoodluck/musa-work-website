import React from "react";
import "./WorkAndImpactPage.css";

const projects = [
  {
    title: "Scaling Community WaSH Committees in Rural Sierra Leone",
    location: "Kailahun, Kono & Kenema, 2021–2023",
    summary: "Led the expansion of community-based water, sanitation, and hygiene committees across three rural districts. Coordinated local leaders, trained facilitators, and improved access to safe water for 50+ villages. Resulted in measurable improvements in hygiene practices and reduced waterborne disease.",
    link: "/projects/wash-committees"
  },
  {
    title: "Faith-Based Approaches to Domestic Violence Prevention",
    location: "Freetown & Bo, 2019–2022",
    summary: "Partnered with faith leaders and women’s groups to design culturally sensitive domestic violence prevention programs. Developed training materials, facilitated workshops, and supported survivor-centered outreach. Contributed to increased reporting and community dialogue.",
    link: "/projects/faith-domestic-violence"
  },
  {
    title: "Youth-Led Peace Circles in Post-Conflict Communities",
    location: "Makeni & Koidu, 2018–2020",
    summary: "Founded and mentored youth peace circles to foster reconciliation and civic engagement in post-conflict areas. Guided youth leaders in dialogue facilitation, conflict resolution, and advocacy. Helped reduce local tensions and build trust between youth and authorities.",
    link: "/projects/youth-peace-circles"
  }
];

const methods = [
  {
    title: "Listen",
    desc: "Engage communities and stakeholders to understand needs, context, and lived experience."
  },
  {
    title: "Co-Design",
    desc: "Collaborate with partners and beneficiaries to design solutions that fit local realities."
  },
  {
    title: "Mobilize",
    desc: "Coordinate multi-stakeholder action: government, CSOs, youth, faith leaders, for collective impact."
  },
  {
    title: "Influence Policy",
    desc: "Advocate for evidence-based policy change and scale up successful models."
  }
];

const sectors = [
  "Water, Sanitation & Hygiene",
  "Gender & GBV",
  "Peacebuilding & Governance",
  "Youth & Education",
  "Disability & Inclusive ICT"
];
const stakeholders = [
  "Governments & Ministries",
  "UN agencies & multilaterals",
  "International and local NGOs",
  "Faith-based organizations",
  "Youth networks and community-based groups"
];

const impact = [
  { label: "Communities engaged in WaSH & governance", value: "50+" },
  { label: "Community leaders trained on domestic violence", value: "120+" },
  { label: "Youth reached through peacebuilding", value: "2,000+" }
];

const services = [
  {
    title: "Speaking & Facilitation",
    desc: "Panels, workshops, retreats, and events on peacebuilding, WaSH, and social justice."
  },
  {
    title: "Advisory & Consulting",
    desc: "Program design, strategy, and policy advocacy for NGOs, agencies, and networks."
  },
  {
    title: "Partnership & Co-Implementation",
    desc: "Joint projects, pilots, and mentoring for youth and community organizations."
  }
];

export default function WorkAndImpactPage() {
  return (
    <div className="work-impact-page">
      <div className="work-impact-container">
        <h1 className="work-impact-title">Work & Impact</h1>

        {/* 1. Featured Projects */}
        <section className="work-impact-section">
          <h2>Featured Projects & Case Studies</h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className="project-card" key={i}>
                <h3>{p.title}</h3>
                <div className="project-meta">{p.location}</div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Methods & Approach */}
        <section className="work-impact-section">
          <h2>Methods & Approach</h2>
          <div className="methods-row">
            {methods.map((m, i) => (
              <div className="method-step" key={i}>
                <div className="method-title">{m.title}</div>
                <div className="method-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Sectors & Stakeholders */}
        <section className="work-impact-section">
          <h2>Who I Work With</h2>
          <div className="sectors-stakeholders">
            <div>
              <h3>Sectors</h3>
              <ul>{sectors.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div>
              <h3>Stakeholders</h3>
              <ul>{stakeholders.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* 4. Impact Snapshot */}
        <section className="work-impact-section">
          <h2>Impact Snapshot</h2>
          <div className="impact-row">
            {impact.map((item, i) => (
              <div className="impact-card" key={i}>
                <div className="impact-value">{item.value}</div>
                <div className="impact-label">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Collaboration & Services */}
        <section className="work-impact-section">
          <h2>Collaboration & Services</h2>
          <div className="services-row">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <p>
              Interested in partnering, learning more, or discussing a project? <br />
              <b>UN agencies, INGOs, foundations, and networks</b> are welcome to connect. <br />
              <b>Youth and community organizations</b> are invited to reach out for mentorship or joint initiatives.
            </p>
            <a className="cta-btn" href="/contact">Discuss a partnership</a>
          </div>
        </section>
      </div>
    </div>
  );
}
