import { useWashPosts } from "../lib/hooks/useWashPosts";
import "./WashBlogPage.css";

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function WashBlogPage() {
  const { data: posts, loading, error } = useWashPosts();

  return (
    <main className="wash-blog-page">
      <div className="wash-blog__header-band">
        <div className="wash-blog__header-inner">
          <span className="wash-blog__eyebrow">WaSH-Net</span>
          <h1 className="wash-blog__title">Blog &amp; Updates</h1>
          <p className="wash-blog__intro">
            Insights, updates, and reflections on water, sanitation, hygiene, governance,
            and community-driven change in Sierra Leone and beyond.
          </p>
        </div>
      </div>

      <div className="wash-blog__container">
        {loading && <p className="wash-blog__state">Loading posts…</p>}
        {error   && <p className="wash-blog__state wash-blog__state--error">Could not load posts.</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="wash-blog__state">No posts yet — check back soon.</p>
        )}

        <div className="wash-blog__grid">
          {posts.map((post) => (
            <article key={post.id} className="wash-blog__card">
              {post.mediaType === "image" && post.mediaUrl && (
                <img
                  className="wash-blog__card-img"
                  src={post.mediaUrl}
                  alt={post.headline}
                  loading="lazy"
                />
              )}
              <div className="wash-blog__card-body">
                <div className="wash-blog__card-meta">
                  <span className="wash-blog__tag">{post.section}</span>
                  <time className="wash-blog__date">{formatDate(post.date)}</time>
                </div>
                <h2 className="wash-blog__card-headline">{post.headline}</h2>
                <p className="wash-blog__card-content">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
