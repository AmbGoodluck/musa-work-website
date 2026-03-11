import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  collection, addDoc, updateDoc, doc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../lib/firebase";
import { useWashPosts } from "../../lib/hooks/useWashPosts";
import { useAuth } from "../../lib/hooks/useAuth";
import "./Admin.css";

const SECTIONS = ["Health", "Governance", "Youth", "Gender", "WASH", "Peacebuilding", "Other"];

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function WashBlogAdmin() {
  const { logout, user }        = useAuth();
  const { data: posts, loading } = useWashPosts();

  const [headline, setHeadline]   = useState("");
  const [content, setContent]     = useState("");
  const [date, setDate]           = useState("");
  const [section, setSection]     = useState("");
  const [file, setFile]           = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback]   = useState(null);
  const fileRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!headline.trim() || !content.trim() || !date || !section) return;

    setSubmitting(true);
    setFeedback(null);
    setUploadProgress(0);

    try {
      // Convert the date string (YYYY-MM-DD) to a Firestore Timestamp
      const dateTimestamp = Timestamp.fromDate(new Date(date + "T00:00:00"));

      const docRef = await addDoc(collection(db, "washPosts"), {
        headline:  headline.trim(),
        content:   content.trim(),
        date:      dateTimestamp,
        section:   section,
        mediaUrl:  null,
        mediaType: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      if (file) {
        const storePath = `uploads/washPosts/${docRef.id}/${file.name}`;
        const storageRef = ref(storage, storePath);
        const task = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          task.on(
            "state_changed",
            (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            reject,
            resolve
          );
        });

        const downloadURL = await getDownloadURL(storageRef);
        const mediaType   = file.type.startsWith("image/") ? "image" : "video";

        await updateDoc(doc(db, "washPosts", docRef.id), {
          mediaUrl:  downloadURL,
          mediaType,
          updatedAt: serverTimestamp(),
        });
      }

      setFeedback({ type: "success", msg: "Post published successfully!" });
      setHeadline(""); setContent(""); setDate(""); setSection(""); setFile(null);
      setUploadProgress(0);
      if (fileRef.current) fileRef.current.value = "";
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
          <h1 className="admin-dash__heading">Blog — WaSH-Net</h1>
        </div>
        <div className="admin-dash__meta">
          <span className="admin-dash__user">{user?.email}</span>
          <button className="admin-dash__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* ── New post form ─────────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-section-title">New Post</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Headline <span className="admin-form__required">*</span>
            <input
              className="admin-form__input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
              placeholder="Post headline"
            />
          </label>

          <label className="admin-form__label">
            Content <span className="admin-form__required">*</span>
            <textarea
              className="admin-form__textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              placeholder="Post body…"
            />
          </label>

          <div className="admin-form__row">
            <label className="admin-form__label">
              Date <span className="admin-form__required">*</span>
              <input
                className="admin-form__input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <label className="admin-form__label">
              Section <span className="admin-form__required">*</span>
              <select
                className="admin-form__input"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              >
                <option value="">Select section…</option>
                {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <label className="admin-form__label">
            Media <span className="admin-form__optional">(optional — image or video)</span>
            <input
              ref={fileRef}
              className="admin-form__file"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          {submitting && file && (
            <div className="admin-form__progress">
              <div className="admin-form__progress-bar" style={{ width: `${uploadProgress}%` }} />
              <span>{uploadProgress}%</span>
            </div>
          )}

          {feedback && (
            <p className={`admin-form__feedback admin-form__feedback--${feedback.type}`}>
              {feedback.msg}
            </p>
          )}

          <button className="admin-form__submit" type="submit" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </section>

      {/* ── Existing posts list ───────────────────────────────── */}
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Posts</h2>
        {loading ? (
          <p className="admin-list__loading">Loading…</p>
        ) : !posts.length ? (
          <p className="admin-list__empty">No posts yet. Publish your first one above.</p>
        ) : (
          <ul className="admin-list">
            {posts.map((p) => (
              <li key={p.id} className="admin-list__item">
                <div className="admin-list__meta">
                  <span className="admin-list__date">{formatDate(p.date)}</span>
                  <span className="admin-list__badge">{p.section}</span>
                  {p.mediaType && <span className="admin-list__badge">{p.mediaType}</span>}
                </div>
                <strong className="admin-list__title">{p.headline}</strong>
                <p className="admin-list__content">{p.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
