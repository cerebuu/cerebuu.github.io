import * as THREE from 'three'
import content from '../../content.js'
import { openActivity } from '../Utils/resolveActivityLink.js'

/**
 * ActivityBoards
 * ----------------------------------------------------------------
 * One standing, interactive board per entry in content.activities.
 * Each board's texture is generated at runtime on a <canvas> and
 * used as an alphaMap — exactly the technique this project already
 * uses for the GitHub/LinkedIn/Mail labels (see InformationSection
 * setLinks()) — so visually it matches, and there's no image asset
 * to create/maintain per activity: add an entry to content.js and
 * a board appears automatically.
 *
 * Interacting with a specific board opens Resume Mode scrolled to
 * that exact activity (not just the general Activities section),
 * using the per-activity anchor ids ResumeMode now renders.
 * ----------------------------------------------------------------
 */
export default class ActivityBoards
{
    constructor(_options)
    {
        this.container = _options.container
        this.areas = _options.areas
        this.baseX = _options.x
        this.baseY = _options.y
        this.plaqueHalfHeight = _options.plaqueHalfHeight || 0

        const margin = 2.6

        this.options = {
            boardWidth: 3.6,
            boardHeight: 1.8,
            spacing: 4.2,
            standHeight: 2.0,
            rowY: this.baseY - this.plaqueHalfHeight - margin
        }

        this.boards = []
        this.setBoards()
    }

    setBoards()
    {
        const activities = content.activities
        const count = activities.length
        const totalWidth = (count - 1) * this.options.spacing
        const startX = this.baseX - totalWidth * 0.5

        activities.forEach((activity, index) =>
        {
            const x = startX + index * this.options.spacing
            const y = this.options.rowY
            this.createBoard(activity, index, x, y)
        })
    }

    createTexture(_activity)
    {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 256
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.font = 'bold 52px sans-serif'
        this.wrapText(ctx, _activity.title, canvas.width / 2, 90, canvas.width - 60, 58)

        ctx.font = '36px sans-serif'
        ctx.fillText(_activity.week.toUpperCase(), canvas.width / 2, 190)

        const texture = new THREE.CanvasTexture(canvas)
        texture.magFilter = THREE.LinearFilter
        texture.minFilter = THREE.LinearFilter
        texture.needsUpdate = true
        return texture
    }

    wrapText(_ctx, _text, _x, _y, _maxWidth, _lineHeight)
    {
        const words = _text.split(' ')
        let line = ''
        const lines = []

        for(const word of words)
        {
            const testLine = line ? `${line} ${word}` : word
            if(_ctx.measureText(testLine).width > _maxWidth && line)
            {
                lines.push(line)
                line = word
            }
            else
            {
                line = testLine
            }
        }
        lines.push(line)

        const startY = _y - ((lines.length - 1) * _lineHeight) / 2
        lines.forEach((_line, i) => _ctx.fillText(_line, _x, startY + i * _lineHeight))
    }

    createBoard(_activity, _index, _x, _y)
    {
        const { boardWidth, boardHeight, standHeight } = this.options

        const texture = this.createTexture(_activity)
        const geometry = new THREE.PlaneGeometry(boardWidth, boardHeight)
        const material = new THREE.MeshBasicMaterial({
            wireframe: false,
            color: 0xffffff,
            alphaMap: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            polygonOffsetUnits: -4
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.renderOrder = 10

        mesh.rotation.x = Math.PI * 0.5
        mesh.position.set(_x, _y, standHeight)
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()

        this.container.add(mesh)

        const area = this.areas.add({
            position: new THREE.Vector2(_x, _y + 0.6),
            halfExtents: new THREE.Vector2(boardWidth * 0.5, 1),
            hasKey: true,
            testCar: true,
            active: true
        })

        area.on('interact', () =>
        {
            openActivity(_activity, _index)
        })

        this.boards.push({ mesh, area, activity: _activity })
    }
}
