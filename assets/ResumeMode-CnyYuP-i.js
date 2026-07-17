import{c as i}from"./index-BkhPQG9b.js";class l{constructor(){this.$toggle=document.querySelector(".js-resume-toggle"),this.$overlay=document.querySelector(".js-resume-overlay"),this.$nav=document.querySelector(".rm-nav"),this.$content=document.querySelector(".rm-content"),this.isActive=!1,!(!this.$toggle||!this.$overlay||!this.$nav||!this.$content)&&(this.render(),this.$closeButtons=document.querySelectorAll(".js-resume-close"),this.$sections=document.querySelectorAll(".rm-section"),this.$navLinks=document.querySelectorAll(".rm-nav a"),this.bindToggle(),this.bindScrollReveal(),this.bindNavHighlight())}render(){this.$nav.innerHTML=this.renderNav(),this.$content.innerHTML=this.renderAbout()+this.renderSkills()+this.renderProjects()+this.renderExperience()+this.renderCertifications()+this.renderContact()+this.renderFooter()}renderNav(){return`
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
        `}renderAbout(){const{name:t,title:e,bio:s}=i.about;return`
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
                ${i.skills.map(e=>`
            <div class="rm-skills-group">
                <h3>${e.group}</h3>
                <div class="rm-skills-tags">
                    ${e.tags.map(s=>`<span class="interactive-hover interactive-hover--opacity">${s}</span>`).join("")}
                </div>
            </div>
        `).join("")}
            </section>
        `}renderProjects(){return`
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${i.projects.map(e=>{const s=e.link?`<span class="rm-project-link interactive-hover interactive-hover--opacity${e.link.disabled?" is-disabled":""}">${e.link.text}</span>`:"";return`
                <div class="rm-project">
                    <div class="rm-project-header">
                        <h3>${e.title}</h3>
                        <span class="rm-project-status">${e.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${e.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${e.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${e.impact}</p>
                    <div class="rm-project-tags">${e.tags.map(r=>`<span>${r}</span>`).join("")}</div>
                    ${s}
                </div>
            `}).join("")}
            </section>
        `}renderExperience(){return`
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">experience</span>
                <h2>Where I've worked</h2>
                ${i.experience.map(e=>`
            <div class="rm-timeline-item">
                <h3>${e.role}</h3>
                <div class="rm-org">${e.org}</div>
                <div class="rm-dates">${e.dates}</div>
                <ul>
                    ${e.bullets.map(s=>`<li>${s}</li>`).join("")}
                </ul>
            </div>
        `).join("")}
            </section>
        `}renderCertifications(){return`
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">certifications</span>
                <h2>Certifications &amp; recognition</h2>
                ${i.certifications.map(e=>`
            <div class="rm-cert-group">
                <h3>${e.group}</h3>
                <ul>
                    ${e.items.map(s=>`<li>${s}</li>`).join("")}
                </ul>
            </div>
        `).join("")}
            </section>
        `}renderContact(){return`
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${i.contact.map(e=>{const r=e.href.startsWith("http")?' target="_blank" rel="noopener"':"";return`
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
        `}bindToggle(){this.$toggle.addEventListener("click",()=>{this.toggle()}),this.$closeButtons.forEach(t=>{t.addEventListener("click",()=>{this.close()})}),window.location.hash==="#resume"&&this.open()}toggle(){this.isActive?this.close():this.open()}open(){this.isActive=!0,this.$overlay.classList.add("is-active"),this.$toggle.textContent="Explore 3D World",document.body.style.overflow="hidden"}close(){this.isActive=!1,this.$overlay.classList.remove("is-active"),this.$toggle.textContent="Resume Mode",document.body.style.overflow=""}bindScrollReveal(){if(!("IntersectionObserver"in window)||this.$sections.length===0){this.$sections.forEach(e=>e.classList.add("is-visible"));return}const t=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&s.target.classList.add("is-visible")})},{threshold:.15});this.$sections.forEach(e=>t.observe(e))}bindNavHighlight(){if(!("IntersectionObserver"in window)||this.$navLinks.length===0)return;const t={};this.$navLinks.forEach(s=>{const r=s.getAttribute("href").replace("#","");t[r]=s});const e=new IntersectionObserver(s=>{s.forEach(r=>{const n=t[r.target.id];n&&r.isIntersecting&&(this.$navLinks.forEach(o=>o.classList.remove("is-active")),n.classList.add("is-active"))})},{threshold:.4,root:this.$overlay});this.$sections.forEach(s=>{s.id&&e.observe(s)})}}export{l as default};
//# sourceMappingURL=ResumeMode-CnyYuP-i.js.map
