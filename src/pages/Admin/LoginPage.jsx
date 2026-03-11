import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import "./Admin.css";

export default function LoginPage() {
  const { login, resetPassword, user, loading } = useAuth();
  const navigate = useNavigate();

  // "login" | "reset"
  const [mode, setMode]             = useState("login");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState(null);
  const [success, setSuccess]       = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Already authenticated — skip login
  useEffect(() => {
    if (!loading && user) navigate("/admin/activities", { replace: true });
  }, [user, loading, navigate]);

  function switchMode(next) {
    setMode(next);
    setError(null);
    setSuccess(null);
    setPassword("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin/activities", { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    if (!email.trim()) { setError("Enter your email address above."); return; }
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      await resetPassword(email.trim());
      setSuccess("Password reset email sent. Check your inbox (and spam folder).");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__form">
        <h1 className="admin-login__heading">
          {mode === "login" ? "Admin Login" : "Reset Password"}
        </h1>

        {error   && <p className="admin-login__error">{error}</p>}
        {success && <p className="admin-login__success">{success}</p>}

        {/* Login form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} style={{ display: "contents" }}>
            <label className="admin-login__label">
              Email
              <input
                className="admin-login__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>

            <label className="admin-login__label">
              Password
              <input
                className="admin-login__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </label>

            <button className="admin-login__btn" type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Log in"}
            </button>

            <button
              type="button"
              className="admin-login__link"
              onClick={() => switchMode("reset")}
            >
              Forgot password?
            </button>
          </form>
        )}

        {/* Reset password form */}
        {mode === "reset" && (
          <form onSubmit={handleReset} style={{ display: "contents" }}>
            <label className="admin-login__label">
              Email address
              <input
                className="admin-login__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Enter your admin email"
              />
            </label>

            <button className="admin-login__btn" type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send reset email"}
            </button>

            <button
              type="button"
              className="admin-login__link"
              onClick={() => switchMode("login")}
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    default:
      return "Something went wrong. Please try again.";
  }
}
