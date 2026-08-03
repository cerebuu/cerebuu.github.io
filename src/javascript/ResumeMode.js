/**
 * ResumeMode
 * A fast, scrollable, text-first alternative to the 3D world.
 * Toggled via a fixed button; independent of the Three.js scene,
 * so it works even before/while the 3D world is still loading.
 *
 * Renders all content dynamically from ../content.js — edit that
 * file to update resume content, no HTML editing required.
 */
import content from "../content.js";

export default class ResumeMode {
  constructor() {
    this.$toggle = document.querySelector(".js-resume-toggle");
    this.$overlay = document.querySelector(".js-resume-overlay");
    this.$nav = document.querySelector(".rm-nav");
    this.$content = document.querySelector(".rm-content");

    this.isActive = false;
    this.$previousFocus = null;
    this.$backgroundSurfaces = Array.from(
      document.querySelectorAll(".nav-dock, .contact-icons, .controls-panel"),
    );
    this.handleKeydown = this.handleKeydown.bind(this);

    if (!this.$toggle || !this.$overlay || !this.$nav || !this.$content) {
      return;
    }

    this.render();
    this.prepareStagger();
    this.buildSnowLayer();
    this.buildProgressRail();

    this.$closeButtons = document.querySelectorAll(".js-resume-close");
    this.$sections = document.querySelectorAll(".rm-section");
    this.$navLinks = document.querySelectorAll(".rm-nav a");

    this.bindToggle();
    this.bindSkipLink();
    this.bindScrollReveal();
    this.bindNavHighlight();
    this.bindScrollProgress();

    if (window.__resumeModeRequested) {
      window.__resumeModeRequested = false;
      this.open({ focusTarget: "heading" });
    }
  }

  render() {
    this.$nav.innerHTML = this.renderNav();
    this.$content.innerHTML =
      this.renderAbout() +
      this.renderSkills() +
      this.renderProjects() +
      this.renderActivities() +
      this.renderExperience() +
      this.renderCertifications() +
      this.renderContact() +
      this.renderFooter();
  }

  /**
   * Staggered reveals — instead of every section snapping in as one
   * flat block, each section's own children (skill tags, timeline
   * items, project/activity cards, cert groups) get an index-based
   * CSS custom property. resume.css uses it to delay each child's
   * transition, so items cascade in sequence when the parent
   * .rm-section crosses the IntersectionObserver threshold, rather
   * than all appearing simultaneously.
   */
  prepareStagger() {
    document.querySelectorAll(".rm-skills-group").forEach(($group) => {
      $group.querySelectorAll(".rm-skills-tags span").forEach(($tag, i) => {
        $tag.style.setProperty("--stagger-index", i);
      });
    });

    document.querySelectorAll(".rm-section").forEach(($section) => {
      $section
        .querySelectorAll(".rm-timeline-item, .rm-project, .rm-cert-card")
        .forEach(($item, i) => {
          $item.style.setProperty("--stagger-index", i);
        });
    });
  }

