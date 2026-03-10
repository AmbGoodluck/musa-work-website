import React from "react";
import "./WorkSection.css";

const workPillars = [
  {
    title: "Water, Sanitation & Hygiene (WaSH)",
    description:
      "Musa leads the Water, Sanitation and Hygiene Network of Sierra Leone (WaSH-Net), coordinating efforts across government, civil society, and communities. He advocates for increased investment in safe water and sanitation, develops policies that reflect the needs of marginalized groups, and works to ensure fair access to clean water and improved hygiene for vulnerable populations.",
  },
  {
    title: "Gender-Based Violence & Women’s Rights",
    description:
      "Through YPPD and allied initiatives, Musa designs and oversees programs that combat gender-based and domestic violence. He raises awareness, trains community leaders in survivor-centered approaches, and works to integrate these issues into education and public dialogue. His efforts help clarify legal protections and expand opportunities for women’s independence and resilience.",
  },
  {
    title: "Peacebuilding, Youth Leadership & Post-Conflict Recovery",
    description:
      "As founder of YPPD, Musa supports young people and communities in post-war Sierra Leone. He develops youth-led initiatives for peace education, reconciliation, and civic participation, fostering dialogue and non-violent engagement. His programs build leadership and organizing skills, empowering youth to shape their future.",
  },
  {
    title: "Governance, Social Accountability & Global Campaigns",
    description:
      "Musa serves as National Contact Point for GCAP, leading campaigns on poverty, inequality, and good governance. He promotes public accountability, budget transparency, and citizen participation, especially for those most affected by weak services. Musa engages with government and civil society to drive policy change and serves as a spokesperson on key development issues.",
  },
  {
    title: "Inclusive Education, Disability & Digital Inclusion",
    description:
      "With experience as a special education instructor, Musa champions inclusive education and disability rights. He has trained blind and visually impaired learners in digital skills, developed Braille book programs, and advocates for policies that ensure no one is left behind in education and development.",
  },
  {
    title: "Health, Reproductive Rights & Community Health Systems",
    description:
      "Musa has coordinated projects with health ministries and NGOs, focusing on reproductive and child health. He connects community voices to health system reforms, participates in policy dialogue, and supports youth-led digital health initiatives to strengthen care and access.",
  },
];

export default function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="work-section__container">
        <h2 className="work-section__heading">Work & Impact</h2>
        <p className="work-section__intro">
          Musa Ansumana Soko’s work is dedicated to advancing social justice, equity, and opportunity for all. Through strategic leadership and hands-on collaboration, he addresses some of Sierra Leone’s most pressing challenges—improving water and sanitation, promoting gender equality, empowering youth, and strengthening governance. His approach brings together communities, policymakers, and partners to create lasting, meaningful change.
        </p>
        <div className="work-section__grid">
          {workPillars.map((pillar, idx) => (
            <div className="work-section__card" key={idx}>
              <h3 className="work-section__card-title">{pillar.title}</h3>
              <p className="work-section__card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
