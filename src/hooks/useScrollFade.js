import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport it receives the class "visible",
 * triggering the CSS fade-up animation defined in global.css.
 *
 * Usage:
 *   const ref = useScrollFade();
 *   <div ref={ref} className="fade-up"> … </div>
 */
export function useScrollFade(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser doesn't support IntersectionObserver just make it visible
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Observes multiple children of a container and staggers their fade-in.
 * Each direct child should already have the "fade-up" class.
 *
 * Usage:
 *   const containerRef = useStaggeredFade();
 *   <div ref={containerRef} className="my-grid"> … </div>
 */
export function useStaggeredFade(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      Array.from(container.children).forEach((child) =>
        child.classList.add("visible")
      );
      return;
    }

    const children = Array.from(container.querySelectorAll(".fade-up"));
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
