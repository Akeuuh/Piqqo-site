/* ============================================
   Piqqo site — foundation JS
   Zero-build, no dependencies. Progressive enhancement:
   without JS the page renders fully (content never hidden).
   ============================================ */
(function () {
  "use strict";

  var root = document.documentElement;

  // Mark that JS is active so CSS can safely hide-then-reveal elements.
  // If this script never runs, [data-reveal] stays visible.
  root.classList.add("js");

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function revealAll(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add("is-visible");
    }
  }

  function initReveal() {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    // Reduced motion or no IntersectionObserver support: show everything now.
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealAll(targets);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal);
  } else {
    initReveal();
  }
})();
