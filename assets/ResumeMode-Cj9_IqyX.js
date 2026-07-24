import{c as r}from"./index-Du_TR9R7.js";class h{constructor(){this.$toggle=document.querySelector(".js-resume-toggle"),this.$overlay=document.querySelector(".js-resume-overlay"),this.$nav=document.querySelector(".rm-nav"),this.$content=document.querySelector(".rm-content"),this.isActive=!1,!(!this.$toggle||!this.$overlay||!this.$nav||!this.$content)&&(this.render(),this.buildSnowLayer(),this.buildProgressRail(),this.$closeButtons=document.querySelectorAll(".js-resume-close"),this.$sections=document.querySelectorAll(".rm-section"),this.$navLinks=document.querySelectorAll(".rm-nav a"),this.bindToggle(),this.bindSkipLink(),this.bindScrollReveal(),this.bindNavHighlight(),this.bindScrollProgress())}render(){this.$nav.innerHTML=this.renderNav(),this.$content.innerHTML=this.renderAbout()+this.renderSkills()+this.renderProjects()+this.renderExperience()+this.renderCertifications()+this.renderContact()+this.renderFooter()}buildSnowLayer(){this.$snowCanvas=document.createElement("canvas"),this.$snowCanvas.className="rm-snow-layer",this.$overlay.insertBefore(this.$snowCanvas,this.$overlay.firstChild),this.snowContext=this.$snowCanvas.getContext("2d"),this.snowParticles=[],this.snowParticleCount=70,this.snowAnimationId=null;const e=()=>{this.$snowCanvas.width=window.innerWidth,this.$snowCanvas.height=window.innerHeight};e(),window.addEventListener("resize",e);for(let s=0;s<this.snowParticleCount;s++)this.snowParticles.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,radius:.6+Math.random()*1.8,speed:.15+Math.random()*.4,drift:Math.random()*.4-.2})}startSnowAnimation(){if(this.snowAnimationId)return;const e=()=>{const s=this.snowContext;s.clearRect(0,0,this.$snowCanvas.width,this.$snowCanvas.height),s.fillStyle="rgba(255, 255, 255, 0.7)",this.snowParticles.forEach(t=>{t.y+=t.speed,t.x+=t.drift,t.y>this.$snowCanvas.height&&(t.y=-4,t.x=Math.random()*this.$snowCanvas.width),s.beginPath(),s.arc(t.x,t.y,t.radius,0,Math.PI*2),s.fill()}),this.snowAnimationId=window.requestAnimationFrame(e)};e()}stopSnowAnimation(){this.snowAnimationId&&(window.cancelAnimationFrame(this.snowAnimationId),this.snowAnimationId=null)}buildProgressRail(){this.$progressRail=document.createElement("div"),this.$progressRail.className="rm-progress-rail",this.$progressRail.innerHTML='<div class="rm-progress-rail-fill"></div>',this.$overlay.appendChild(this.$progressRail),this.$progressFill=this.$progressRail.querySelector(".rm-progress-rail-fill")}bindScrollProgress(){this.$overlay.addEventListener("scroll",()=>{const e=this.$overlay.scrollHeight-this.$overlay.clientHeight,s=e>0?this.$overlay.scrollTop/e:0;this.$progressFill.style.height=`${Math.min(100,Math.max(0,s*100))}%`})}renderNav(){return`
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
        `}renderAbout(){const{name:e,title:s,bio:t}=r.about;return`
            <section class="rm-section rm-hero" id="rm-about">
                <span class="rm-eyebrow">whoami</span>
                <h1 class="rm-name">${e}<span class="rm-cursor">&nbsp;</span></h1>
                <div class="rm-title">${s}</div>
                <p class="rm-bio">${t}</p>
            </section>
        `}renderSkills(){return`
            <section class="rm-section" id="rm-skills">
                <span class="rm-eyebrow">skills</span>
                <h2>What I work with</h2>
                ${r.skills.map(s=>`
            <div class="rm-skills-group">
                <h3>${s.group}</h3>
                <div class="rm-skills-tags">
                    ${s.tags.map(t=>`<span class="interactive-hover interactive-hover--opacity">${t}</span>`).join("")}
                </div>
            </div>
        `).join("")}
            </section>
        `}statusDotClass(e){const s=e.toLowerCase();return s.includes("progress")||s.includes("soon")?"rm-status-dot--active":s.includes("private")?"rm-status-dot--private":"rm-status-dot--static"}renderProjects(){return`
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${r.projects.map((s,t)=>{const i=s.link?`<span class="rm-project-link interactive-hover interactive-hover--opacity${s.link.disabled?" is-disabled":""}">${s.link.text}</span>`:"",n=String(t+1).padStart(2,"0"),o=this.statusDotClass(s.status);return`
                <div class="rm-project">
                    <span class="rm-project-number">MISSION ${n}</span>
                    <div class="rm-project-header">
                        <h3>${s.title}</h3>
                        <span class="rm-project-status"><span class="rm-status-dot ${o}"></span>${s.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${s.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${s.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${s.impact}</p>
                    <div class="rm-project-tags">${s.tags.map(a=>`<span>${a}</span>`).join("")}</div>
                    ${i}
                </div>
            `}).join("")}
            </section>
        `}renderExperience(){return`
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">quest log</span>
                <h2>Where I've worked</h2>
                ${r.experience.map(s=>`
            <div class="rm-timeline-item">
                <h3>${s.role}</h3>
                <div class="rm-org">${s.org}</div>
                <div class="rm-dates">${s.dates}</div>
                <ul>
                    ${s.bullets.map(t=>`<li>${t}</li>`).join("")}
                </ul>
            </div>
        `).join("")}
            </section>
        `}renderCertifications(){return`
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">achievements unlocked</span>
                <h2>Certifications &amp; recognition</h2>
                ${r.certifications.map(s=>`
            <div class="rm-cert-group">
                <h3>${s.group}</h3>
                <ul>
                    ${s.items.map(t=>`<li>${t}</li>`).join("")}
                </ul>
            </div>
        `).join("")}
            </section>
        `}renderContact(){return`
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${r.contact.map(s=>{const i=s.href.startsWith("http")?' target="_blank" rel="noopener"':"";return`
                <a class="interactive-hover interactive-hover--opacity" href="${s.href}"${i}>
                    <span class="rm-contact-label">${s.label}</span>
                    <span>${s.value}</span>
                </a>
            `}).join("")}
                </div>
            </section>
        `}renderFooter(){return`
            <div class="rm-footer">
                <button class="rm-explore-btn js-resume-close interactive-hover interactive-hover--scale" type="button">Enter the 3D world &rarr;</button>
            </div>
        `}bindToggle(){this.$toggle.addEventListener("click",()=>{this.toggle()}),this.$closeButtons.forEach(e=>{e.addEventListener("click",()=>{this.close()})}),window.location.hash==="#resume"&&this.open()}toggle(){this.isActive?this.close():this.open()}open(){this.isActive=!0,this.$overlay.classList.add("is-active"),this.$overlay.setAttribute("aria-hidden","false"),this.$toggle.textContent="Explore 3D World",document.body.style.overflow="hidden",this.startSnowAnimation()}close(){this.isActive=!1,this.$overlay.classList.remove("is-active"),this.$overlay.setAttribute("aria-hidden","true"),this.$toggle.textContent="Resume Mode",document.body.style.overflow="",this.stopSnowAnimation()}bindSkipLink(){const e=document.querySelector(".js-skip-link");e&&e.addEventListener("click",s=>{s.preventDefault(),this.open(),window.setTimeout(()=>{const t=document.getElementById("rm-about");t&&(t.setAttribute("tabindex","-1"),t.focus(),t.scrollIntoView({behavior:"smooth",block:"start"}))},50)})}bindScrollReveal(){if(!("IntersectionObserver"in window)||this.$sections.length===0){this.$sections.forEach(s=>s.classList.add("is-visible"));return}const e=new IntersectionObserver(s=>{s.forEach(t=>{t.isIntersecting&&t.target.classList.add("is-visible")})},{threshold:.15});this.$sections.forEach(s=>e.observe(s))}bindNavHighlight(){if(!("IntersectionObserver"in window)||this.$navLinks.length===0)return;const e={};this.$navLinks.forEach(t=>{const i=t.getAttribute("href").replace("#","");e[i]=t});const s=new IntersectionObserver(t=>{t.forEach(i=>{const n=e[i.target.id];n&&i.isIntersecting&&(this.$navLinks.forEach(o=>o.classList.remove("is-active")),n.classList.add("is-active"))})},{threshold:.4,root:this.$overlay});this.$sections.forEach(t=>{t.id&&s.observe(t)})}}export{h as default};
//# sourceMappingURL=ResumeMode-Cj9_IqyX.js.map
