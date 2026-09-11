/* ==========================================================================
   One place that decides which image represents a project in a grid.

   This map used to be duplicated in Home.jsx and Work.jsx, and asset() throws
   on an unknown key, so adding a project without remembering to edit both
   copies took down the whole page. Now there is one map, and a missing entry
   falls back to the project's own `thumb` instead of throwing.
   ========================================================================== */
import { asset } from './assets.js'

/* Overrides only: a project whose grid image differs from its case-study
   thumbnail, usually because the grid wants a tighter crop or a different
   moment. Everything else uses project.thumb. */
const OVERRIDE = {
  'tolet-globe': 'tolet-thumb',
  'csis-portal': 'csis-thumb',
  'laundry-xpress': 'lx-thumb',
  'design-qualities': 'quality-thumb',
  'smart-shelf': 'shelf-thumb',
  'cinematic-automotive': 'corvette-hero',
  'king-run': 'kingrun-hero',
  'now-i-am-become-death': 'vc-mandala',
  /* These three were crossed over: the kaleidoscope showed a DAW screenshot,
     and the soundscape showed a photograph of video editing. The DAW shot is
     the soundscape's own work, so it moves there; the sculpture gets its own
     photograph. */
  'detachable-kaleidoscope': 'kal-tower',
  'algorithmic-soundscape': 'sound-session',
  videography: 'film-diwali',
}

/** Returns {src, alt, w, h} for a project's grid thumbnail. Never throws. */
export function thumbFor(project) {
  const key = OVERRIDE[project.slug]
  if (key) {
    try {
      return asset(key)
    } catch {
      /* Fall through to the project's own thumb rather than blanking the page. */
    }
  }
  return project.thumb || { src: '', alt: '' }
}
