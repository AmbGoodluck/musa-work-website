import { useState, useRef } from "react";
import {
  collection, addDoc, updateDoc, doc,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../lib/firebase";
import { useAuth }          from "../../lib/hooks/useAuth";
import { useActivities }    from "../../lib/hooks/useActivities";
import { useWashPosts }     from "../../lib/hooks/useWashPosts";
import { useMediaSpeaking } from "../../lib/hooks/useMediaSpeaking";
import { useAwards }        from "../../lib/hooks/useAwards";
import "./Admin.css";

const TABS = [
  { id: "activities",    label: "Activities" },
  { id: "wash",         label: "Blog — WaSH-Net" },
  { id: "media",        label: "Media & Speaking" },
  { id: "awards",       label: "Awards & Recognition" },
];

const WASH_SECTIONS = ["Health","Governance","Youth","Gender","WASH","Peacebuilding","Other"];

function formatDate(timestamp) {
  if (!timestamp) return "";
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function parseYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0] || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "v");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch { /* fall through */ }
  const match = url.match(/(?:v=|\/|be\/)([A-Za-z0-9_-]{11})(?:[?&]|$)/);
  return match ? match[1] : null;
}

/* ── Activities tab ────────────────────────────────────────────── */
function ActivitiesTab() {
  const { activities, loading } = useActivities();
  const [title, setTitle]       = useState("");
  const [content, setContent]   = useState("");
  const [file, setFile]         = useState(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy]         = useState(false);
  const [fb, setFb]             = useState(null);
  const fileRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setBusy(true); setFb(null); setProgress(0);
    try {
      const docRef = await addDoc(collection(db, "activities"), {
        ...(title.trim() ? { title: title.trim() } : {}),
        content: content.trim(),
        mediaUrl: null, mediaType: null,
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });
      if (file) {
        const sRef = ref(storage, `uploads/activities/${docRef.id}/${file.name}`);
        await new Promise((res, rej) =>
          uploadBytesResumable(sRef, file).on("state_changed",
            s => setProgress(Math.round(s.bytesTransferred / s.totalBytes * 100)), rej, res)
        );
        const url = await getDownloadURL(sRef);
        await updateDoc(doc(db, "activities", docRef.id), {
          mediaUrl: url, mediaType: file.type.startsWith("image/") ? "image" : "video",
          updatedAt: serverTimestamp(),
        });
      }
      setFb({ type: "success", msg: "Activity posted!" });
      setTitle(""); setContent(""); setFile(null); setProgress(0);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) { setFb({ type: "error", msg: err.message }); }
    finally { setBusy(false); }
  }

  return (
    <>
      <section className="admin-form-section">
        <h2 className="admin-section-title">New Activity</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Title <span className="admin-form__optional">(optional)</span>
            <input className="admin-form__input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. WaSH-Net Annual Forum 2025" />
          </label>
          <label className="admin-form__label">
            Content <span className="admin-form__required">*</span>
            <textarea className="admin-form__textarea" value={content} onChange={e => setContent(e.target.value)} rows={6} required placeholder="Describe the activity…" />
          </label>
          <label className="admin-form__label">
            Media <span className="admin-form__optional">(optional — image or video)</span>
            <input ref={fileRef} className="admin-form__file" type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0] || null)} />
          </label>
          {busy && file && (
            <div className="admin-form__progress">
              <div className="admin-form__progress-bar" style={{ width: `${progress}%` }} />
              <span>{progress}%</span>
            </div>
          )}
          {fb && <p className={`admin-form__feedback admin-form__feedback--${fb.type}`}>{fb.msg}</p>}
          <button className="admin-form__submit" type="submit" disabled={busy}>{busy ? "Posting…" : "Post Activity"}</button>
        </form>
      </section>
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Activities</h2>
        {loading ? <p className="admin-list__loading">Loading…</p>
          : !activities.length ? <p className="admin-list__empty">No activities yet.</p>
          : <ul className="admin-list">{activities.map(a => (
            <li key={a.id} className="admin-list__item">
              <div className="admin-list__meta">
                <span className="admin-list__date">{formatDate(a.createdAt)}</span>
                {a.mediaType && <span className="admin-list__badge">{a.mediaType}</span>}
              </div>
              {a.title && <strong className="admin-list__title">{a.title}</strong>}
              <p className="admin-list__content">{a.content}</p>
            </li>
          ))}</ul>}
      </section>
    </>
  );
}

