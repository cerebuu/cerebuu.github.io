import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * NameBlocks
 * ----------------------------------------------------------------
 * Spells a name as real, upright letter shapes, each a physics
 * body via objects.add(). Positioned along the tile path (see
 * IntroSection.setTiles — tiles run along -Y from near spawn) so
 * the car reaches it after a short drive instead of seeing it
 * immediately at the start screen.
 * ----------------------------------------------------------------
 */
const FONT_URL = 'https://unpkg.com/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json'

export default class NameBlocks
{
    constructor(_options)
    {
        this.objects = _options.objects
        this.time = _options.time

        this.options = {
            name: _options.name || 'CALEB',
            letterSize: 1.4,
            letterThickness: 0.5,
            spacingPadding: 0.35,
            mass: 6,
            position: _options.position || new THREE.Vector3(0, -14, 0),
            rotation: _options.rotation || new THREE.Euler(0, 0, 0)
        }

        this.blocks = []
        this.font = null

        this._loadFontAndBuild()
    }

    _loadFontAndBuild()
    {
        const loader = new FontLoader()
        loader.load(
            FONT_URL,
            (_font) =>
            {
                this.font = _font
                this._build()
            },
            undefined,
            (_error) =>
            {
                console.error('NameBlocks: font failed to load', _error)
            }
        )
    }

    _build()
    {
        const letters = this.options.name.split('')

        const letterData = letters.map((_char) =>
        {
            if(_char === ' ')
            {
                return { char: _char, width: this.options.letterSize * 0.6, geometry: null }
            }

            const geometry = new TextGeometry(_char, {
                font: this.font,
                size: this.options.letterSize,
                height: this.options.letterThickness,
                curveSegments: 6,
                bevelEnabled: false
            })

            geometry.rotateX(Math.PI * 0.5)

            geometry.computeBoundingBox()
            const box = geometry.boundingBox
            const width = box.max.x - box.min.x
            const depth = box.max.y - box.min.y
            const height = box.max.z - box.min.z

            geometry.translate(
                -(box.min.x + width * 0.5),
                -(box.min.y + depth * 0.5),
                -box.min.z
            )

            return { char: _char, width, depth, height, geometry }
        })

        const totalWidth = letterData.reduce((sum, l) => sum + l.width, 0)
            + this.options.spacingPadding * (letterData.length - 1)
        let cursorX = -totalWidth * 0.5

        letterData.forEach((_letter) =>
        {
            if(_letter.geometry)
            {
                const offset = this.options.position.clone().add(
                    new THREE.Vector3(cursorX + _letter.width * 0.5, 0, 0)
                )
                const block = this.createBlock(_letter, offset, this.options.rotation)
                this.blocks.push(block)
            }

            cursorX += _letter.width + this.options.spacingPadding
        })
    }

    createBlock(_letter, _offset, _rotation)
    {
        const visualMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.45,
            metalness: 0.1
        })
        const visualMesh = new THREE.Mesh(_letter.geometry, visualMaterial)

        const base = new THREE.Object3D()
        base.add(visualMesh)

        const collisionGeometry = new THREE.BoxGeometry(1, 1, 1)
        const collisionMesh = new THREE.Mesh(collisionGeometry)
        collisionMesh.scale.set(_letter.width, _letter.depth, _letter.height)
        collisionMesh.position.z = _letter.height * 0.5
        collisionMesh.name = 'cube'

        const collision = new THREE.Object3D()
        collision.add(collisionMesh)

        return this.objects.add({
            base,
            collision,
            offset: _offset,
            rotation: _rotation,
            mass: this.options.mass,
            sleep: true,
            shadow: { sizeX: _letter.width, sizeY: _letter.depth, offsetZ: 0, alpha: 0.4 },
            soundName: 'brick'
        })
    }

    reset()
    {
        for(const _block of this.blocks)
        {
            _block.collision.reset()
        }
    }
}
