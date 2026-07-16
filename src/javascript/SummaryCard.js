import content from '../content.js'

/**
 * SummaryCard
 * The "read this in 30 seconds" card — appears in a fixed corner
 * shortly after load, on top of the intro/loading screen or the
 * 3D world, so a recruiter never has to explore to get the basics.
 * Dismissible; stays dismissed for the rest of the browser session.
 */
export default class SummaryCard
{
    constructor()
    {
        this.content = content
        this.storageKey = 'summaryCardDismissed'
        this.showDelay = 1200 // ms — let the loading screen breathe first

        if(this.wasDismissedThisSession())
        {
            return
        }

        this.buildElement()
        this.bindEvents()

        window.setTimeout(() =>
        {
            this.show()
        }, this.showDelay)
    }

    wasDismissedThisSession()
    {
        try
        {
            return window.sessionStorage.getItem(this.storageKey) === 'true'
        }
        catch(error)
        {
            // Storage unavailable (private browsing etc.) — just always show it
            return false
        }
    }

    markDismissed()
    {
        try
        {
            window.sessionStorage.setItem(this.storageKey, 'true')
        }
        catch(error)
        {
            // Ignore — non-critical
        }
    }

    buildElement()
    {
        const { name, title, bioShort, featuredSkills } = this.content

        this.$element = document.createElement('div')
        this.$element.className = 'sc-card'
        this.$element.innerHTML = `
            <button class="sc-close" type="button" aria-label="Dismiss">&times;</button>
            <div class="sc-eyebrow">30-second summary</div>
            <div class="sc-name">${name}</div>
            <div class="sc-title">${title}</div>
            <p class="sc-bio">${bioShort}</p>
            <div class="sc-skills">
                ${featuredSkills.map((skill) => `<span>${skill}</span>`).join('')}
            </div>
            <button class="sc-cta js-sc-cta" type="button">See my work &rarr;</button>
        `

        document.body.appendChild(this.$element)
    }

    bindEvents()
    {
        this.$element.querySelector('.sc-close').addEventListener('click', () =>
        {
            this.dismiss()
        })

        this.$element.querySelector('.js-sc-cta').addEventListener('click', () =>
        {
            this.dismiss()

            // Open Resume Mode and jump straight to Projects
            const resumeToggle = document.querySelector('.js-resume-toggle')
            if(resumeToggle && window.resumeMode)
            {
                window.resumeMode.open()
                window.setTimeout(() =>
                {
                    const projectsSection = document.getElementById('rm-projects')
                    if(projectsSection)
                    {
                        projectsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 400)
            }
        })
    }

    show()
    {
        this.$element.classList.add('is-visible')
    }

    dismiss()
    {
        this.$element.classList.remove('is-visible')
        this.markDismissed()

        window.setTimeout(() =>
        {
            this.$element.remove()
        }, 400)
    }
}
