// Fade sections of the about page in as they scroll into view.
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".about-page");
  if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = page.querySelectorAll(".profile, .clearfix > *, article > h2, .publications ol.bibliography > li, .social, .visitor-map");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  // Stagger items that are on screen at load; later ones animate as they scroll in.
  let delay = 0;
  targets.forEach((el) => {
    el.classList.add("reveal");
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.transitionDelay = `${delay}ms`;
      el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
      delay += 70;
    }
    observer.observe(el);
  });
});
