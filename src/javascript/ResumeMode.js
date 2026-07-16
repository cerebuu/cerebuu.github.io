/**
 * ResumeMode
 * A fast, scrollable, text-first alternative to the 3D world.
 * Toggled via a fixed button; independent of the Three.js scene,
 * so it works even before/while the 3D world is still loading.
 *
 * Renders all content dynamically from ../content.js — edit that
 * file to update resume content, no HTML editing required.
 */
import content from '../content.js'

export default class ResumeMode
{
    constructor()
    {
        this.$toggle = document.querySelector('.js-resume-toggle')
        this.$overlay = document.querySelector('.js-resume-overlay')
        this.$nav = document.querySelector('.rm-nav')
        this.$content = document.querySelector('.rm-content')

        this.isActive = false

        if(!this.$toggle || !this.$overlay || !this.$nav || !this.$content)
        {
            return
        }

        this.render()

        this.$closeButtons = document.querySelectorAll('.js-resume-close')
        this.$sections = document.querySelectorAll('.rm-section')
        this.$navLinks = document.querySelectorAll('.rm-nav a')

        this.bindToggle()
        this.bindScrollReveal()
        this.bindNavHighlight()
    }

    render()
    {
        this.$nav.innerHTML = this.renderNav()
        this.$content.innerHTML =
            this.renderAbout() +
            this.renderSkills() +
            this.renderProjects() +
            this.renderExperience() +
            this.renderCertifications() +
            this.renderContact() +
            this.renderFooter()
    }

    renderNav()
    {
        return `
            <a href="#rm-about">About</a>
            <a href="#rm-skills">Skills</a>
            <a href="#rm-projects">Projects</a>
            <a href="#rm-experience">Experience</a>
            <a href="#rm-certifications">Certifications</a>
            <a href="#rm-contact">Contact</a>
        `
    }

    renderAbout()
    {
        const { name, title, bio } = content.about

        return `
            <section class="rm-section rm-hero" id="rm-about">
                <span class="rm-eyebrow">whoami</span>
                <h1 class="rm-name">${name}<span class="rm-cursor">&nbsp;</span></h1>
                <div class="rm-title">${title}</div>
                <p class="rm-bio">${bio}</p>
            </section>
        `
    }

    renderSkills()
    {
        const groups = content.skills.map((group) => `
            <div class="rm-skills-group">
                <h3>${group.group}</h3>
                <div class="rm-skills-tags">
                    ${group.tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `).join('')

        return `
            <section class="rm-section" id="rm-skills">
                <span class="rm-eyebrow">skills</span>
                <h2>What I work with</h2>
                ${groups}
            </section>
        `
    }

    renderProjects()
    {
        const projects = content.projects.map((project) => {
            const link = project.link
                ? `<span class="rm-project-link${project.link.disabled ? ' is-disabled' : ''}">${project.link.text}</span>`
                : ''

            return `
                <div class="rm-project">
                    <div class="rm-project-header">
                        <h3>${project.title}</h3>
                        <span class="rm-project-status">${project.status}</span>
                    </div>
                    <p class="rm-project-line"><strong>Problem:</strong> ${project.problem}</p>
                    <p class="rm-project-line"><strong>Solution:</strong> ${project.solution}</p>
                    <p class="rm-project-line"><strong>Impact:</strong> ${project.impact}</p>
                    <div class="rm-project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
                    ${link}
                </div>
            `
        }).join('')

        return `
            <section class="rm-section" id="rm-projects">
                <span class="rm-eyebrow">projects</span>
                <h2>Selected work</h2>
                ${projects}
            </section>
        `
    }

    renderExperience()
    {
        const items = content.experience.map((job) => `
            <div class="rm-timeline-item">
                <h3>${job.role}</h3>
                <div class="rm-org">${job.org}</div>
                <div class="rm-dates">${job.dates}</div>
                <ul>
                    ${job.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
                </ul>
            </div>
        `).join('')

        return `
            <section class="rm-section" id="rm-experience">
                <span class="rm-eyebrow">experience</span>
                <h2>Where I've worked</h2>
                ${items}
            </section>
        `
    }

    renderCertifications()
    {
        const groups = content.certifications.map((group) => `
            <div class="rm-cert-group">
                <h3>${group.group}</h3>
                <ul>
                    ${group.items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('')

        return `
            <section class="rm-section" id="rm-certifications">
                <span class="rm-eyebrow">certifications</span>
                <h2>Certifications &amp; recognition</h2>
                ${groups}
            </section>
        `
    }

    renderContact()
    {
        const links = content.contact.map((item) => {
            const isExternal = item.href.startsWith('http')
            const attrs = isExternal ? ' target="_blank" rel="noopener"' : ''

            return `
                <a href="${item.href}"${attrs}>
                    <span class="rm-contact-label">${item.label}</span>
                    <span>${item.value}</span>
                </a>
            `
        }).join('')

        return `
            <section class="rm-section" id="rm-contact">
                <span class="rm-eyebrow">contact</span>
                <h2>Get in touch</h2>
                <div class="rm-contact-links">
                    ${links}
                </div>
            </section>
        `
    }

    renderFooter()
    {
        return `
            <div class="rm-footer">
                <button class="rm-explore-btn js-resume-close" type="button">Enter the 3D world &rarr;</button>
            </div>
        `
    }

    bindToggle()
    {
        this.$toggle.addEventListener('click', () =>
        {
            this.toggle()
        })

        this.$closeButtons.forEach(($button) =>
        {
            $button.addEventListener('click', () =>
            {
                this.close()
            })
        })

        // Allow deep-linking / auto-open via #resume in the URL
        if(window.location.hash === '#resume')
        {
            this.open()
        }
    }

    toggle()
    {
        this.isActive ? this.close() : this.open()
    }

    open()
    {
        this.isActive = true
        this.$overlay.classList.add('is-active')
        this.$toggle.textContent = 'Explore 3D World'
        document.body.style.overflow = 'hidden'
    }

    close()
    {
        this.isActive = false
        this.$overlay.classList.remove('is-active')
        this.$toggle.textContent = 'Resume Mode'
        document.body.style.overflow = ''
    }

    bindScrollReveal()
    {
        if(!('IntersectionObserver' in window) || this.$sections.length === 0)
        {
            // Fallback: just show everything if the browser can't observe
            this.$sections.forEach(($section) => $section.classList.add('is-visible'))
            return
        }

        const observer = new IntersectionObserver((entries) =>
        {
            entries.forEach((entry) =>
            {
                if(entry.isIntersecting)
                {
                    entry.target.classList.add('is-visible')
                }
            })
        }, { threshold: 0.15 })

        this.$sections.forEach(($section) => observer.observe($section))
    }

    bindNavHighlight()
    {
        if(!('IntersectionObserver' in window) || this.$navLinks.length === 0)
        {
            return
        }

        const linksByTarget = {}
        this.$navLinks.forEach(($link) =>
        {
            const id = $link.getAttribute('href').replace('#', '')
            linksByTarget[id] = $link
        })

        const observer = new IntersectionObserver((entries) =>
        {
            entries.forEach((entry) =>
            {
                const link = linksByTarget[entry.target.id]
                if(!link)
                {
                    return
                }

                if(entry.isIntersecting)
                {
                    this.$navLinks.forEach(($l) => $l.classList.remove('is-active'))
                    link.classList.add('is-active')
                }
            })
        }, { threshold: 0.4, root: this.$overlay })

        this.$sections.forEach(($section) =>
        {
            if($section.id)
            {
                observer.observe($section)
            }
        })
    }
}
