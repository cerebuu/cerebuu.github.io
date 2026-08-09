import * as THREE from 'three'
import content from '../../content.js'

/**
 * ActivityBoards
 * ----------------------------------------------------------------
 * One standing, interactive board per entry in content.activities.
 * Texture generated at runtime on a <canvas> — same technique as
 * the fixed setActivities() ground plane and the GitHub/LinkedIn/
 * Mail labels. No image asset to create or maintain.
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

        this.options = {
            boardWidth: 2.6,
            boardHeight: 1.3,
            spacing: 3.2,
            standHeight: 1.6,
            rowY: this.baseY - 2
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

        const texture = new THREE.CanvasTexture(canvas)
        texture.magFilter = THREE.LinearFilter
        texture.minFilter = THREE.LinearFilter

        const drawBoard = (_image = null) =>
        {
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const hasThumbnail = _image && _image.complete && _image.naturalWidth

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
            ctx.lineWidth = 2
            ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32)

            // The activity title is the board's primary label. A thumbnail,
            // when present, remains supporting artwork rather than the label.
            ctx.fillStyle = '#ffffff'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = 'bold 32px sans-serif'
            this.wrapText(ctx, _activity.title, canvas.width / 2, 60, canvas.width - 56, 36)

            if(hasThumbnail)
            {
                this.drawCover(ctx, _image, 28, 112, 132, 112)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
                ctx.strokeRect(28, 112, 132, 112)
            }

            ctx.fillStyle = '#bdbdbd'
            ctx.textAlign = hasThumbnail ? 'left' : 'center'
            ctx.font = '20px sans-serif'
            ctx.fillText(_activity.week.toUpperCase(), hasThumbnail ? 190 : canvas.width / 2, 148)

            if(hasThumbnail)
            {
                ctx.fillStyle = '#ffffff'
                ctx.font = 'bold 18px sans-serif'
                ctx.fillText('OPEN ACTIVITY', 190, 190)
            }
            texture.needsUpdate = true
        }

        drawBoard()

        if(_activity.thumbnail)
        {
            const image = new Image()
            image.onload = () => drawBoard(image)
            image.onerror = () => drawBoard()
            image.src = _activity.thumbnail
        }

        return texture
    }

    drawCover(_ctx, _image, _x, _y, _width, _height)
    {
        const scale = Math.max(_width / _image.naturalWidth, _height / _image.naturalHeight)
        const width = _image.naturalWidth * scale
        const height = _image.naturalHeight * scale
        const x = _x + (_width - width) * 0.5
        const y = _y + (_height - height) * 0.5

        _ctx.drawImage(_image, x, y, width, height)
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
            map: texture,
            side: THREE.DoubleSide
        })

        const mesh = new THREE.Mesh(geometry, material)

        // Positioned on the south side of this board's own interactive box
        // (opposite the "ACTIVITIES" label to the north), rather than
        // centered inside it, so the title/week text doesn't overlap
        // either the box outline or the section label.
        const signY = _y - 1.8

        mesh.rotation.x = Math.PI * 0.5
        mesh.position.set(_x, signY, standHeight)
        mesh.matrixAutoUpdate = false
        mesh.updateMatrix()

        this.container.add(mesh)

        const area = this.areas.add({
            position: new THREE.Vector2(_x, _y + 0.6),
            halfExtents: new THREE.Vector2(boardWidth * 0.5, 1)
        })

        area.on('interact', () =>
        {
            if(_activity.link && !_activity.link.disabled)
            {
                window.open(_activity.link.href, '_blank', 'noopener')
                return
            }

            // Activities without a destination still open their Resume Mode
            // entry, but linked activities (including Davie's Burger) should
            // take the visitor directly to the activity itself.
            if(window.resumeMode)
            {
                window.resumeMode.open()
                window.setTimeout(() =>
                {
                    const target = document.getElementById(`rm-activity-${_index}`)
                    if(target)
                    {
                        target.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 400)
            }
        })

        this.boards.push({ mesh, area, activity: _activity })
    }
}
