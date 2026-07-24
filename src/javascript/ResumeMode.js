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
        this.buildSnowLayer()
        this.buildProgressRail()

        this.$closeButtons = document.querySelectorAll('.js-resume-close')
        this.$sections = document.querySelectorAll('.rm-section')
        this.$navLinks = document.querySelectorAll('.rm-nav a')

        this.bindToggle()
        this.bindSkipLink()
        this.bindScrollReveal()
        this.bindNavHighlight()
        this.bindScrollProgress()
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

    /**
     * Snow layer — a lightweight canvas of drifting particles behind
     * the content. This ties Resume Mode visually to the 3D world's
     * one real signature effect, instead of feeling like a separate
     * page that happens to also be black.
     */
    buildSnowLayer()
    {
        this.$snowCanvas = document.createElement('canvas')
        this.$snowCanvas.className = 'rm-snow-layer'
        this.$overlay.insertBefore(this.$snowCanvas, this.$overlay.firstChild)

        this.snowContext = this.$snowCanvas.getContext('2d')
        this.snowParticles = []
        this.snowParticleCount = 70
        this.snowAnimationId = null

        const resize = () =>
        {
            this.$snowCanvas.width = window.innerWidth
            this.$snowCanvas.height = window.innerHeight
        }

        resize()
        window.addEventListener('resize', resize)

        for(let i = 0; i < this.snowParticleCount; i++)
        {
            this.snowParticles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: 0.6 + Math.random() * 1.8,
                speed: 0.15 + Math.random() * 0.4,
                drift: Math.random() * 0.4 - 0.2
            })
        }
    }

    startSnowAnimation()
    {
        if(this.snowAnimationId)
        {
            return
        }

        const step = () =>
        {
            const ctx = this.snowContext
            ctx.clearRect(0, 0, this.$snowCanvas.width, this.$snowCanvas.height)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'

            this.snowParticles.forEach((particle) =>
            {
                particle.y += particle.speed
                particle.x += particle.drift

                if(particle.y > this.$snowCanvas.height)
                {
                    particle.y = -4
                    particle.x = Math.random() * this.$snowCanvas.width
                }

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            this.snowAnimationId = window.requestAnimationFrame(step)
        }

        step()
    }

    stopSnowAnimation()
    {
        if(this.snowAnimationId)
        {
            window.cancelAnimationFrame(this.snowAnimationId)
            this.snowAnimationId = null
        }
    }

    /**
     * Scroll progress rail — a thin vertical fill next to the nav
     * dock showing how far through the resume you've moved, like a
     * level-progress bar rather than a plain browser scrollbar.
     */
    buildProgressRail()
    {
        this.$progressRail = document.createElement('div')
        this.$progressRail.className = 'rm-progress-rail'
        this.$progressRail.innerHTML = '<div class="rm-progress-rail-fill"></div>'
        this.$overlay.appendChild(this.$progressRail)

        this.$progressFill = this.$progressRail.querySelector('.rm-progress-rail-fill')
    }

    bindScrollProgress()
    {
        this.$overlay.addEventListener('scroll', () =>
        {
            const scrollable = this.$overlay.scrollHeight - this.$overlay.clientHeight
            const ratio = scrollable > 0 ? this.$overlay.scrollTop / scrollable : 0

            this.$progressFill.style.height = `${Math.min(100, Math.max(0, ratio * 100))}%`
        })
    }

    renderNav()
    {
        return `
            <a class="interactive-hover" href="#rm-about">About</a>
            <a class="interactive-hover" href="#rm-skills">Skills</a>
            <a class="interactive-hover" href="#rm-projects">Projects</a>
            <a class="interactive-hover" href="#rm-experience">Experience</a>
            <a class="interactive-hover" href="#rm-certifications">Certifications</a>
            <a class="interactive-hover" href="#rm-contact">Contact</a>
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
                    ${group.tags.map((tag) => `<span class="interactive-hover interactive-hover--opacity">${tag}</span>`).join('')}
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

    /**
     * Maps a project's plain-text status to a small visual dot —
     * pulsing for active work, a hollow square for private repos,
     * solid for settled/academic ones — instead of just gray text.
     */
    statusDotClass(status)
    {
        const normalized = status.toLowerCase()

        if(normalized.includes('progress') || normalized.includes('soon'))
        {
            return 'rm-status-dot--active'
        }

        if(normalized.includes('private'))
        {
            return 'rm-status-dot--private'
        }

        return 'rm-status-dot--static'
    }

    renderProjects()
    {
        const projects = content.projects.map((project, index) => {
            const link = project.link
                ? `<span class="rm-project-link interactive-hover interactive-hover--opacity${project.link.disabled ? ' is-disabled' :''}">${project.link.text}</span>`
                : ''

            const number = String(index + 1).padStart(2, '0')
            const dotClass = this.statusDotClass(project.status)

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
                <span class="rm-eyebrow">quest log</span>
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
                <span class="rm-eyebrow">achievements unlocked</span>
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
                <a class="interactive-hover interactive-hover--opacity" href="${item.href}"${attrs}>
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
                <button class="rm-explore-btn js-resume-close interactive-hover interactive-hover--scale" type="button">Enter the 3D world &rarr;</button>
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
        this.$overlay.setAttribute('aria-hidden', 'false')
        this.$toggle.textContent = 'Explore 3D World'
        document.body.style.overflow = 'hidden'
        this.startSnowAnimation()
    }

    close()
    {
        this.isActive = false
        this.$overlay.classList.remove('is-active')
        this.$overlay.setAttribute('aria-hidden', 'true')
        this.$toggle.textContent = 'Resume Mode'
        document.body.style.overflow = ''
        this.stopSnowAnimation()
    }

    /**
     * Skip link: for keyboard/screen-reader users, jumps straight
     * into Resume Mode (the real semantic HTML version of this site)
     * instead of leaving them stuck on an unlabeled WebGL canvas.
     */
    bindSkipLink()
    {
        const $skipLink = document.querySelector('.js-skip-link')

        if(!$skipLink)
        {
            return
        }

        $skipLink.addEventListener('click', (event) =>
        {
            event.preventDefault()
            this.open()

            // Give the overlay a moment to become visible/unhidden,
            // then move focus to the first heading so screen readers
            // announce real content immediately, not just an empty jump.
            window.setTimeout(() =>
            {
                const $firstHeading = document.getElementById('rm-about')

                if($firstHeading)
                {
                    $firstHeading.setAttribute('tabindex', '-1')
                    $firstHeading.focus()
                    $firstHeading.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 50)
        })
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
