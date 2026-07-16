import './style/main.css'
import './style/resume.css'
import Application from './javascript/Application.js'
import ResumeMode from './javascript/ResumeMode.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})

window.resumeMode = new ResumeMode()
