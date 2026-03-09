import React from "react";

const roles = [
  {
    title: "Team Lead / Executive Director",
    org: "Water, Sanitation and Hygiene Network (WASH-Net), Sierra Leone",
    years: "2018–Present",
    desc: "Leads national efforts to improve access to water, sanitation, and hygiene, advocating for policy change and community empowerment.",
  },
  {
    title: "Executive Coordinator",
    org: "Youth Partnership for Peace and Development (YPPD)",
    years: "2012–2018",
    desc: "Founded and led YPPD, empowering youth in post-conflict Sierra Leone through peacebuilding and leadership programs.",
  },
  {
    title: "Chair, Executive Committee",
    org: "Civil Society Platform for Peacebuilding and Statebuilding (CSPPS)",
    years: "2016–2020",
    desc: "Coordinated civil society engagement in national and international peacebuilding processes.",
  },
  {
    title: "National Contact Point",
    org: "Global Call to Action Against Poverty (GCAP)",
    years: "2014–2019",
    desc: "Represented Sierra Leone in global advocacy for poverty eradication and social justice.",
  },
  {
    title: "Advisor",
    org: "UN-Habitat (Africa)",
    years: "2020–2022",
    desc: "Provided strategic advice on urban development and youth engagement across Africa.",
  },
];

function LeadershipRoles() {
  return (
    <div className="leadership-roles">
      <h2>Leadership & Roles</h2>
      <ul className="leadership-roles__list">
        {roles.map((role, idx) => (
          <li key={idx} className="leadership-roles__item">
            <div className="leadership-roles__years">{role.years}</div>
            <div>
              <strong>{role.title}</strong> – <span>{role.org}</span>
              <div className="leadership-roles__desc">{role.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadershipRoles;
