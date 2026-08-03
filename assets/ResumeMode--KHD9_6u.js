import{c as o}from"./index-BiuhKWdN.js";import"./debug-vendor-DYGKXP-V.js";import"./three-vendor-BEBCUPdy.js";import"./motion-vendor-DjKJqAo0.js";import"./three-examples-vendor-DV7Fnw5Q.js";import"./physics-vendor-xJPXo_LE.js";import"./audio-vendor-CZjnqYNJ.js";class ${constructor(){this.$toggle=document.querySelector(".js-resume-toggle"),this.$overlay=document.querySelector(".js-resume-overlay"),this.$nav=document.querySelector(".rm-nav"),this.$content=document.querySelector(".rm-content"),this.isActive=!1,this.$previousFocus=null,this.$backgroundSurfaces=Array.from(document.querySelectorAll(".nav-dock, .contact-icons, .controls-panel")),this.handleKeydown=this.handleKeydown.bind(this),!(!this.$toggle||!this.$overlay||!this.$nav||!this.$content)&&(this.render(),this.prepareStagger(),this.buildSnowLayer(),this.buildProgressRail(),this.$closeButtons=document.querySelectorAll(".js-resume-close"),this.$sections=document.querySelectorAll(".rm-section"),this.$navLinks=document.querySelectorAll(".rm-nav a"),this.bindToggle(),this.bindSkipLink(),this.bindScrollReveal(),this.bindNavHighlight(),this.bindScrollProgress(),window.__resumeModeRequested&&(window.__resumeModeRequested=!1,this.open({focusTarget:"heading"})))}render(){this.$nav.innerHTML=this.renderNav(),this.$content.innerHTML=this.renderAbout()+this.renderSkills()+this.renderProjects()+this.renderActivities()+this.renderExperience()+this.renderCertifications()+this.renderContact()+this.renderFooter()}prepareStagger(){document.querySelectorAll(".rm-skills-group").forEach(t=>{t.querySelectorAll(".rm-skills-tags span").forEach((e,s)=>{e.style.setProperty("--stagger-index",s)})}),document.querySelectorAll(".rm-section").forEach(t=>{t.querySelectorAll(".rm-timeline-item, .rm-project, .rm-cert-card").forEach((e,s)=>{e.style.setProperty("--stagger-index",s)})})}buildSnowLayer(){this.$snowCanvas=document.createElement("canvas"),this.$snowCanvas.className="rm-snow-layer",this.$overlay.insertBefore(this.$snowCanvas,this.$overlay.firstChild),this.snowContext=this.$snowCanvas.getContext("2d"),this.snowParticles=[],this.snowParticleCount=70,this.snowAnimationId=null;const t=()=>{this.$snowCanvas.width=window.innerWidth,this.$snowCanvas.height=window.innerHeight};t(),window.addEventListener("resize",t);for(let e=0;e<this.snowParticleCount;e++)this.snowParticles.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,radius:.6+Math.random()*1.8,speed:.15+Math.random()*.4,drift:Math.random()*.4-.2})}startSnowAnimation(){if(this.snowAnimationId)return;const t=()=>{const e=this.snowContext;e.clearRect(0,0,this.$snowCanvas.width,this.$snowCanvas.height),e.fillStyle="rgba(255, 255, 255, 0.7)",this.snowParticles.forEach(s=>{s.y+=s.speed,s.x+=s.drift,s.y>this.$snowCanvas.height&&(s.y=-4,s.x=Math.random()*this.$snowCanvas.width),e.beginPath(),e.arc(s.x,s.y,s.radius,0,Math.PI*2),e.fill()}),this.snowAnimationId=window.requestAnimationFrame(t)};t()}stopSnowAnimation(){this.snowAnimationId&&(window.cancelAnimationFrame(this.snowAnimationId),this.snowAnimationId=null)}buildProgressRail(){this.$progressRail=document.createElement("div"),this.$progressRail.className="rm-progress-rail",this.$progressRail.innerHTML='<div class="rm-progress-rail-fill"></div>',this.$overlay.appendChild(this.$progressRail),this.$progressFill=this.$progressRail.querySelector(".rm-progress-rail-fill")}bindScrollProgress(){this.$overlay.addEventListener("scroll",()=>{const t=this.$overlay.scrollHeight-this.$overlay.clientHeight,e=t>0?this.$overlay.scrollTop/t:0;this.$progressFill.style.height=`${Math.min(100,Math.max(0,e*100))}%`})}renderNav(){return`
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-activities">Activities</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
        `}renderAbout(){const{name:t,title:e,bio:s}=o.about;return`
            <section class="rm-section rm-hero" id="rm-about">
                <span class="rm-eyebrow">whoami</span>
                <h1 class="rm-name">${t}<span class="rm-cursor">&nbsp;</span></h1>
                <div class="rm-title">${e}</div>
                <p class="rm-bio">${s}</p>
            </section>
        `}renderSkills(){return`
            <section class="rm-section" id="rm-skills">
                <span class="rm-eyebrow">skills</span>
                <h2>What I work with</h2>
                <div class="rm-skills-grid">
                    ${o.skills.map(e=>{const s=e.tags.map(r=>`<span class="interactive-hover interactive-hover--opacity">${r.name||r}</span>`).join("");return`
                <div class="rm-skills-group">
                    <h3>${e.group}</h3>
                    <div class="rm-skills-tags">
                        ${s}
                    </div>
                </div>
            `}).join("")}
                </div>
            </section>
        `}renderProjectLink(t){return t?t.disabled||!t.href?`<span class="rm-project-link is-disabled">${t.text}</span>`:`<a class="rm-project-link" href="${t.href}" target="_blank" rel="noopener">${t.text}</a>`:""}escapeXml(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}certificatePreviewSrc(t){const e=this.escapeXml(t.title),s=this.escapeXml(t.issuer),r=this.escapeXml(t.issueDate||t.year||"2026"),i=`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img" aria-label="${e} certificate preview">
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
        <text x="98" y="76" fill="#ffffff" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700">${e}</text>
        <text x="32" y="122" fill="#d7d7d7" font-family="JetBrains Mono, monospace" font-size="11">${s}</text>
        <text x="32" y="146" fill="#8b8b8b" font-family="JetBrains Mono, monospace" font-size="10">Issued ${r}</text>
        <rect x="238" y="122" width="50" height="28" rx="14" fill="#ffffff" fill-opacity="0.14" />
        <text x="263" y="141" fill="#ffffff" font-family="JetBrains Mono, monospace" font-size="10" text-anchor="middle">VIEW</text>
      </svg>
    `;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(i)}`}statusDotClass(t){const e=t.toLowerCase();return e.includes("progress")||e.includes("soon")?"rm-status-dot--active":e.includes("private")?"rm-status-dot--private":"rm-status-dot--static"}renderProjects(){return`
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${o.projects.map((e,s)=>{const r=e.links||{},i=this.renderProjectLink(r.demo||e.link),n=this.renderProjectLink(r.repository||e.repo),a=String(s+1).padStart(2,"0"),l=this.statusDotClass(e.status);return`
                <div class="rm-project">
                    <span class="rm-project-number">MISSION ${a}</span>
                    <div class="rm-project-header">
                        <h3>${e.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${l}"></span>${e.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${e.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${e.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${e.impact}</p>
                    <div class="rm-project-tags">${e.tags.map(c=>`<span>${c}</span>`).join("")}</div>
                    <div class="rm-project-links">
                      ${i}
                      ${n}
                    </div>
                </div>
            `}).join("")}
            </section>
        `}renderActivities(){return`
            <section class="rm-section" id="rm-activities">
                <span class="rm-eyebrow">activities</span>
                <h2>Hands-on practice</h2>
                ${o.activities.map((e,s)=>{const r=e.link?`<a class="rm-project-link interactive-hover interactive-hover--opacity" href="${e.link.href}" target="_blank" rel="noopener">${e.link.text}</a>`:"",i=this.statusDotClass(e.status);return`
                <div class="rm-project rm-activity-card" id="rm-activity-${s}">
                    <div class="rm-project-header">
                        <h3>${e.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${i}"></span>${e.status}</span>
                    </div>
                    <p class="rm-project-line">${e.description}</p>
                    <div class="rm-project-tags">${e.tags.map(n=>`<span>${n}</span>`).join("")}</div>
                    ${r}
                </div>
            `}).join("")}
            </section>
        `}renderExperience(){return`
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">quest log</span>
                <h2>Where I've worked</h2>
                ${o.experience.map(e=>{const s=e.bullets.map(r=>"<li>"+r+"</li>").join("");return['<div class="rm-timeline-item">',`<h3>${e.role}</h3>`,`<div class="rm-org">${e.org}</div>`,`<div class="rm-dates">${e.dates}</div>`,`<ul>${s}</ul>`,"</div>"].join(`
`)}).join("")}
            </section>
        `}renderCertifications(){return`
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">achievements unlocked</span>
                <h2>Certifications &amp; recognition</h2>
                ${o.certifications.map(e=>{const s=e.items.map(r=>{const i=this.certificatePreviewSrc(r),n=r.credentialUrl?`<a class="rm-cert-link" href="${r.credentialUrl}" target="_blank" rel="noopener">View credential</a>`:'<span class="rm-cert-link is-disabled">Credential unavailable</span>';return`
              <article class="rm-cert-card">
                  <img class="rm-cert-preview" src="${i}" alt="${r.title} certificate preview">
                  <div class="rm-cert-copy">
                      <div class="rm-cert-meta">${r.issuer} · ${r.issueDate}</div>
                      <h3>${r.title}</h3>
                      <div class="rm-cert-actions">
                          ${n}
                      </div>
                  </div>
              </article>
            `}).join("");return`
            <div class="rm-cert-group">
                <h3>${e.year}</h3>
                <div class="rm-cert-list">
                    ${s}
                </div>
            </div>
        `}).join("")}
            </section>
        `}renderContact(){return`
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${o.contact.map(e=>{const r=e.href.startsWith("http")?' target="_blank" rel="noopener"':"";return`
                <a class="interactive-hover interactive-hover--opacity" href="${e.href}"${r}>
                    <span class="rm-contact-label">${e.label}</span>
                    <span>${e.value}</span>
                </a>
            `}).join("")}
                </div>
            </section>
        `}renderFooter(){return`
            <div class="rm-footer">
                <button class="rm-explore-btn js-resume-close interactive-hover interactive-hover--scale" type="button">Enter the 3D world &rarr;</button>
            </div>
        `}bindToggle(){this.$toggle.addEventListener("click",()=>{this.toggle()}),this.$closeButtons.forEach(t=>{t.addEventListener("click",()=>{this.close()})}),window.location.hash==="#resume"&&this.open()}toggle(){this.isActive?this.close():this.open()}open(t={}){const e=t.focusTarget||"close";if(this.isActive){this.focusInitialElement(e);return}this.isActive=!0,this.$previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this.$overlay.classList.add("is-active"),this.$overlay.setAttribute("aria-hidden","false"),this.$toggle.textContent="Explore 3D World",document.body.style.overflow="hidden",this.setBackgroundInteractivity(!0),document.addEventListener("keydown",this.handleKeydown),this.startSnowAnimation(),window.requestAnimationFrame(()=>{this.focusInitialElement(e)})}close(){this.isActive&&(this.isActive=!1,this.$overlay.classList.remove("is-active"),this.$overlay.setAttribute("aria-hidden","true"),this.$toggle.textContent="Resume Mode",document.body.style.overflow="",document.removeEventListener("keydown",this.handleKeydown),this.setBackgroundInteractivity(!1),this.stopSnowAnimation(),this.$previousFocus instanceof HTMLElement&&this.$previousFocus.focus({preventScroll:!0}),this.$previousFocus=null)}bindSkipLink(){const t=document.querySelectorAll(".js-skip-link");t.length!==0&&t.forEach(e=>{e.addEventListener("click",s=>{s.preventDefault(),this.open({focusTarget:"heading"})})})}handleKeydown(t){if(!this.isActive)return;if(t.key==="Escape"){t.preventDefault(),this.close();return}if(t.key!=="Tab")return;const e=this.getFocusableElements();if(e.length===0)return;const s=e[0],r=e[e.length-1];t.shiftKey&&document.activeElement===s?(t.preventDefault(),r.focus()):!t.shiftKey&&document.activeElement===r&&(t.preventDefault(),s.focus())}getFocusableElements(){return Array.from(this.$overlay.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))}setBackgroundInteractivity(t){this.$backgroundSurfaces.forEach(e=>{e.classList.toggle("is-hidden-by-resume",t),e.setAttribute("aria-hidden",t?"true":"false"),"inert"in e&&(e.inert=t),e.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach(r=>{if(t){if(!r.hasAttribute("data-rm-tabindex")){const i=r.getAttribute("tabindex");r.setAttribute("data-rm-tabindex",i===null?"__none__":i)}r.setAttribute("tabindex","-1")}else if(r.hasAttribute("data-rm-tabindex")){const i=r.getAttribute("data-rm-tabindex");i==="__none__"?r.removeAttribute("tabindex"):r.setAttribute("tabindex",i),r.removeAttribute("data-rm-tabindex")}})})}focusInitialElement(t){if(t==="heading"){const s=document.getElementById("rm-about");if(s){s.hasAttribute("tabindex")||s.setAttribute("tabindex","-1"),s.focus({preventScroll:!0}),s.scrollIntoView({behavior:"smooth",block:"start"});return}}const e=this.$closeButtons[0]||this.$navLinks[0];e&&e.focus({preventScroll:!0})}bindScrollReveal(){if(!("IntersectionObserver"in window)||this.$sections.length===0){this.$sections.forEach(e=>e.classList.add("is-visible"));return}const t=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&s.target.classList.add("is-visible")})},{threshold:.15});this.$sections.forEach(e=>t.observe(e))}bindNavHighlight(){if(!("IntersectionObserver"in window)||this.$navLinks.length===0)return;const t={};this.$navLinks.forEach(s=>{const r=s.getAttribute("href").replace("#","");t[r]=s});const e=new IntersectionObserver(s=>{s.forEach(r=>{const i=t[r.target.id];i&&r.isIntersecting&&(this.$navLinks.forEach(n=>n.classList.remove("is-active")),i.classList.add("is-active"))})},{threshold:.4,root:this.$overlay});this.$sections.forEach(s=>{s.id&&e.observe(s)})}}export{$ as default};
//# sourceMappingURL=ResumeMode--KHD9_6u.js.map
