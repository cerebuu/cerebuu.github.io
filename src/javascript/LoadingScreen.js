export default class LoadingScreen
{
    constructor(_options)
    {
        this.resources = _options.resources

        this.$element = document.querySelector('.js-loading-screen')
        this.$percent = document.querySelector('.js-loading-percent')
        this.$bar = document.querySelector('.js-loading-bar')
        this.$skip = document.querySelector('.js-loading-skip')

        if(!this.$element)
        {
            return
        }

        this.bindEvents()
    }

    bindEvents()
    {
        this.resources.on('progress', (_progress) =>
        {
            this.setProgress(_progress)
        })

        this.resources.on('ready', () =>
        {
            this.setProgress(1)
            this.hide()
        })

        if(this.$skip)
        {
            this.$skip.addEventListener('click', () =>
            {
                const toggle = document.querySelector('.js-resume-toggle')
                if(toggle)
                {
                    toggle.click()
                }
            })
        }
    }

    setProgress(_progress)
    {
        const percent = Math.round(_progress * 100)

        if(this.$percent)
        {
            this.$percent.textContent = `${percent}%`
        }

        if(this.$bar)
        {
            this.$bar.style.width = `${percent}%`
        }
    }

    hide()
    {
        if(this.$element)
        {
            this.$element.classList.add('is-hidden')
        }
    }
}
