import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

/**
 * Provides current auth state + login/logout helpers.
 *
 * isAdmin: currently any authenticated user is treated as admin.
 * To restrict by role later, check user.email against an allowlist or
 * verify a custom claim via user.getIdTokenResult().claims.admin.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return signOut(auth);
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const isAdmin = !!user; // extend with role check here later

  return { user, loading, isAdmin, login, logout, resetPassword };
}
