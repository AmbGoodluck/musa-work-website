import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useMediaSpeaking } from "../../lib/hooks/useMediaSpeaking";
import { useAuth } from "../../lib/hooks/useAuth";
import "./Admin.css";

/**
 * Parse a YouTube video ID from any common URL format:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://youtube.com/shorts/VIDEO_ID
 * Returns the ID string, or null if not found.
 */
function parseYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0] || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      // /embed/ID  or  /shorts/ID
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "v");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch {
    // fall through
  }
  // Last-resort: grab 11-char ID-like string after v= or /
  const match = url.match(/(?:v=|\/|be\/)([A-Za-z0-9_-]{11})(?:[?&]|$)/);
  return match ? match[1] : null;
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function MediaSpeakingAdmin() {
  const { logout, user }        = useAuth();
  const { data: videos, loading } = useMediaSpeaking();

  const [youtubeUrl, setYoutubeUrl]   = useState("");
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [feedback, setFeedback]       = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const youtubeId = parseYouTubeId(youtubeUrl);
    if (!youtubeId) {
      setFeedback({ type: "error", msg: "Could not parse a YouTube video ID from that URL. Please check it." });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      await addDoc(collection(db, "mediaSpeaking"), {
        youtubeUrl:  youtubeUrl.trim(),
        youtubeId,
        title:       title.trim() || null,
        description: description.trim() || null,
        createdAt:   serverTimestamp(),
        createdBy:   auth.currentUser.uid,
      });

      setFeedback({ type: "success", msg: "Video added successfully!" });
      setYoutubeUrl(""); setTitle(""); setDescription("");
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
          <h1 className="admin-dash__heading">Media & Speaking</h1>
        </div>
        <div className="admin-dash__meta">
          <span className="admin-dash__user">{user?.email}</span>
          <button className="admin-dash__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* ── Add video form ────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-section-title">Add YouTube Video</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            YouTube URL <span className="admin-form__required">*</span>
            <input
              className="admin-form__input"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </label>

          <label className="admin-form__label">
            Title <span className="admin-form__optional">(optional)</span>
            <input
              className="admin-form__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
            />
          </label>

          <label className="admin-form__label">
            Description <span className="admin-form__optional">(optional)</span>
            <textarea
              className="admin-form__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Short description…"
            />
          </label>

          {feedback && (
            <p className={`admin-form__feedback admin-form__feedback--${feedback.type}`}>
              {feedback.msg}
            </p>
          )}

          <button className="admin-form__submit" type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Video"}
          </button>
        </form>
      </section>

      {/* ── Existing videos list ──────────────────────────────── */}
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Videos</h2>
        {loading ? (
          <p className="admin-list__loading">Loading…</p>
        ) : !videos.length ? (
          <p className="admin-list__empty">No videos yet. Add your first one above.</p>
        ) : (
          <ul className="admin-list admin-list--media">
            {videos.map((v) => (
              <li key={v.id} className="admin-list__item admin-list__item--media">
                <img
                  className="admin-list__thumb"
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title || "YouTube thumbnail"}
                  loading="lazy"
                />
                <div className="admin-list__media-body">
                  <strong className="admin-list__title">{v.title || "Untitled"}</strong>
                  <span className="admin-list__date">{formatDate(v.createdAt)}</span>
                  <a
                    className="admin-list__yt-link"
                    href={v.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {v.youtubeUrl}
                  </a>
                  {v.description && (
                    <p className="admin-list__content">{v.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
