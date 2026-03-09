import React, { useState } from "react";

const initialState = {
  name: "",
  organization: "",
  email: "",
  subject: "",
  message: "",
};

const subjects = [
  "Speaking Engagement",
  "Partnership",
  "Media",
  "Mentorship",
  "Other",
];

function validateEmail(email) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(email);
}

function Contact() {
  const [form, setForm] = useState(initialState);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Invalid email";
    if (!form.subject) newErrors.subject = "Please select a subject";
    if (!form.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSent(true);
      setForm(initialState);
    }
  };

  return (
    <div className="contact">
      <h2>Contact</h2>
      <div className="contact__content">
        <div className="contact__info">
          <p>
            Interested in collaborating, inviting Musa to speak, or learning more? Please fill out the form or reach out via email or social media.
          </p>
          <div className="contact__socials">
            <a href="mailto:info@musasoko.org" aria-label="Email">info@musasoko.org</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter">X</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
          </div>
        </div>
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {sent && <div className="contact__success">Message sent!</div>}
          <div className="contact__field">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              aria-invalid={!!errors.name}
            />
            {errors.name && <div className="contact__error">{errors.name}</div>}
          </div>
          <div className="contact__field">
            <label htmlFor="organization">Organization</label>
            <input
              id="organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
            />
          </div>
          <div className="contact__field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              aria-invalid={!!errors.email}
            />
            {errors.email && <div className="contact__error">{errors.email}</div>}
          </div>
          <div className="contact__field">
            <label htmlFor="subject">Subject *</label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              aria-invalid={!!errors.subject}
            >
              <option value="">Select...</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.subject && <div className="contact__error">{errors.subject}</div>}
          </div>
          <div className="contact__field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              aria-invalid={!!errors.message}
            />
            {errors.message && <div className="contact__error">{errors.message}</div>}
          </div>
          <button className="btn btn--primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
