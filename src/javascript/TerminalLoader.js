/**
 * TerminalLoader
 * A "compiling" loading screen showing real build-style output,
 * driven entirely by actual asset load events from Resources.js —
 * every line is a real file that just finished loading, not a
 * canned animation.
 */
export default class TerminalLoader
{
    constructor(_resources)
    {
        this.resources = _resources
        this.maxVisibleLines = 14

        if(!this.resources)
        {
            return
        }

        this.buildElement()

        this.resources.on('fileEnd', (_resource) =>
        {
            this.logLine(_resource)
        })

        this.resources.on('progress', (_ratio) =>
        {
            this.updateProgress(_ratio)
        })

        this.resources.on('ready', () =>
        {
            this.complete()
        })
    }

    buildElement()
    {
        this.$element = document.createElement('div')
        this.$element.className = 'tl-terminal'
        this.$element.innerHTML = `
            <div class="tl-header">
                <span class="tl-dot"></span>
                <span class="tl-dot"></span>
                <span class="tl-dot"></span>
                <span class="tl-title">building portfolio.world</span>
            </div>
            <div class="tl-lines js-tl-lines"></div>
            <div class="tl-status">
                <div class="tl-bar"><div class="tl-bar-fill js-tl-bar-fill"></div></div>
                <span class="js-tl-percent">0%</span>
            </div>
        `

        document.body.appendChild(this.$element)

        this.$lines = this.$element.querySelector('.js-tl-lines')
        this.$barFill = this.$element.querySelector('.js-tl-bar-fill')
        this.$percent = this.$element.querySelector('.js-tl-percent')
    }

    logLine(_resource)
    {
        const line = document.createElement('div')
        line.className = 'tl-line'
        line.innerHTML = `<span class="tl-prompt">&gt;</span> resolving <span class="tl-file">${_resource.name}</span>`

        this.$lines.appendChild(line)

        // Cap DOM size — keep it snappy even with 150+ assets
        while(this.$lines.children.length > this.maxVisibleLines)
        {
            this.$lines.removeChild(this.$lines.firstChild)
        }

        this.$lines.scrollTop = this.$lines.scrollHeight
    }

    updateProgress(_ratio)
    {
        const percent = Math.round(_ratio * 100)
        this.$barFill.style.width = `${percent}%`
        this.$percent.textContent = `${percent}%`
    }

    complete()
    {
        const line = document.createElement('div')
        line.className = 'tl-line tl-line--done'
        line.innerHTML = `<span class="tl-prompt">&gt;</span> build complete<span class="tl-cursor"></span>`
        this.$lines.appendChild(line)
        this.$lines.scrollTop = this.$lines.scrollHeight

        window.setTimeout(() =>
        {
            this.$element.classList.add('is-hidden')

            window.setTimeout(() =>
            {
                this.$element.remove()
            }, 500)
        }, 500)
    }
}
