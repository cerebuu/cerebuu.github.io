import * as THREE from 'three'

import Area from './Area.js'

export default class Areas
{
    constructor(_options)
    {
        // Options
        this.config = _options.config
        this.resources = _options.resources
        this.car = _options.car
        this.sounds = _options.sounds
        this.renderer = _options.renderer
        this.camera = _options.camera
        this.time = _options.time
        this.debug = _options.debug

        // Set up
        this.items = []
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setMouse()
        window.addEventListener('mobile-interact', () =>
        {
            const area = this.mouse.currentArea || this.items.find((_area) => _area.isIn && _area.active)
            if(area)
            {
                area.interact(false)
            }
        })
    }

    setMouse()
    {
        // Set up
        this.mouse = {}
        this.mouse.raycaster = new THREE.Raycaster()
        this.mouse.coordinates = new THREE.Vector2()
        this.mouse.currentArea = null
        this.mouse.needsUpdate = false

        // Mouse move event
        window.addEventListener('mousemove', (_event) =>
        {
            this.mouse.coordinates.x = (_event.clientX / window.innerWidth) * 2 - 1
            this.mouse.coordinates.y = - (_event.clientY / window.innerHeight) * 2 + 1

            this.mouse.needsUpdate = true
        })

        // Mouse click event
        window.addEventListener('mousedown', () =>
        {
            if(!this.config.touch && this.mouse.currentArea)
            {
                this.mouse.currentArea.interact(false)
            }
        })

        // Touch
        this.renderer.domElement.addEventListener('touchstart', (_event) =>
        {
            const touch = _event.changedTouches[0]
            if(!touch)
            {
                return
            }

            this.mouse.touchStart = { x: touch.clientX, y: touch.clientY }
            this.setTouchCoordinates(touch)
        })

        this.renderer.domElement.addEventListener('touchend', (_event) =>
        {
            const touch = _event.changedTouches[0]
            if(!touch || !this.mouse.touchStart)
            {
                return
            }

            const distance = Math.hypot(touch.clientX - this.mouse.touchStart.x, touch.clientY - this.mouse.touchStart.y)
            this.mouse.touchStart = null

            // A short tap selects an area. Opening is deliberately delegated to
            // the dedicated Interact button so looking around never opens a link.
            if(distance < 18)
            {
                this.setTouchCoordinates(touch)
                this.updateCurrentArea()

            }
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            // Only update if needed
            if(this.mouse.needsUpdate)
            {
                this.mouse.needsUpdate = false

                this.updateCurrentArea()
            }
        })
    }

    setTouchCoordinates(_touch)
    {
        this.mouse.coordinates.x = (_touch.clientX / window.innerWidth) * 2 - 1
        this.mouse.coordinates.y = - (_touch.clientY / window.innerHeight) * 2 + 1
        this.mouse.needsUpdate = true
    }

    updateCurrentArea()
    {
        this.mouse.needsUpdate = false
        this.mouse.raycaster.setFromCamera(this.mouse.coordinates, this.camera.instance)
        const objects = this.items.map((_area) => _area.mouseMesh)
        const intersects = this.mouse.raycaster.intersectObjects(objects)

        if(intersects.length)
        {
            const area = this.items.find((_area) => _area.mouseMesh === intersects[0].object)

            if(area !== this.mouse.currentArea)
            {
                if(this.mouse.currentArea !== null)
                {
                    this.mouse.currentArea.out()
                    this.mouse.currentArea.testCar = this.mouse.currentArea.initialTestCar
                }

                this.mouse.currentArea = area
                this.mouse.currentArea.in(false)
                this.mouse.currentArea.testCar = false
            }
        }
        else if(this.mouse.currentArea !== null)
        {
            this.mouse.currentArea.out()
            this.mouse.currentArea.testCar = this.mouse.currentArea.initialTestCar
            this.mouse.currentArea = null
        }
    }

    add(_options)
    {
        const area = new Area({
            config: this.config,
            renderer: this.renderer,
            resources: this.resources,
            car: this.car,
            sounds: this.sounds,
            time: this.time,
            hasKey: true,
            testCar: true,
            active: true,
            ..._options
        })

        this.container.add(area.container)

        this.items.push(area)

        return area
    }
}
