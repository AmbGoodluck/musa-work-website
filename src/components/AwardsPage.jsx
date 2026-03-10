import React from "react";
import "./AwardsPage.css";

// Only factual, verified awards and recognitions
const awards = [
  { name: "Giraffe Hero", issuer: "Giraffe Heroes Project", year: null },
  { name: "Goodwill Ambassador for Children", issuer: "Children's Forum Network / Ministry of Social Welfare, Gender and Children's Affairs", year: 2007 },
  { name: "Outstanding Youth Activist of the Year", issuer: "National Award Committee & National Youth Commission of Sierra Leone", year: 2011 },
  { name: "Alumni Engagement Innovation Fund", issuer: "IREX / U.S. Department", year: 2013 },
  { name: "Global Youth Ambassador", issuer: "A World at School", year: 2016 },
  { name: "50 Most Influencial Young Sierra Leoneans", issuer: "iLEAD", year: 2017 },
  { name: "Best Humanitarian Worker", issuer: "Good Deeds Day Sierra Leone Humanitarian Recognition Awards", year: 2023 }
];

export default function AwardsPage() {
  return (
    <div className="awards-page-container">
      <header className="awards-header">
        <h1 className="awards-title">Awards & Recognitions</h1>
        <p className="awards-intro">
          Musa Ansumana Soko has received national and international recognition for his activism and development work. This page lists formal awards and ambassador roles he has been granted.
        </p>
      </header>
      <main>
        <section className="awards-list">
          {awards.map((award, idx) => (
            <div className="award-card" key={idx}>
              <div className="award-name">{award.name}</div>
              <div className="award-meta">
                {award.issuer}
                {award.year ? ` – ${award.year}` : ""}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
