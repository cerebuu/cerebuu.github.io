export default class NavDock
{
    constructor(_options)
    {
        this.world = _options.world

        // Real 3D-world teleport targets (matches World/index.js setSections() coordinates)
        this.teleportTargets = {
            home: { x: 0, y: 0, z: 12 },
            projects: { x: 30, y: -30, z: 12 },
            contact: { x: 1.2, y: -55, z: 12 },
            playground: { x: -38, y: -34, z: 12 },
            activities: { x: 1.2, y: -60, z: 12 }
        }

        // Sections that only exist in Resume Mode, not the 3D world
        this.resumeOnlyTargets = ['about', 'skills', 'experience']

        this.element = document.querySelector('.js-nav-dock')

        if(!this.element)
        {
            return
        }

        this.bindEvents()
    }

    bindEvents()
    {
        const buttons = this.element.querySelectorAll('.nav-dock__item')

        buttons.forEach((button) =>
        {
            button.addEventListener('click', () =>
            {
                this.goTo(button.dataset.target)
                this.setActive(button)
            })
        })
    }

    setActive(_activeButton)
    {
        const buttons = this.element.querySelectorAll('.nav-dock__item')
        buttons.forEach((button) => button.classList.remove('is-active'))
        _activeButton.classList.add('is-active')
    }

    reveal()
    {
        if(this.element)
        {
            this.element.classList.add('is-visible')
        }

        const contactIcons = document.querySelector('.js-contact-icons')
        if(contactIcons)
        {
            contactIcons.classList.add('is-visible')
        }
    }

    goTo(_name)
    {
        if(this.resumeOnlyTargets.includes(_name))
        {
            this.openResumeAt(_name)
            return
        }

        this.teleportTo(_name)
    }

    openResumeAt(_anchorId)
    {
        const toggle = document.querySelector('.js-resume-toggle, .rm-toggle')

        if(toggle)
        {
            toggle.click()
        }

        window.setTimeout(() =>
        {
            const target = document.getElementById(`rm-${_anchorId}`)
            if(target)
            {
                target.scrollIntoView({ behavior: 'smooth' })
            }
        }, 400)
    }

    teleportTo(_name)
    {
        const destination = this.teleportTargets[_name]

        if(!destination)
        {
            return
        }

        if(!this.world.physics || !this.world.physics.car)
        {
            return
        }

        const body = this.world.physics.car.chassis.body

        body.sleep()
        body.position.set(destination.x, destination.y, destination.z)
        body.velocity.set(0, 0, 0)
        body.angularVelocity.set(0, 0, 0)

        window.setTimeout(() =>
        {
            body.wakeUp()
        }, 300)

        if(this.world.camera && this.world.camera.angle)
        {
            this.world.camera.angle.set(_name === 'projects' ? 'projects' : 'default')
        }
    }
}