  /**
   * Snow layer — a lightweight canvas of drifting particles behind
   * the content. This ties Resume Mode visually to the 3D world's
   * one real signature effect, instead of feeling like a separate
   * page that happens to also be black.
   */
  buildSnowLayer() {
    this.$snowCanvas = document.createElement("canvas");
    this.$snowCanvas.className = "rm-snow-layer";
    this.$overlay.insertBefore(this.$snowCanvas, this.$overlay.firstChild);

    this.snowContext = this.$snowCanvas.getContext("2d");
    this.snowParticles = [];
    this.snowParticleCount = 70;
    this.snowAnimationId = null;

    const resize = () => {
      this.$snowCanvas.width = window.innerWidth;
      this.$snowCanvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < this.snowParticleCount; i++) {
      this.snowParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0.6 + Math.random() * 1.8,
        speed: 0.15 + Math.random() * 0.4,
        drift: Math.random() * 0.4 - 0.2,
      });
    }
  }

  startSnowAnimation() {
    if (this.snowAnimationId) {
      return;
    }

    const step = () => {
      const ctx = this.snowContext;
      ctx.clearRect(0, 0, this.$snowCanvas.width, this.$snowCanvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";

      this.snowParticles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += particle.drift;

        if (particle.y > this.$snowCanvas.height) {
          particle.y = -4;
          particle.x = Math.random() * this.$snowCanvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      this.snowAnimationId = window.requestAnimationFrame(step);
    };

    step();
  }

  stopSnowAnimation() {
    if (this.snowAnimationId) {
      window.cancelAnimationFrame(this.snowAnimationId);
      this.snowAnimationId = null;
    }
  }

  /**
   * Scroll progress rail — a thin vertical fill next to the nav
   * dock showing how far through the resume you've moved, like a
   * level-progress bar rather than a plain browser scrollbar.
   */
  buildProgressRail() {
    this.$progressRail = document.createElement("div");
    this.$progressRail.className = "rm-progress-rail";
    this.$progressRail.innerHTML = '<div class="rm-progress-rail-fill"></div>';
    this.$overlay.appendChild(this.$progressRail);

    this.$progressFill = this.$progressRail.querySelector(
      ".rm-progress-rail-fill",
    );
  }

  bindScrollProgress() {
    this.$overlay.addEventListener("scroll", () => {
      const scrollable =
        this.$overlay.scrollHeight - this.$overlay.clientHeight;
      const ratio = scrollable > 0 ? this.$overlay.scrollTop / scrollable : 0;

      this.$progressFill.style.height = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    });
  }

  renderNav() {
    return `
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-activities">Activities</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
        `;
  }

  renderAbout() {
    const { name, title, bio } = content.about;

    return `
            <section class="rm-section rm-hero" id="rm-about">
                <span class="rm-eyebrow">whoami</span>
                <h1 class="rm-name">${name}<span class="rm-cursor">&nbsp;</span></h1>
                <div class="rm-title">${title}</div>
                <p class="rm-bio">${bio}</p>
            </section>
        `;
  }

  renderSkills() {
    const groups = content.skills
      .map((group) => {
        const tags = group.tags
          .map(
            (tag) =>
              `<span class="interactive-hover interactive-hover--opacity">${tag.name || tag}</span>`,
          )
          .join("");

        return `
                <div class="rm-skills-group">
                    <h3>${group.group}</h3>
                    <div class="rm-skills-tags">
                        ${tags}
                    </div>
                </div>
            `;
      })
      .join("");

    return `
            <section class="rm-section" id="rm-skills">
                <span class="rm-eyebrow">skills</span>
                <h2>What I work with</h2>
                <div class="rm-skills-grid">
                    ${groups}
                </div>
            </section>
        `;
  }

  renderProjectLink(_link) {
    if (!_link) {
      return "";
    }

    if (_link.disabled || !_link.href) {
      return `<span class="rm-project-link is-disabled">${_link.text}</span>`;
    }

    return `<a class="rm-project-link" href="${_link.href}" target="_blank" rel="noopener">${_link.text}</a>`;
  }

  escapeXml(_value) {
    return String(_value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  certificatePreviewSrc(_certificate) {
    const title = this.escapeXml(_certificate.title);
    const issuer = this.escapeXml(_certificate.issuer);
    const year = this.escapeXml(
      _certificate.issueDate || _certificate.year || "2026",
    );

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="${title} certificate preview">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#101010" />
            <stop offset="100%" stop-color="#000000" />
          </linearGradient>
          <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.04" />
          </linearGradient>
        </defs>
        <rect width="320" height="180" rx="18" fill="url(#g)" />
        <rect x="16" y="16" width="288" height="148" rx="14" fill="url(#s)" stroke="rgba(255,255,255,0.18)" />
        <circle cx="58" cy="58" r="22" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" />
        <circle cx="58" cy="58" r="12" fill="#ffffff" fill-opacity="0.12" />
        <text x="98" y="52" fill="#ffffff" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="2">CERTIFICATE</text>
        <text x="98" y="76" fill="#ffffff" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700">${title}</text>
        <text x="32" y="122" fill="#d7d7d7" font-family="JetBrains Mono, monospace" font-size="11">${issuer}</text>
        <text x="32" y="146" fill="#8b8b8b" font-family="JetBrains Mono, monospace" font-size="10">Issued ${year}</text>
        <rect x="238" y="122" width="50" height="28" rx="14" fill="#ffffff" fill-opacity="0.14" />
        <text x="263" y="141" fill="#ffffff" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle">VIEW</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  /**
   * Maps a project's plain-text status to a small visual dot —
   * pulsing for active work, a hollow square for private repos,
   * solid for settled/academic ones — instead of just gray text.
   */
  statusDotClass(status) {
    const normalized = status.toLowerCase();

    if (normalized.includes("progress") || normalized.includes("soon")) {
      return "rm-status-dot--active";
    }

    if (normalized.includes("private")) {
      return "rm-status-dot--private";
    }

    return "rm-status-dot--static";
  }

  renderProjects() {
    const projects = content.projects
      .map((project, index) => {
        const projectLinks = project.links || {};
        const demoLink = this.renderProjectLink(
          projectLinks.demo || project.link,
        );
        const repoLink = this.renderProjectLink(
          projectLinks.repository || project.repo,
        );

        const number = String(index + 1).padStart(2, "0");
        const dotClass = this.statusDotClass(project.status);

        return `
                <div class="rm-project">
                    <span class="rm-project-number">MISSION ${number}</span>
                    <div class="rm-project-header">
                        <h3>${project.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${dotClass}"></span>${project.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${project.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${project.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${project.impact}</p>
                    <div class="rm-project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
                    <div class="rm-project-links">
                      ${demoLink}
                      ${repoLink}
                    </div>
                </div>
            `;
      })
      .join("");

    return `
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${projects}
            </section>
        `;
  }

  /**
   * Activities — one card per entry in content.activities (sourced
   * from src/activities/index.js). Each card's id must stay as
   * `rm-activity-${index}` — this is what ActivityBoards.js scrolls
   * to when you interact with the matching board in the 3D world.
   */
  renderActivities() {
    const cards = content.activities
      .map((activity, index) => {
        const link = activity.link
          ? `<a class="rm-project-link interactive-hover interactive-hover--opacity" href="${activity.link.href}" target="_blank" rel="noopener">${activity.link.text}</a>`
          : "";

        const dotClass = this.statusDotClass(activity.status);

        return `
                <div class="rm-project rm-activity-card" id="rm-activity-${index}">
                    <div class="rm-project-header">
                        <h3>${activity.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${dotClass}"></span>${activity.status}</span>
                    </div>
                    <p class="rm-project-line">${activity.description}</p>
                    <div class="rm-project-tags">${activity.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
                    ${link}
                </div>
            `;
      })
      .join("");

    return `
            <section class="rm-section" id="rm-activities">
                <span class="rm-eyebrow">activities</span>
                <h2>Hands-on practice</h2>
                ${cards}
            </section>
        `;
  }

  renderExperience() {
    const items = content.experience
      .map((job) => {
        const bullets = job.bullets
          .map((bullet) => "<li>" + bullet + "</li>")
          .join("");

        return [
          '<div class="rm-timeline-item">',
          `<h3>${job.role}</h3>`,
          `<div class="rm-org">${job.org}</div>`,
          `<div class="rm-dates">${job.dates}</div>`,
          `<ul>${bullets}</ul>`,
          "</div>",
        ].join("\n");
      })
      .join("");

    return `
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">quest log</span>
                <h2>Where I've worked</h2>
                ${items}
            </section>
        `;
  }

  renderCertifications() {
    const groups = content.certifications
      .map((group) => {
        const cards = group.items
          .map((certificate) => {
            const previewSrc = this.certificatePreviewSrc(certificate);
            const credentialLink = certificate.credentialUrl
              ? `<a class="rm-cert-link" href="${certificate.credentialUrl}" target="_blank" rel="noopener">View credential</a>`
              : `<span class="rm-cert-link is-disabled">Credential unavailable</span>`;

            return `
              <article class="rm-cert-card">
                  <img class="rm-cert-preview" src="${previewSrc}" alt="${certificate.title} certificate preview">
                  <div class="rm-cert-copy">
                      <div class="rm-cert-meta">${certificate.issuer} · ${certificate.issueDate}</div>
                      <h3>${certificate.title}</h3>
                      <div class="rm-cert-actions">
                          ${credentialLink}
                      </div>
                  </div>
              </article>
            `;
          })
          .join("");

        return `
            <div class="rm-cert-group">
                <h3>${group.year}</h3>
                <div class="rm-cert-list">
                    ${cards}
                </div>
            </div>
        `;
      })
      .join("");

    return `
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">achievements unlocked</span>
                <h2>Certifications &amp; recognition</h2>
                ${groups}
            </section>
        `;
  }

  renderContact() {
    const links = content.contact
      .map((item) => {
        const isExternal = item.href.startsWith("http");
        const attrs = isExternal ? ' target="_blank" rel="noopener"' : "";

        return `
                <a class="interactive-hover interactive-hover--opacity" href="${item.href}"${attrs}>
                    <span class="rm-contact-label">${item.label}</span>
                    <span>${item.value}</span>
                </a>
            `;
      })
      .join("");

    return `
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${links}
                </div>
            </section>
        `;
  }

  renderFooter() {
    return `
            <div class="rm-footer">
                <button class="rm-explore-btn js-resume-close interactive-hover interactive-hover--scale" type="button">Enter the 3D world &rarr;</button>
            </div>
        `;
  }

  bindToggle() {
    this.$toggle.addEventListener("click", () => {
      this.toggle();
    });

    this.$closeButtons.forEach(($button) => {
      $button.addEventListener("click", () => {
        this.close();
      });
    });

    // Allow deep-linking / auto-open via #resume in the URL
    if (window.location.hash === "#resume") {
      this.open();
    }
  }

  toggle() {
    this.isActive ? this.close() : this.open();
  }

  open(_options = {}) {
    const focusTarget = _options.focusTarget || "close";

    if (this.isActive) {
      this.focusInitialElement(focusTarget);
      return;
    }

    this.isActive = true;
    this.$previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.$overlay.classList.add("is-active");
    this.$overlay.setAttribute("aria-hidden", "false");
    this.$toggle.textContent = "Explore 3D World";
    document.body.style.overflow = "hidden";
    this.setBackgroundInteractivity(true);
    document.addEventListener("keydown", this.handleKeydown);
    this.startSnowAnimation();

    window.requestAnimationFrame(() => {
      this.focusInitialElement(focusTarget);
    });
  }

  close() {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;
    this.$overlay.classList.remove("is-active");
    this.$overlay.setAttribute("aria-hidden", "true");
    this.$toggle.textContent = "Resume Mode";
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.handleKeydown);
    this.setBackgroundInteractivity(false);
    this.stopSnowAnimation();

    if (this.$previousFocus instanceof HTMLElement) {
      this.$previousFocus.focus({ preventScroll: true });
    }

    this.$previousFocus = null;
  }

  /**
   * Skip link: for keyboard/screen-reader users, jumps straight
   * into Resume Mode (the real semantic HTML version of this site)
   * instead of leaving them stuck on an unlabeled WebGL canvas.
   */
  bindSkipLink() {
    const $skipLinks = document.querySelectorAll(".js-skip-link");

    if ($skipLinks.length === 0) {
      return;
    }

    $skipLinks.forEach(($skipLink) => {
      $skipLink.addEventListener("click", (event) => {
        event.preventDefault();
        this.open({ focusTarget: "heading" });
      });
    });
  }

  handleKeydown(event) {
    if (!this.isActive) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusables = this.getFocusableElements();

    if (focusables.length === 0) {
      return;
    }

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  getFocusableElements() {
    return Array.from(
      this.$overlay.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    );
  }

  setBackgroundInteractivity(_isHidden) {
    this.$backgroundSurfaces.forEach(($surface) => {
      $surface.classList.toggle("is-hidden-by-resume", _isHidden);
      $surface.setAttribute("aria-hidden", _isHidden ? "true" : "false");

      if ("inert" in $surface) {
        $surface.inert = _isHidden;
      }

      const focusables = $surface.querySelectorAll(
        "a, button, input, select, textarea, [tabindex]",
      );

      focusables.forEach(($focusable) => {
        if (_isHidden) {
          if (!$focusable.hasAttribute("data-rm-tabindex")) {
            const currentTabIndex = $focusable.getAttribute("tabindex");
            $focusable.setAttribute(
              "data-rm-tabindex",
              currentTabIndex === null ? "__none__" : currentTabIndex,
            );
          }

          $focusable.setAttribute("tabindex", "-1");
        } else if ($focusable.hasAttribute("data-rm-tabindex")) {
          const previousTabIndex = $focusable.getAttribute("data-rm-tabindex");

          if (previousTabIndex === "__none__") {
            $focusable.removeAttribute("tabindex");
          } else {
            $focusable.setAttribute("tabindex", previousTabIndex);
          }

          $focusable.removeAttribute("data-rm-tabindex");
        }
      });
    });
  }

  focusInitialElement(_focusTarget) {
    if (_focusTarget === "heading") {
      const $hero = document.getElementById("rm-about");

      if ($hero) {
        if (!$hero.hasAttribute("tabindex")) {
          $hero.setAttribute("tabindex", "-1");
        }

        $hero.focus({ preventScroll: true });
        $hero.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    const $focusTarget = this.$closeButtons[0] || this.$navLinks[0];

    if ($focusTarget) {
      $focusTarget.focus({ preventScroll: true });
    }
  }

  bindScrollReveal() {
    if (!("IntersectionObserver" in window) || this.$sections.length === 0) {
      // Fallback: just show everything if the browser can't observe
      this.$sections.forEach(($section) =>
        $section.classList.add("is-visible"),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    this.$sections.forEach(($section) => observer.observe($section));
  }

  bindNavHighlight() {
    if (!("IntersectionObserver" in window) || this.$navLinks.length === 0) {
      return;
    }

    const linksByTarget = {};
    this.$navLinks.forEach(($link) => {
      const id = $link.getAttribute("href").replace("#", "");
      linksByTarget[id] = $link;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linksByTarget[entry.target.id];
          if (!link) {
            return;
          }

          if (entry.isIntersecting) {
            this.$navLinks.forEach(($l) => $l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { threshold: 0.4, root: this.$overlay },
    );

    this.$sections.forEach(($section) => {
      if ($section.id) {
        observer.observe($section);
      }
    });
  }
}
