/**
 * activities/index.js
 * ----------------------------------------------------------------
 * Auto-discovers every activity-NN.js file in this folder via
 * Vite's import.meta.glob — no manual import/export list to
 * maintain. To add a new activity: create activity-05.js (etc.)
 * in this folder, filled in like the others. That's the only
 * step — content.js, ResumeMode.js, and ActivityBoards.js all
 * read from this array automatically.
 * ----------------------------------------------------------------
 */
const modules = import.meta.glob('./activity-*.js', { eager: true })

const activities = Object.keys(modules)
    .sort()
    .map((path) =>
    {
        const raw = modules[path].default || {}

        return {
            title: raw.title || '',
            week: raw.week || '',
            status: raw.status || 'Completed',
            description: raw.description || '',
            tags: Array.isArray(raw.tags) ? raw.tags : [],
            thumbnail: raw.thumbnail || null,
            thumbnailAlt: raw.thumbnailAlt || '',
            link: raw.link || null
        }
    })
    .filter((activity) => activity.title && activity.description)

export default activities
