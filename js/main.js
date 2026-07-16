(() => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Header shadow on scroll */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Animated counters */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.getAttribute("data-count")) || 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };

    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterIo.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* Brands carousel — pulos laterais (estilo RS) */
  const track = document.getElementById("brandsTrack");
  const carousel = track && track.closest(".brands__carousel");
  if (track && carousel) {
    const prevBtn = carousel.querySelector(".brands__nav--prev");
    const nextBtn = carousel.querySelector(".brands__nav--next");
    const logos = Array.from(track.children);
    let index = 0;
    let timer = null;
    let step = 1;

    const visibleCount = () => {
      const viewport = carousel.querySelector(".brands__viewport");
      if (!viewport || !logos[0]) return 4;
      const logoW = logos[0].getBoundingClientRect().width;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const unit = logoW + gap;
      return Math.max(1, Math.floor((viewport.clientWidth + gap) / unit));
    };

    const maxIndex = () => Math.max(0, logos.length - visibleCount());

    const goTo = (i, animate = true) => {
      index = Math.max(0, Math.min(i, maxIndex()));
      if (!animate) track.style.transition = "none";
      const logoW = logos[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      track.style.transform = `translateX(-${index * (logoW + gap)}px)`;
      if (!animate) {
        track.offsetHeight;
        track.style.transition = "";
      }
    };

    const next = () => {
      if (index >= maxIndex()) {
        goTo(0, false); // volta sem arrastar todas
        requestAnimationFrame(() => goTo(Math.min(1, maxIndex())));
      } else {
        goTo(index + step);
      }
    };

    const prev = () => {
      if (index <= 0) {
        goTo(maxIndex(), false);
      } else {
        goTo(index - step);
      }
    };

    const start = () => {
      stop();
      timer = window.setInterval(next, 1400);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    prevBtn && prevBtn.addEventListener("click", () => { prev(); start(); });
    nextBtn && nextBtn.addEventListener("click", () => { next(); start(); });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    window.addEventListener("resize", () => goTo(Math.min(index, maxIndex()), false));

    goTo(0, false);
    start();
  }


  /* Hero slideshow — desktop (fachada) / mobile (peças) */
  document.querySelectorAll("[data-hero-slides]").forEach((track) => {
    const slides = track.querySelectorAll(".hero__slide");
    if (slides.length < 2) return;
    let index = 0;
    window.setInterval(() => {
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, 7000);
  });

})();
