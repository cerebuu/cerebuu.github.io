const modules = import.meta.glob('./activity-*.js', { eager: true })

const activities = Object.keys(modules)
    .sort()
    .map((path) =>
    {
        const raw = modules[path].default || {}

        return {
            title: raw.title || 'Untitled Activity',
            week: raw.week || '',
            status: raw.status || 'Completed',
            description: raw.description || '',
            tags: Array.isArray(raw.tags) ? raw.tags : [],
            link: raw.link || null
        }
    })

export default activities
