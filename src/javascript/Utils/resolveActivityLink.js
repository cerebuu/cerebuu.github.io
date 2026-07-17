export function activityHasLink(activity)
{
    return !!(activity && activity.link && activity.link.href && !activity.link.disabled)
}

export function openActivity(activity, index)
{
    if(activityHasLink(activity))
    {
        window.open(activity.link.href, '_blank', 'noopener')
        return
    }

    if(window.resumeMode)
    {
        window.resumeMode.open()
        window.setTimeout(() =>
        {
            const target = document.getElementById(`rm-activity-${index}`)
            if(target)
            {
                target.scrollIntoView({ behavior: 'smooth' })
            }
        }, 400)
    }
}
