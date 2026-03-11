import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../lib/firebase";
import { useActivities } from "../../lib/hooks/useActivities";
import { useAuth } from "../../lib/hooks/useAuth";
import "./Admin.css";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ActivitiesAdmin() {
  const { logout, user }          = useAuth();
  const { activities, loading }   = useActivities(); // real-time

  const [title, setTitle]         = useState("");
  const [content, setContent]     = useState("");
  const [file, setFile]           = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback]   = useState(null); // { type: 'success'|'error', msg }
  const fileRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setFeedback(null);
    setUploadProgress(0);

    try {
      // 1. Create the Firestore document first
      const docRef = await addDoc(collection(db, "activities"), {
        ...(title.trim() ? { title: title.trim() } : {}),
        content:   content.trim(),
        mediaUrl:  null,
        mediaType: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      // 2. Upload media if provided, then update the document
      if (file) {
        const storePath = `uploads/activities/${docRef.id}/${file.name}`;
        const storageRef = ref(storage, storePath);
        const task = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          task.on(
            "state_changed",
            (snap) =>
              setUploadProgress(
                Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
              ),
            reject,
            resolve
          );
        });

        const downloadURL = await getDownloadURL(storageRef);
        const mediaType   = file.type.startsWith("image/") ? "image" : "video";

        await updateDoc(doc(db, "activities", docRef.id), {
          mediaUrl:  downloadURL,
          mediaType,
          updatedAt: serverTimestamp(),
        });
      }

      setFeedback({ type: "success", msg: "Activity posted successfully!" });
      setTitle("");
      setContent("");
      setFile(null);
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
          <h1 className="admin-dash__heading">Manage Activities</h1>
        </div>
        <div className="admin-dash__meta">
          <span className="admin-dash__user">{user?.email}</span>
          <button className="admin-dash__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      {/* ── New Activity form ─────────────────────────────────── */}
      <section className="admin-form-section">
        <h2 className="admin-section-title">New Activity</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Title <span className="admin-form__optional">(optional)</span>
            <input
              className="admin-form__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. WaSH-Net Annual Forum 2025"
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
              placeholder="Describe the activity…"
            />
          </label>

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
              <div
                className="admin-form__progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
              <span>{uploadProgress}%</span>
            </div>
          )}

          {feedback && (
            <p className={`admin-form__feedback admin-form__feedback--${feedback.type}`}>
              {feedback.msg}
            </p>
          )}

          <button
            className="admin-form__submit"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Posting…" : "Post Activity"}
          </button>
        </form>
      </section>

      {/* ── Existing activities list ──────────────────────────── */}
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Activities</h2>
        {loading ? (
          <p className="admin-list__loading">Loading…</p>
        ) : !activities.length ? (
          <p className="admin-list__empty">No activities yet. Post your first one above.</p>
        ) : (
          <ul className="admin-list">
            {activities.map((a) => (
              <li key={a.id} className="admin-list__item">
                <div className="admin-list__meta">
                  <span className="admin-list__date">{formatDate(a.createdAt)}</span>
                  {a.mediaType && (
                    <span className="admin-list__badge">{a.mediaType}</span>
                  )}
                </div>
                {a.title && (
                  <strong className="admin-list__title">{a.title}</strong>
                )}
                <p className="admin-list__content">{a.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
