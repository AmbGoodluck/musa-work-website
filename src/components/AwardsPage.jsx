// AwardsPage.jsx — timeline with year column; all content text preserved exactly
import "./AwardsPage.css";
import { useStaggeredFade } from "../hooks/useScrollFade";
import { useAwards } from "../lib/hooks/useAwards";

const STATIC_AWARDS = [
  { name: "Giraffe Hero",                              issuer: "Giraffe Heroes Project",                                                                year: null },
  { name: "Goodwill Ambassador for Children",          issuer: "Children's Forum Network / Ministry of Social Welfare, Gender and Children's Affairs",  year: 2007 },
  { name: "Outstanding Youth Activist of the Year",    issuer: "National Award Committee & National Youth Commission of Sierra Leone",                  year: 2011 },
  { name: "Alumni Engagement Innovation Fund",         issuer: "IREX / U.S. Department",                                                                year: 2013 },
  { name: "Global Youth Ambassador",                   issuer: "A World at School",                                                                      year: 2016 },
  { name: "50 Most Influencial Young Sierra Leoneans", issuer: "iLEAD",                                                                                 year: 2017 },
  { name: "Best Humanitarian Worker",                  issuer: "Good Deeds Day Sierra Leone Humanitarian Recognition Awards",                           year: 2023 },
];

function formatDate(timestamp) {
  if (!timestamp) return null;
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.getFullYear();
}

export default function AwardsPage() {
  const listRef = useStaggeredFade();
  const { data: dynamicAwards, loading } = useAwards();

  return (
    <div className="ap-page">

      <div className="ap-header-band">
        <div className="ap-header-inner">
          <span className="ap-eyebrow">Recognition</span>
          <h1 className="ap-title">Awards &amp; Recognitions</h1>
          <p className="ap-intro">
            Musa Ansumana Soko has received national and international recognition for his
            activism and development work. This page lists formal awards and ambassador roles
            he has been granted.
          </p>
        </div>
      </div>

      <div className="ap-container">
        <section className="ap-timeline" ref={listRef}>
          {/* Newest Firestore awards first (ordered by createdAt desc in hook) */}
          {!loading && dynamicAwards.map((award, idx) => {
            const isLast = idx === dynamicAwards.length - 1 && STATIC_AWARDS.length === 0;
            return (
              <div className="ap-item fade-up" key={award.id}>
                <div className="ap-year">
                  {formatDate(award.createdAt) ?? <span className="ap-year-na">—</span>}
                </div>
                <div className="ap-spine" aria-hidden="true">
                  <div className="ap-dot" />
                  {!isLast && <div className="ap-line" />}
                </div>
                <div className="ap-card">
                  <div className="ap-name">{award.name}</div>
                  <div className="ap-issuer">{award.organization}</div>
                </div>
              </div>
            );
          })}

          {/* Static historical awards below */}
          {STATIC_AWARDS.map((award, idx) => (
            <div className="ap-item fade-up" key={`static-${idx}`}>
              <div className="ap-year" aria-label={award.year ? `Year ${award.year}` : "Year not specified"}>
                {award.year ?? <span className="ap-year-na">—</span>}
              </div>
              <div className="ap-spine" aria-hidden="true">
                <div className="ap-dot" />
                {idx < STATIC_AWARDS.length - 1 && <div className="ap-line" />}
              </div>
              <div className="ap-card">
                <div className="ap-name">{award.name}</div>
                <div className="ap-issuer">{award.issuer}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
