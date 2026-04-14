// Enhanced JavaScript with all interactive features
document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor (only if not on touch device)
  if (!("ontouchstart" in window)) {
    const cursor = document.createElement("div");
    const cursorFollower = document.createElement("div");
    cursor.classList.add("custom-cursor");
    cursorFollower.classList.add("custom-cursor-follower");
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 80);
    });

    document
      .querySelectorAll("a, button, .btn, .portfolio-item, .skill-item")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.style.transform = "scale(2)";
          cursor.style.borderColor = "var(--secondary)";
          cursorFollower.style.transform = "scale(1.5)";
          cursorFollower.style.background = "rgba(245, 158, 11, 0.3)";
        });
        el.addEventListener("mouseleave", () => {
          cursor.style.transform = "scale(1)";
          cursor.style.borderColor = "var(--primary)";
          cursorFollower.style.transform = "scale(1)";
          cursorFollower.style.background = "rgba(124, 58, 237, 0.2)";
        });
      });
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  const closeMobileNav = () => {
    navLinks.classList.remove("active");
    navOverlay?.classList.remove("active");
    if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      navOverlay?.classList.toggle("active", isActive);
      mobileMenuBtn.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
  if (navOverlay) navOverlay.addEventListener("click", closeMobileNav);
  document
    .querySelectorAll(".nav-links a")
    .forEach((link) => link.addEventListener("click", closeMobileNav));

  // Header scroll effect
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 100) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
  });

  // Skill bars animation
  const skillBars = document.querySelectorAll(".skill-progress");
  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        const width = bar.getAttribute("data-width");
        if (width && bar.style.width !== width + "%")
          bar.style.width = width + "%";
      }
    });
  };

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  const animateTimeline = () => {
    timelineItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight - 100) {
        item.classList.add("visible");
      }
    });
  };

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (backToTop) {
      if (window.pageYOffset > 300) backToTop.classList.add("visible");
      else backToTop.classList.remove("visible");
    }
    animateSkillBars();
    animateTimeline();
  });

  // Contact form
  const contactForm = document.getElementById("contactForm");
  function showNotification(message, type) {
    const notif = document.createElement("div");
    notif.className = `notification ${type}`;
    notif.innerHTML = `<i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i><span>${message}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add("show"), 10);
    setTimeout(() => {
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!name || !email || !subject || !message)
        return showNotification("Please fill all fields.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return showNotification("Enter a valid email.", "error");
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background =
          "linear-gradient(135deg, #10b981 0%, #34d399 100%)";
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = "";
          btn.disabled = false;
          showNotification(`Thank you, ${name}! Message sent.`, "success");
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // Download resume
  const downloadBtn = document.getElementById("downloadResumeBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Download my resume?")) {
        const orig = downloadBtn.innerHTML;
        downloadBtn.innerHTML =
          '<i class="fas fa-download"></i> Downloading...';
        downloadBtn.disabled = true;
        setTimeout(() => {
          downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
          downloadBtn.style.background =
            "linear-gradient(135deg, #10b981 0%, #34d399 100%)";
          setTimeout(() => {
            downloadBtn.innerHTML = orig;
            downloadBtn.style.background = "";
            downloadBtn.disabled = false;
            showNotification("Resume downloaded!", "success");
          }, 2000);
        }, 1500);
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = document.querySelector("header").offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
      }
    });
  });

  // Active nav highlight
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 200;
      if (scrollY >= top) current = section.getAttribute("id");
    });
    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`)
        link.classList.add("active");
    });
  });

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Typing effect
  const tagline = document.querySelector(".tagline");
  if (tagline && tagline.textContent) {
    const text = tagline.textContent;
    tagline.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) tagline.innerHTML += text.charAt(i++);
      else clearInterval(timer);
    }, 50);
  }

  // Floating & particles
  function createFloatingElements() {
    const container = document.createElement("div");
    container.className = "floating-elements";
    for (let i = 0; i < 12; i++) {
      const el = document.createElement("div");
      el.className = "floating-element";
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.animationDelay = Math.random() * 5 + "s";
      el.style.animationDuration = 15 + Math.random() * 20 + "s";
      container.appendChild(el);
    }
    document.body.appendChild(container);
  }
  function createParticles() {
    const container = document.createElement("div");
    container.className = "particles";
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 8 + "s";
      p.style.animationDuration = 5 + Math.random() * 5 + "s";
      container.appendChild(p);
    }
    document.body.appendChild(container);
  }
  createFloatingElements();
  createParticles();

  // Initial animations
  setTimeout(() => {
    animateSkillBars();
    animateTimeline();
  }, 300);
});

// Notification styles
const notifStyles = document.createElement("style");
notifStyles.textContent = `
  .notification{position:fixed;top:100px;right:30px;background:rgba(31,41,55,0.95);backdrop-filter:blur(10px);color:#fff;padding:1.2rem 2rem;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);transform:translateX(400px);transition:transform 0.3s;z-index:9999;display:flex;align-items:center;gap:1rem;border-left:4px solid var(--primary);}
  .notification.show{transform:translateX(0);}
  .notification.success{border-left-color:#10b981;}
  .notification.error{border-left-color:#ef4444;}
`;
document.head.appendChild(notifStyles);
