import { useActivities } from "../../lib/hooks/useActivities";
import "./ActivitiesList.css";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ActivitiesList() {
  const { activities, loading, error } = useActivities();

  if (loading) return <div className="activities__loading">Loading activities…</div>;
  if (error)   return <div className="activities__error">Failed to load activities.</div>;
  if (!activities.length) return <div className="activities__empty">No activities posted yet.</div>;

  return (
    <ul className="activities__list">
      {activities.map((activity) => (
        <li key={activity.id} className="activities__card">
          {activity.title && (
            <h3 className="activities__title">{activity.title}</h3>
          )}
          <p className="activities__content">{activity.content}</p>
          {activity.mediaType === "image" && activity.mediaUrl && (
            <img
              className="activities__media"
              src={activity.mediaUrl}
              alt={activity.title || "Activity media"}
              loading="lazy"
            />
          )}
          {activity.mediaType === "video" && activity.mediaUrl && (
            <video className="activities__media" src={activity.mediaUrl} controls />
          )}
          <time className="activities__date">{formatDate(activity.createdAt)}</time>
        </li>
      ))}
    </ul>
  );
}
