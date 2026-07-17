import './style/tokens.css'
import './style/main.css'
import './style/resume.css'
import './style/summary-card.css'
import './style/interactions.css'
import './style/nav-dock.css'
import Application from './javascript/Application.js'
import ResumeMode from './javascript/ResumeMode.js'
import SummaryCard from './javascript/SummaryCard.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})

window.resumeMode = new ResumeMode()
window.summaryCard = new SummaryCard()
