(function () {
  var STAGGER_MS = 70;
  var MAX_STAGGER_STEPS = 10;

  var triggers = document.querySelectorAll(".reveal-trigger");
  var allItems = document.querySelectorAll(".reveal-item");

  if (!("IntersectionObserver" in window) || !triggers.length) {
    allItems.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  function revealSection(section) {
    var items = section.querySelectorAll(".reveal-item");
    items.forEach(function (el, i) {
      var step = Math.min(i, MAX_STAGGER_STEPS);
      var delay = step * STAGGER_MS;
      el.style.transitionDelay = delay + "ms";
      // next frame so the delay is applied before opacity flips
      requestAnimationFrame(function () {
        el.classList.add("is-visible");
      });
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
  );

  triggers.forEach(function (section) { observer.observe(section); });
})();