/* ── WaSH Blog tab ─────────────────────────────────────────────── */
function WashTab() {
  const { data: posts, loading } = useWashPosts();
  const [headline, setHeadline] = useState("");
  const [content, setContent]   = useState("");
  const [date, setDate]         = useState("");
  const [section, setSection]   = useState("");
  const [file, setFile]         = useState(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy]         = useState(false);
  const [fb, setFb]             = useState(null);
  const fileRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!headline.trim() || !content.trim() || !date || !section) return;
    setBusy(true); setFb(null); setProgress(0);
    try {
      const docRef = await addDoc(collection(db, "washPosts"), {
        headline: headline.trim(), content: content.trim(),
        date: Timestamp.fromDate(new Date(date + "T00:00:00")),
        section, mediaUrl: null, mediaType: null,
        createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });
      if (file) {
        const sRef = ref(storage, `uploads/washPosts/${docRef.id}/${file.name}`);
        await new Promise((res, rej) =>
          uploadBytesResumable(sRef, file).on("state_changed",
            s => setProgress(Math.round(s.bytesTransferred / s.totalBytes * 100)), rej, res)
        );
        const url = await getDownloadURL(sRef);
        await updateDoc(doc(db, "washPosts", docRef.id), {
          mediaUrl: url, mediaType: file.type.startsWith("image/") ? "image" : "video",
          updatedAt: serverTimestamp(),
        });
      }
      setFb({ type: "success", msg: "Post published!" });
      setHeadline(""); setContent(""); setDate(""); setSection(""); setFile(null); setProgress(0);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) { setFb({ type: "error", msg: err.message }); }
    finally { setBusy(false); }
  }

  return (
    <>
      <section className="admin-form-section">
        <h2 className="admin-section-title">New Post</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Headline <span className="admin-form__required">*</span>
            <input className="admin-form__input" value={headline} onChange={e => setHeadline(e.target.value)} required placeholder="Post headline" />
          </label>
          <label className="admin-form__label">
            Content <span className="admin-form__required">*</span>
            <textarea className="admin-form__textarea" value={content} onChange={e => setContent(e.target.value)} rows={6} required placeholder="Post body…" />
          </label>
          <div className="admin-form__row">
            <label className="admin-form__label">
              Date <span className="admin-form__required">*</span>
              <input className="admin-form__input" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </label>
            <label className="admin-form__label">
              Section <span className="admin-form__required">*</span>
              <select className="admin-form__input" value={section} onChange={e => setSection(e.target.value)} required>
                <option value="">Select section…</option>
                {WASH_SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <label className="admin-form__label">
            Media <span className="admin-form__optional">(optional — image or video)</span>
            <input ref={fileRef} className="admin-form__file" type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0] || null)} />
          </label>
          {busy && file && (
            <div className="admin-form__progress">
              <div className="admin-form__progress-bar" style={{ width: `${progress}%` }} />
              <span>{progress}%</span>
            </div>
          )}
          {fb && <p className={`admin-form__feedback admin-form__feedback--${fb.type}`}>{fb.msg}</p>}
          <button className="admin-form__submit" type="submit" disabled={busy}>{busy ? "Publishing…" : "Publish Post"}</button>
        </form>
      </section>
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Posts</h2>
        {loading ? <p className="admin-list__loading">Loading…</p>
          : !posts.length ? <p className="admin-list__empty">No posts yet.</p>
          : <ul className="admin-list">{posts.map(p => (
            <li key={p.id} className="admin-list__item">
              <div className="admin-list__meta">
                <span className="admin-list__date">{formatDate(p.date)}</span>
                <span className="admin-list__badge">{p.section}</span>
                {p.mediaType && <span className="admin-list__badge">{p.mediaType}</span>}
              </div>
              <strong className="admin-list__title">{p.headline}</strong>
              <p className="admin-list__content">{p.content}</p>
            </li>
          ))}</ul>}
      </section>
    </>
  );
}

