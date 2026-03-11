import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";

/**
 * Route guard: redirects unauthenticated users to /admin.
 * Wrap any admin-only <Route> element with this component.
 *
 * Usage in AppRouter:
 *   <Route path="activities" element={<RequireAuth><ActivitiesAdmin /></RequireAuth>} />
 */
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for Firebase to resolve auth state

  if (!user) return <Navigate to="/admin" replace />;

  return children;
}
