import './style/tokens.css'
import './style/a11y.css'
import './style/interactions.css'
import './style/main.css'
import Application from './javascript/Application.js'

window.application = new Application({
    $canvas: document.querySelector('.js-canvas'),
    useComposer: true
})

// Resume Mode and the Summary Card aren't needed for the initial 3D
// scene to render — deferring them out of the main bundle means the
// browser can start parsing/running the critical game code sooner,
// instead of also downloading and parsing this on the critical path.
Promise.all([
    import('./style/resume.css'),
    import('./style/summary-card.css'),
    import('./javascript/ResumeMode.js'),
    import('./javascript/SummaryCard.js')
]).then(([, , resumeModeModule, summaryCardModule]) =>
{
    const ResumeMode = resumeModeModule.default
    const SummaryCard = summaryCardModule.default

    window.resumeMode = new ResumeMode()
    window.summaryCard = new SummaryCard()
})
