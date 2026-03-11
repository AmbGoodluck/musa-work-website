// ContactPage.jsx — reasons strip + centered card; all content text preserved exactly
import { useState } from "react";
import "./ContactPage.css";

const initialState = {
  name: "", email: "", organization: "", location: "",
  requestType: "", date: "", subject: "", message: "",
};

const requestTypes = [
  "Consultation",
  "Training / Workshop",
  "Speaking Engagement",
  "Partnership / Collaboration",
  "Other",
];

const reasons = [
  {
    icon: "💬",
    title: "Consultation",
    desc: "Advisory sessions on peacebuilding, governance, WaSH, or gender justice.",
  },
  {
    icon: "🎤",
    title: "Speaking Engagement",
    desc: "Keynotes, panels, or workshops at your event or institution.",
  },
  {
    icon: "🤝",
    title: "Partnership",
    desc: "Joint projects, research collaboration, or co-implementation.",
  },
];

export default function ContactPage() {
  const [form, setForm]       = useState(initialState);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState("");
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name        = "Full Name is required.";
    if (!form.email.trim())   errs.email       = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
                              errs.email       = "Enter a valid email address.";
    if (!form.requestType)    errs.requestType = "Please select a request type.";
    if (!form.subject.trim()) errs.subject     = "Subject is required.";
    if (!form.message.trim()) errs.message     = "Message is required.";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    // --- Placeholder: Replace with your real email backend integration ---
    // Option A: Node/Express API with nodemailer to send to musa.soko@yahoo.com
    // Option B: Serverless function (Netlify/AWS/Cloudflare) that sends email
    // Option C: Third-party service (e.g., EmailJS, Formspree)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm(initialState); }
      else throw new Error("Failed to send");
    } catch {
      setStatus("error");
    }
    setSending(false);
  };

  return (
    <div className="cp-page">

      {/* ── Header band ──────────────────────────────────────── */}
      <div className="cp-header-band">
        <div className="cp-header-inner">
          <span className="cp-eyebrow">Get in Touch</span>
          <h1 className="cp-title">Contact &amp; Booking</h1>
          <p className="cp-subtitle">
            Use this form to request a consultation, training, or speaking engagement with
            Musa Ansumana Soko. Serious media, partnership, and collaboration inquiries are
            also welcome. Please provide as much detail as possible to help us respond
            effectively.
          </p>
        </div>
      </div>

      {/* ── Reasons strip ─────────────────────────────────────── */}
      <div className="cp-reasons-band">
        <div className="cp-reasons-inner">
          {reasons.map((r) => (
            <div className="cp-reason" key={r.title}>
              <span className="cp-reason-icon" aria-hidden="true">{r.icon}</span>
              <div className="cp-reason-title">{r.title}</div>
              <div className="cp-reason-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form card ─────────────────────────────────────────── */}
      <div className="cp-form-wrap">
        <form className="cp-form" onSubmit={handleSubmit} noValidate>

          <div className="cp-form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name<span className="required">*</span></label>
              <input
                id="name" name="name" type="text" autoComplete="name"
                value={form.name} onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="Your full name" required
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address<span className="required">*</span></label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                value={form.email} onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="you@email.com" required
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
          </div>

          <div className="cp-form-row">
            <div className="form-group">
              <label htmlFor="organization">Organization / Affiliation</label>
              <input
                id="organization" name="organization" type="text"
                value={form.organization} onChange={handleChange}
                placeholder="(Optional)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Country / City</label>
              <input
                id="location" name="location" type="text"
                value={form.location} onChange={handleChange}
                placeholder="(Optional)"
              />
            </div>
          </div>

          <div className="cp-form-row">
            <div className="form-group">
              <label htmlFor="requestType">Type of Request<span className="required">*</span></label>
              <select
                id="requestType" name="requestType"
                value={form.requestType} onChange={handleChange}
                className={errors.requestType ? "error" : ""} required
              >
                <option value="">Select...</option>
                {requestTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.requestType && <div className="form-error">{errors.requestType}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="date">Preferred Date(s) or Timeframe</label>
              <input
                id="date" name="date" type="text"
                value={form.date} onChange={handleChange}
                placeholder="(Optional)"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject<span className="required">*</span></label>
            <input
              id="subject" name="subject" type="text"
              value={form.subject} onChange={handleChange}
              className={errors.subject ? "error" : ""}
              placeholder="Short subject" required
            />
            {errors.subject && <div className="form-error">{errors.subject}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message / Details<span className="required">*</span></label>
            <textarea
              id="message" name="message" rows={6}
              value={form.message} onChange={handleChange}
              className={errors.message ? "error" : ""}
              placeholder="Please include topic/focus, audience, and desired outcomes." required
            />
            {errors.message && <div className="form-error">{errors.message}</div>}
          </div>

          <button type="submit" className="cp-submit" disabled={sending} aria-busy={sending}>
            {sending ? "Sending…" : "Send Message"}
          </button>

          <div className="form-status" aria-live="polite">
            {status === "success" && (
              <div className="form-success">
                Thank you. Your message has been sent. We will get back to you as soon as possible.
              </div>
            )}
            {status === "error" && (
              <div className="form-error form-error--block">
                Sorry, there was a problem sending your message. Please try again later or email
                musa.soko@yahoo.com directly.
              </div>
            )}
          </div>
        </form>

        {/* Direct contact info */}
        <div className="cp-direct">
          <strong>Direct email:</strong>{" "}
          <a href="mailto:musa.soko@yahoo.com">musa.soko@yahoo.com</a><br />
          <strong>Official email:</strong>{" "}
          <a href="mailto:musa@wash-net.org">musa@wash-net.org</a><br />
          <span className="cp-direct-note">
            For time‑sensitive inquiries, you may also reach out by email.
          </span>
        </div>
      </div>
    </div>
  );
}
