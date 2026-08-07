import * as THREE from 'three'

/**
 * SnowTracks
 * ----------------------------------------------------------------
 * Original reinterpretation of Folio 2025's "Terrain (Tracks)"
 * concept — not a copy of its code, assets, or visuals. Instead
 * of painting into a texture (this project's floor is a single
 * procedural-gradient shader plane, not texture-mapped), each
 * wheel periodically leaves a small flat imprint mesh on the
 * ground that fades out over a few seconds, giving the snow a
 * sense of memory as the car drives through it.
 * ----------------------------------------------------------------
 */
export default class SnowTracks
{
    constructor(_options)
    {
        this.time = _options.time
        this.car = _options.car

        this.options = {
            spawnDistance: 0.6,      // world units the wheel must travel before a new mark spawns
            fadeDuration: 4,          // seconds a mark takes to fully fade out
            markWidth: 0.16,
            markLength: 0.32,
            maxMarks: 160,            // hard cap so this never grows unbounded
            color: 0x1a1a1a,
            baseOpacity: 0.35
        }

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.geometry = new THREE.PlaneGeometry(this.options.markWidth, this.options.markLength, 1, 1)

        this.marks = []
        this.lastSpawnPositions = [null, null, null, null]

        this.time.on('tick', () => { this.update() })
    }

    update()
    {
        if(!this.car || !this.car.wheels || !this.car.wheels.items)
        {
            return
        }

        for(let i = 0; i < this.car.wheels.items.length; i++)
        {
            const wheel = this.car.wheels.items[i]
            const position = wheel.position

            const lastPosition = this.lastSpawnPositions[i]

            if(!lastPosition || lastPosition.distanceTo(position) > this.options.spawnDistance)
            {
                this.spawnMark(position, wheel.quaternion)
                this.lastSpawnPositions[i] = position.clone()
            }
        }

        // Age and fade existing marks
        for(let i = this.marks.length - 1; i >= 0; i--)
        {
            const mark = this.marks[i]
            mark.age += this.time.delta * 0.001

            if(mark.age >= this.options.fadeDuration)
            {
                this.container.remove(mark.mesh)
                mark.mesh.material.dispose()
                this.marks.splice(i, 1)
                continue
            }

            const progress = mark.age / this.options.fadeDuration
            mark.mesh.material.opacity = this.options.baseOpacity * (1 - progress)
        }
    }

    spawnMark(_position, _quaternion)
    {
        // Recycle oldest mark if we're at the cap
        if(this.marks.length >= this.options.maxMarks)
        {
            const oldest = this.marks.shift()
            this.container.remove(oldest.mesh)
            oldest.mesh.material.dispose()
        }

        const material = new THREE.MeshBasicMaterial({
            color: this.options.color,
            transparent: true,
            opacity: this.options.baseOpacity,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
        })

        const mesh = new THREE.Mesh(this.geometry, material)
        mesh.position.set(_position.x, _position.y, 0.01)

        // Match the wheel's heading (yaw around Z — this world is Z-up)
        const euler = new THREE.Euler().setFromQuaternion(_quaternion, 'XYZ')
        mesh.rotation.z = euler.z

        mesh.matrixAutoUpdate = true

        this.container.add(mesh)
        this.marks.push({ mesh, age: 0 })
    }
}
