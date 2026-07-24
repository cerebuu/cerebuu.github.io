/**
 * activities/index.js
 * ----------------------------------------------------------------
 * Combines every activity-NN.js file in this folder into one array.
 * To add a new activity: copy an existing activity-NN.js file,
 * fill in your content, then add one import + one array entry here.
 * No other file needs to change — content.js and ResumeMode.js both
 * read from this array automatically.
 * ----------------------------------------------------------------
 */
import activity01 from './activity-01.js'
import activity02 from './activity-02.js'
import activity03 from './activity-03.js'
import activity04 from './activity-04.js'

export default [
    activity01,
    activity02,
    activity03,
    activity04
]
