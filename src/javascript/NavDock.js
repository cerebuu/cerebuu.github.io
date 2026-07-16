export default class NavDock
{
    constructor(_options)
    {
        this.world = _options.world

        // 'world' entries teleport the car to a section already built in the
        // 3D scene. 'resume' entries (About/Skills/Experience) don't have a
        // 3D area of their own, so those open the Resume Mode overlay and
        // scroll to the matching anchor instead.
        this.destinations = {
            home: { type: 'world', x: 0, y: 0, cameraAngle: 'default' },
            about: { type: 'resume', anchor: '#rm-about' },
            skills: { type: 'resume', anchor: '#rm-skills' },
            experience: { type: 'resume', anchor: '#rm-experience' },
            projects: { type: 'world', x: 30, y: - 30, cameraAngle: 'projects' },
            playground: { type: 'world', x: - 38, y: - 34, cameraAngle: 'default' },
            contact: { type: 'world', x: 1.2, y: - 55, cameraAngle: 'default' }
        }

        this.setElements()
        this.setEvents()
    }

    setElements()
    {
        this.$container = document.querySelector('.js-nav-dock')
        this.$items = this.$container ? [...this.$container.querySelectorAll('.nav-dock__item')] : []
    }

    setEvents()
    {
        if(!this.$container)
        {
            return
        }

        this.$items.forEach(($item) =>
        {
            $item.addEventListener('click', () =>
            {
                const target = $item.getAttribute('data-target')
                this.goTo(target)
            })
        })
    }

    goTo(_name)
    {
        const destination = this.destinations[_name]

        if(!destination)
        {
            return
        }

        if(destination.type === 'resume')
        {
            this.goToResume(destination)
        }
        else
        {
            this.goToWorld(destination)
        }

        this.setActive(_name)
    }

    goToWorld(_destination)
    {
        if(!this.world.physics)
        {
            return
        }

        if(window.resumeMode && window.resumeMode.isActive)
        {
            window.resumeMode.close()
        }

        const body = this.world.physics.car.chassis.body

        body.sleep()
        body.position.set(_destination.x, _destination.y, _destination.z || 4)
        body.velocity.set(0, 0, 0)
        body.angularVelocity.set(0, 0, 0)

        window.setTimeout(() =>
        {
            body.wakeUp()
        }, 300)

        if(this.world.camera && this.world.camera.angle)
        {
            this.world.camera.angle.set(_destination.cameraAngle || 'default')
        }
    }

    goToResume(_destination)
    {
        if(!window.resumeMode)
        {
            return
        }

        if(!window.resumeMode.isActive)
        {
            window.resumeMode.open()
        }

        window.requestAnimationFrame(() =>
        {
            const $target = document.querySelector(_destination.anchor)

            if($target)
            {
                $target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        })
    }

    setActive(_name)
    {
        this.$items.forEach(($item) =>
        {
            $item.classList.toggle('is-active', $item.getAttribute('data-target') === _name)
        })
    }

    reveal()
    {
        if(!this.$container)
        {
            return
        }

        this.$container.classList.add('is-visible')
    }
}
