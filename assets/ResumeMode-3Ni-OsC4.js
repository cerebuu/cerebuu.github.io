import{c as o}from"./index-DWcQxTE3.js";import"./debug-vendor-DYGKXP-V.js";import"./three-vendor-BEBCUPdy.js";import"./three-examples-vendor-DV7Fnw5Q.js";import"./motion-vendor-DjKJqAo0.js";import"./physics-vendor-xJPXo_LE.js";import"./audio-vendor-CZjnqYNJ.js";class g{constructor(){this.$toggle=document.querySelector(".js-resume-toggle"),this.$overlay=document.querySelector(".js-resume-overlay"),this.$nav=document.querySelector(".rm-nav"),this.$content=document.querySelector(".rm-content"),this.isActive=!1,this.$previousFocus=null,this.$backgroundSurfaces=Array.from(document.querySelectorAll(".nav-dock, .contact-icons")),this.handleKeydown=this.handleKeydown.bind(this),!(!this.$toggle||!this.$overlay||!this.$nav||!this.$content)&&(this.render(),this.prepareStagger(),this.buildSnowLayer(),this.buildProgressRail(),this.$closeButtons=document.querySelectorAll(".js-resume-close"),this.$sections=document.querySelectorAll(".rm-section"),this.$navLinks=document.querySelectorAll(".rm-nav a"),this.bindToggle(),this.bindSkipLink(),this.bindScrollReveal(),this.bindNavHighlight(),this.bindScrollProgress(),window.__resumeModeRequested&&(window.__resumeModeRequested=!1,this.open({focusTarget:"heading"})))}render(){this.$nav.innerHTML=this.renderNav(),this.$content.innerHTML=this.renderAbout()+this.renderSkills()+this.renderProjects()+this.renderActivities()+this.renderExperience()+this.renderCertifications()+this.renderContact()+this.renderFooter()}prepareStagger(){document.querySelectorAll(".rm-skills-group").forEach(e=>{e.querySelectorAll(".rm-skills-tags span").forEach((t,s)=>{t.style.setProperty("--stagger-index",s)})}),document.querySelectorAll(".rm-section").forEach(e=>{e.querySelectorAll(".rm-timeline-item, .rm-project, .rm-cert-group").forEach((t,s)=>{t.style.setProperty("--stagger-index",s)})})}buildSnowLayer(){this.$snowCanvas=document.createElement("canvas"),this.$snowCanvas.className="rm-snow-layer",this.$overlay.insertBefore(this.$snowCanvas,this.$overlay.firstChild),this.snowContext=this.$snowCanvas.getContext("2d"),this.snowParticles=[],this.snowParticleCount=70,this.snowAnimationId=null;const e=()=>{this.$snowCanvas.width=window.innerWidth,this.$snowCanvas.height=window.innerHeight};e(),window.addEventListener("resize",e);for(let t=0;t<this.snowParticleCount;t++)this.snowParticles.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,radius:.6+Math.random()*1.8,speed:.15+Math.random()*.4,drift:Math.random()*.4-.2})}startSnowAnimation(){if(this.snowAnimationId)return;const e=()=>{const t=this.snowContext;t.clearRect(0,0,this.$snowCanvas.width,this.$snowCanvas.height),t.fillStyle="rgba(255, 255, 255, 0.7)",this.snowParticles.forEach(s=>{s.y+=s.speed,s.x+=s.drift,s.y>this.$snowCanvas.height&&(s.y=-4,s.x=Math.random()*this.$snowCanvas.width),t.beginPath(),t.arc(s.x,s.y,s.radius,0,Math.PI*2),t.fill()}),this.snowAnimationId=window.requestAnimationFrame(e)};e()}stopSnowAnimation(){this.snowAnimationId&&(window.cancelAnimationFrame(this.snowAnimationId),this.snowAnimationId=null)}buildProgressRail(){this.$progressRail=document.createElement("div"),this.$progressRail.className="rm-progress-rail",this.$progressRail.innerHTML='<div class="rm-progress-rail-fill"></div>',this.$overlay.appendChild(this.$progressRail),this.$progressFill=this.$progressRail.querySelector(".rm-progress-rail-fill")}bindScrollProgress(){this.$overlay.addEventListener("scroll",()=>{const e=this.$overlay.scrollHeight-this.$overlay.clientHeight,t=e>0?this.$overlay.scrollTop/e:0;this.$progressFill.style.height=`${Math.min(100,Math.max(0,t*100))}%`})}renderNav(){return`
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-activities">Activities</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
        `}renderAbout(){const{name:e,title:t,bio:s}=o.about;return`
            <section class="rm-section rm-hero" id="rm-about">
                <span class="rm-eyebrow">whoami</span>
                <h1 class="rm-name">${e}<span class="rm-cursor">&nbsp;</span></h1>
                <div class="rm-title">${t}</div>
                <p class="rm-bio">${s}</p>
            </section>
        `}renderSkills(){const e=o.skills.map(i=>{const r=i.tags.filter(n=>!n.learning);return r.length===0?"":`
                <div class="rm-skills-group">
                    <h3>${i.group}</h3>
                    <div class="rm-skills-tags">
                        ${r.map(n=>`<span class="interactive-hover interactive-hover--opacity">${n.name}</span>`).join("")}
                    </div>
                </div>
            `}).join(""),t=o.skills.flatMap(i=>i.tags.filter(r=>r.learning)),s=t.length>0?`
            <div class="rm-skills-future">
                <h3>Future learning</h3>
                <div class="rm-skills-tags">
                    ${t.map(i=>`<span class="interactive-hover interactive-hover--opacity">${i.name}</span>`).join("")}
                </div>
            </div>
        `:"";return`
            <section class="rm-section" id="rm-skills">
                <span class="rm-eyebrow">skills</span>
                <h2>What I work with</h2>
                ${e}
                ${s}
            </section>
        `}statusDotClass(e){const t=e.toLowerCase();return t.includes("progress")||t.includes("soon")?"rm-status-dot--active":t.includes("private")?"rm-status-dot--private":"rm-status-dot--static"}renderProjects(){return`
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${o.projects.map((t,s)=>{const i=t.link?`<span class="rm-project-link interactive-hover interactive-hover--opacity${t.link.disabled?" is-disabled":""}">${t.link.text}</span>`:"",r=String(s+1).padStart(2,"0"),n=this.statusDotClass(t.status);return`
                <div class="rm-project">
                    <span class="rm-project-number">MISSION ${r}</span>
                    <div class="rm-project-header">
                        <h3>${t.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${n}"></span>${t.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${t.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${t.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${t.impact}</p>
                    <div class="rm-project-tags">${t.tags.map(a=>`<span>${a}</span>`).join("")}</div>
                    ${i}
                </div>
            `}).join("")}
            </section>
        `}renderActivities(){return`
            <section class="rm-section" id="rm-activities">
                <span class="rm-eyebrow">activities</span>
                <h2>Hands-on practice</h2>
                ${o.activities.map((t,s)=>{const i=t.link?`<a class="rm-project-link interactive-hover interactive-hover--opacity" href="${t.link.href}" target="_blank" rel="noopener">${t.link.text}</a>`:"",r=this.statusDotClass(t.status);return`
                <div class="rm-project rm-activity-card" id="rm-activity-${s}">
                    <div class="rm-project-header">
                        <h3>${t.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${r}"></span>${t.status}</span>
                    </div>
                    <p class="rm-project-line">${t.description}</p>
                    <div class="rm-project-tags">${t.tags.map(n=>`<span>${n}</span>`).join("")}</div>
                    ${i}
                </div>
            `}).join("")}
            </section>
        `}renderExperience(){return`
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">quest log</span>
                <h2>Where I've worked</h2>
                ${o.experience.map(t=>{const s=t.bullets.map(i=>"<li>"+i+"</li>").join("");return['<div class="rm-timeline-item">',`<h3>${t.role}</h3>`,`<div class="rm-org">${t.org}</div>`,`<div class="rm-dates">${t.dates}</div>`,`<ul>${s}</ul>`,"</div>"].join(`
`)}).join("")}
            </section>
        `}renderCertifications(){return`
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">achievements unlocked</span>
                <h2>Certifications &amp; recognition</h2>
                ${o.certifications.map(t=>`
            <div class="rm-cert-group">
                <h3>${t.group}</h3>
                <ul>
                    ${t.items.map(s=>`<li>${s}</li>`).join("")}
                </ul>
            </div>
        `).join("")}
            </section>
        `}renderContact(){return`
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${o.contact.map(t=>{const i=t.href.startsWith("http")?' target="_blank" rel="noopener"':"";return`
                <a class="interactive-hover interactive-hover--opacity" href="${t.href}"${i}>
                    <span class="rm-contact-label">${t.label}</span>
                    <span>${t.value}</span>
                </a>
            `}).join("")}
                </div>
            </section>
        `}renderFooter(){return`
            <div class="rm-footer">
                <button class="rm-explore-btn js-resume-close interactive-hover interactive-hover--scale" type="button">Enter the 3D world &rarr;</button>
            </div>
        `}bindToggle(){this.$toggle.addEventListener("click",()=>{this.toggle()}),this.$closeButtons.forEach(e=>{e.addEventListener("click",()=>{this.close()})}),window.location.hash==="#resume"&&this.open()}toggle(){this.isActive?this.close():this.open()}open(e={}){const t=e.focusTarget||"close";if(this.isActive){this.focusInitialElement(t);return}this.isActive=!0,this.$previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this.$overlay.classList.add("is-active"),this.$overlay.setAttribute("aria-hidden","false"),this.$toggle.textContent="Explore 3D World",document.body.style.overflow="hidden",this.setBackgroundInteractivity(!0),document.addEventListener("keydown",this.handleKeydown),this.startSnowAnimation(),window.requestAnimationFrame(()=>{this.focusInitialElement(t)})}close(){this.isActive&&(this.isActive=!1,this.$overlay.classList.remove("is-active"),this.$overlay.setAttribute("aria-hidden","true"),this.$toggle.textContent="Resume Mode",document.body.style.overflow="",document.removeEventListener("keydown",this.handleKeydown),this.setBackgroundInteractivity(!1),this.stopSnowAnimation(),this.$previousFocus instanceof HTMLElement&&this.$previousFocus.focus({preventScroll:!0}),this.$previousFocus=null)}bindSkipLink(){const e=document.querySelectorAll(".js-skip-link");e.length!==0&&e.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),this.open({focusTarget:"heading"})})})}handleKeydown(e){if(!this.isActive)return;if(e.key==="Escape"){e.preventDefault(),this.close();return}if(e.key!=="Tab")return;const t=this.getFocusableElements();if(t.length===0)return;const s=t[0],i=t[t.length-1];e.shiftKey&&document.activeElement===s?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s.focus())}getFocusableElements(){return Array.from(this.$overlay.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))}setBackgroundInteractivity(e){this.$backgroundSurfaces.forEach(t=>{t.classList.toggle("is-hidden-by-resume",e),t.setAttribute("aria-hidden",e?"true":"false"),"inert"in t&&(t.inert=e),t.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach(i=>{if(e){if(!i.hasAttribute("data-rm-tabindex")){const r=i.getAttribute("tabindex");i.setAttribute("data-rm-tabindex",r===null?"__none__":r)}i.setAttribute("tabindex","-1")}else if(i.hasAttribute("data-rm-tabindex")){const r=i.getAttribute("data-rm-tabindex");r==="__none__"?i.removeAttribute("tabindex"):i.setAttribute("tabindex",r),i.removeAttribute("data-rm-tabindex")}})})}focusInitialElement(e){if(e==="heading"){const s=document.getElementById("rm-about");if(s){s.hasAttribute("tabindex")||s.setAttribute("tabindex","-1"),s.focus({preventScroll:!0}),s.scrollIntoView({behavior:"smooth",block:"start"});return}}const t=this.$closeButtons[0]||this.$navLinks[0];t&&t.focus({preventScroll:!0})}bindScrollReveal(){if(!("IntersectionObserver"in window)||this.$sections.length===0){this.$sections.forEach(t=>t.classList.add("is-visible"));return}const e=new IntersectionObserver(t=>{t.forEach(s=>{s.isIntersecting&&s.target.classList.add("is-visible")})},{threshold:.15});this.$sections.forEach(t=>e.observe(t))}bindNavHighlight(){if(!("IntersectionObserver"in window)||this.$navLinks.length===0)return;const e={};this.$navLinks.forEach(s=>{const i=s.getAttribute("href").replace("#","");e[i]=s});const t=new IntersectionObserver(s=>{s.forEach(i=>{const r=e[i.target.id];r&&i.isIntersecting&&(this.$navLinks.forEach(n=>n.classList.remove("is-active")),r.classList.add("is-active"))})},{threshold:.4,root:this.$overlay});this.$sections.forEach(s=>{s.id&&t.observe(s)})}}export{g as default};
//# sourceMappingURL=ResumeMode-3Ni-OsC4.js.map
