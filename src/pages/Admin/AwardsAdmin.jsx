import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useAwards } from "../../lib/hooks/useAwards";
import { useAuth } from "../../lib/hooks/useAuth";
import "./Admin.css";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function AwardsAdmin() {
  const { logout, user }         = useAuth();
  const { data: awards, loading } = useAwards();

  const [name, setName]           = useState("");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback]   = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !organization.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      await addDoc(collection(db, "awards"), {
        name:         name.trim(),
        description:  description.trim(),
        organization: organization.trim(),
        createdAt:    serverTimestamp(),
        createdBy:    auth.currentUser.uid,
      });

      setFeedback({ type: "success", msg: "Award added successfully!" });
      setName(""); setDescription(""); setOrganization("");
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", msg: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-dash__header">
        <div className="admin-dash__nav">
          <Link to="/admin/dashboard" className="admin-dash__back">← Dashboard</Link>
          <h1 className="admin-dash__heading">Awards & Recognition</h1>
        </div>
        <div className="admin-dash__meta">
          <span className="admin-dash__user">{user?.email}</span>
          <button className="admin-dash__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* ── New award form ────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-section-title">Add Award</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Award Name <span className="admin-form__required">*</span>
            <input
              className="admin-form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Youth Excellence Award"
            />
          </label>

          <label className="admin-form__label">
            Organization <span className="admin-form__required">*</span>
            <input
              className="admin-form__input"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              placeholder="e.g. United Nations"
            />
          </label>

          <label className="admin-form__label">
            Description <span className="admin-form__required">*</span>
            <textarea
              className="admin-form__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              placeholder="Brief factual description of the award…"
            />
          </label>

          {feedback && (
            <p className={`admin-form__feedback admin-form__feedback--${feedback.type}`}>
              {feedback.msg}
            </p>
          )}

          <button className="admin-form__submit" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Award"}
          </button>
        </form>
      </section>

      {/* ── Existing awards list ──────────────────────────────── */}
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Awards</h2>
        {loading ? (
          <p className="admin-list__loading">Loading…</p>
        ) : !awards.length ? (
          <p className="admin-list__empty">No awards yet. Add your first one above.</p>
        ) : (
          <ul className="admin-list">
            {awards.map((a) => (
              <li key={a.id} className="admin-list__item">
                <div className="admin-list__meta">
                  <span className="admin-list__date">{formatDate(a.createdAt)}</span>
                  <span className="admin-list__badge">{a.organization}</span>
                </div>
                <strong className="admin-list__title">{a.name}</strong>
                <p className="admin-list__content">{a.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