/* ── Media & Speaking tab ──────────────────────────────────────── */
function MediaTab() {
  const { data: videos, loading } = useMediaSpeaking();
  const [youtubeUrl, setYoutubeUrl]   = useState("");
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy]               = useState(false);
  const [fb, setFb]                   = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const youtubeId = parseYouTubeId(youtubeUrl);
    if (!youtubeId) { setFb({ type: "error", msg: "Could not parse a YouTube video ID from that URL." }); return; }
    setBusy(true); setFb(null);
    try {
      await addDoc(collection(db, "mediaSpeaking"), {
        youtubeUrl: youtubeUrl.trim(), youtubeId,
        title: title.trim() || null, description: description.trim() || null,
        createdAt: serverTimestamp(), createdBy: auth.currentUser.uid,
      });
      setFb({ type: "success", msg: "Video added!" });
      setYoutubeUrl(""); setTitle(""); setDescription("");
    } catch (err) { setFb({ type: "error", msg: err.message }); }
    finally { setBusy(false); }
  }

  return (
    <>
      <section className="admin-form-section">
        <h2 className="admin-section-title">Add YouTube Video</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            YouTube URL <span className="admin-form__required">*</span>
            <input className="admin-form__input" type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} required placeholder="https://www.youtube.com/watch?v=…" />
          </label>
          <label className="admin-form__label">
            Title <span className="admin-form__optional">(optional)</span>
            <input className="admin-form__input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Video title" />
          </label>
          <label className="admin-form__label">
            Description <span className="admin-form__optional">(optional)</span>
            <textarea className="admin-form__textarea" value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Short description…" />
          </label>
          {fb && <p className={`admin-form__feedback admin-form__feedback--${fb.type}`}>{fb.msg}</p>}
          <button className="admin-form__submit" type="submit" disabled={busy}>{busy ? "Adding…" : "Add Video"}</button>
        </form>
      </section>
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Videos</h2>
        {loading ? <p className="admin-list__loading">Loading…</p>
          : !videos.length ? <p className="admin-list__empty">No videos yet.</p>
          : <ul className="admin-list admin-list--media">{videos.map(v => (
            <li key={v.id} className="admin-list__item admin-list__item--media">
              <img className="admin-list__thumb" src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title || "thumbnail"} loading="lazy" />
              <div className="admin-list__media-body">
                <strong className="admin-list__title">{v.title || "Untitled"}</strong>
                <span className="admin-list__date">{formatDate(v.createdAt)}</span>
                <a className="admin-list__yt-link" href={v.youtubeUrl} target="_blank" rel="noopener noreferrer">{v.youtubeUrl}</a>
                {v.description && <p className="admin-list__content">{v.description}</p>}
              </div>
            </li>
          ))}</ul>}
      </section>
    </>
  );
}

/* ── Awards tab ────────────────────────────────────────────────── */
function AwardsTab() {
  const { data: awards, loading } = useAwards();
  const [name, setName]               = useState("");
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy]               = useState(false);
  const [fb, setFb]                   = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !organization.trim() || !description.trim()) return;
    setBusy(true); setFb(null);
    try {
      await addDoc(collection(db, "awards"), {
        name: name.trim(), organization: organization.trim(),
        description: description.trim(),
        createdAt: serverTimestamp(), createdBy: auth.currentUser.uid,
      });
      setFb({ type: "success", msg: "Award saved!" });
      setName(""); setOrganization(""); setDescription("");
    } catch (err) { setFb({ type: "error", msg: err.message }); }
    finally { setBusy(false); }
  }

  return (
    <>
      <section className="admin-form-section">
        <h2 className="admin-section-title">Add Award</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-form__label">
            Award Name <span className="admin-form__required">*</span>
            <input className="admin-form__input" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Youth Excellence Award" />
          </label>
          <label className="admin-form__label">
            Organization <span className="admin-form__required">*</span>
            <input className="admin-form__input" value={organization} onChange={e => setOrganization(e.target.value)} required placeholder="e.g. United Nations" />
          </label>
          <label className="admin-form__label">
            Description <span className="admin-form__required">*</span>
            <textarea className="admin-form__textarea" value={description} onChange={e => setDescription(e.target.value)} rows={4} required placeholder="Brief description of the award…" />
          </label>
          {fb && <p className={`admin-form__feedback admin-form__feedback--${fb.type}`}>{fb.msg}</p>}
          <button className="admin-form__submit" type="submit" disabled={busy}>{busy ? "Saving…" : "Save Award"}</button>
        </form>
      </section>
      <section className="admin-list-section">
        <h2 className="admin-section-title">All Awards</h2>
        {loading ? <p className="admin-list__loading">Loading…</p>
          : !awards.length ? <p className="admin-list__empty">No awards yet.</p>
          : <ul className="admin-list">{awards.map(a => (
            <li key={a.id} className="admin-list__item">
              <div className="admin-list__meta">
                <span className="admin-list__date">{formatDate(a.createdAt)}</span>
                <span className="admin-list__badge">{a.organization}</span>
              </div>
              <strong className="admin-list__title">{a.name}</strong>
              <p className="admin-list__content">{a.description}</p>
            </li>
          ))}</ul>}
      </section>
    </>
  );
}

/* ── Main Dashboard ────────────────────────────────────────────── */
export default function DashboardPage() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("activities");

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <h1 className="admin-dash__heading">Admin Dashboard</h1>
        <div className="admin-dash__meta">
          <span className="admin-dash__user">{user?.email}</span>
          <button className="admin-dash__logout" onClick={logout}>Log out</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-tabs__btn${activeTab === t.id ? " admin-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="admin-tab-content">
        {activeTab === "activities" && <ActivitiesTab />}
        {activeTab === "wash"       && <WashTab />}
        {activeTab === "media"      && <MediaTab />}
        {activeTab === "awards"     && <AwardsTab />}
      </div>
    </div>
  );
}
