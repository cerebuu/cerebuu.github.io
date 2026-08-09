import './style/tokens.css'
import './style/a11y.css'
import './style/interactions.css'
import './style/terminal-loader.css'
import './style/nav-dock.css'
import './style/mobile.css'
import './style/main.css'
import Application from './javascript/Application.js'
import TerminalLoader from './javascript/TerminalLoader.js'

// Protect the singleton WebGL application from an accidental duplicate module
// evaluation (for example a cached script being injected twice by a host).
if (!window.application) {
    window.application = new Application({
        $canvas: document.querySelector('.js-canvas'),
        useComposer: true
    })
}

if (!window.terminalLoader) {
    window.terminalLoader = new TerminalLoader(window.application.resources)
}

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

    if (!window.resumeMode) window.resumeMode = new ResumeMode()
    if (!window.summaryCard) window.summaryCard = new SummaryCard()
})
