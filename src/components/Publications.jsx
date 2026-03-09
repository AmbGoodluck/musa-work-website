import React from "react";

const posts = [
  {
    title: "Building Peace After Conflict: Lessons from Sierra Leone",
    date: "Jan 2025",
    excerpt: "Insights on post-war reconciliation and the role of youth in peacebuilding.",
    tags: ["Peacebuilding", "Youth"],
  },
  {
    title: "Advancing WASH in West Africa",
    date: "Oct 2024",
    excerpt: "How community-driven approaches are transforming access to water and sanitation.",
    tags: ["WASH", "Development"],
  },
  {
    title: "Gender Justice in Practice",
    date: "May 2024",
    excerpt: "Strategies for addressing gender-based violence and empowering women leaders.",
    tags: ["Gender", "Justice"],
  },
  {
    title: "Civic Participation for Accountable Governance",
    date: "Feb 2024",
    excerpt: "The importance of civic engagement in building transparent institutions.",
    tags: ["Governance", "Civic Engagement"],
  },
];

function Publications() {
  return (
    <div className="publications">
      <h2>Publications / Blog</h2>
      <div className="publications__grid">
        {posts.map((post, idx) => (
          <div className="publications__card" key={idx}>
            <div className="publications__meta">
              <span className="publications__date">{post.date}</span>
              <span className="publications__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="publications__tag">{tag}</span>
                ))}
              </span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Publications;
