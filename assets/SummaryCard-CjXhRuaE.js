import{c as n}from"./index-BkhPQG9b.js";class a{constructor(){this.content=n,this.storageKey="summaryCardDismissed",this.showDelay=1200,!this.wasDismissedThisSession()&&(this.buildElement(),this.bindEvents(),window.setTimeout(()=>{this.show()},this.showDelay))}wasDismissedThisSession(){try{return window.sessionStorage.getItem(this.storageKey)==="true"}catch{return!1}}markDismissed(){try{window.sessionStorage.setItem(this.storageKey,"true")}catch{}}buildElement(){const{name:e,title:s,bioShort:t,featuredSkills:i}=this.content;this.$element=document.createElement("div"),this.$element.className="sc-card",this.$element.innerHTML=`
            <button class="sc-close interactive-fade" type="button" aria-label="Dismiss">&times;</button>
            <div class="sc-eyebrow">30-second summary</div>
            <div class="sc-name">${e}</div>
            <div class="sc-title">${s}</div>
            <p class="sc-bio">${t}</p>
            <div class="sc-skills">
                ${i.map(o=>`<span>${o}</span>`).join("")}
            </div>
            <button class="sc-cta js-sc-cta interactive-scale" type="button">See my work &rarr;</button>
        `,document.body.appendChild(this.$element)}bindEvents(){this.$element.querySelector(".sc-close").addEventListener("click",()=>{this.dismiss()}),this.$element.querySelector(".js-sc-cta").addEventListener("click",()=>{this.dismiss(),document.querySelector(".js-resume-toggle")&&window.resumeMode&&(window.resumeMode.open(),window.setTimeout(()=>{const s=document.getElementById("rm-projects");s&&s.scrollIntoView({behavior:"smooth"})},400))})}show(){this.$element.classList.add("is-visible")}dismiss(){this.$element.classList.remove("is-visible"),this.markDismissed(),window.setTimeout(()=>{this.$element.remove()},400)}}export{a as default};
//# sourceMappingURL=SummaryCard-CjXhRuaE.js.map
