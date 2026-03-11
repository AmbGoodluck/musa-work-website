import { useAwards } from "../lib/hooks/useAwards";

const FALLBACK_AWARDS = [
  { name: "Peacebuilder of the Year",       org: "Sierra Leone Peace Foundation", desc: "Awarded for exceptional contributions to peace and reconciliation.",               icon: "🥇" },
  { name: "Humanitarian Leadership Award",  org: "African Civic Forum",           desc: "Recognized for outstanding leadership in humanitarian and civic initiatives.",    icon: "🏆" },
  { name: "Giraffe Heroes Project Recognition", org: "Giraffe Heroes Project",    desc: "Honored for courageous and selfless service to community and country.",           icon: "🏅" },
];

function Awards() {
  const { data: firestoreAwards, loading } = useAwards();

  // Use Firestore data if available, otherwise show hardcoded fallback
  const awards = !loading && firestoreAwards.length > 0 ? firestoreAwards : FALLBACK_AWARDS;

  return (
    <div className="awards">
      <h2>Awards &amp; Recognition</h2>
      {loading ? (
        <p style={{ color: "#64748b", padding: "1rem 0" }}>Loading awards…</p>
      ) : (
        <div className="awards__grid">
          {awards.map((award, idx) => (
            <div className="awards__card" key={award.id || idx}>
              <div className="awards__icon">{award.icon || "🏆"}</div>
              <div>
                <h3>{award.name || award.title}</h3>
                <div className="awards__org">{award.organization || award.org}</div>
                <p>{award.description || award.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Awards;
