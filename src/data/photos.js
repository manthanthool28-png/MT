/* ==========================================================================
   Photography.

   Every file was run through auto-orient before import, so the dimensions here
   are the dimensions the browser will actually paint. That matters: two of the
   videography stills previously carried EXIF orientation 6, were declared
   landscape, rendered portrait, and got a wrong-shaped box reserved for them.

   `span` is a masonry hint, not a size: 'tall' asks the grid for two row units.
   ========================================================================== */

export const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'stage', label: 'Stage' },
  { id: 'city', label: 'City & structure' },
  { id: 'nature', label: 'Nature' },
]

export const photos = [
  // --- Folk Lok, live -----------------------------------------------------
  { src: './assets/photo-05.jpg', w: 1200, h: 1600, cat: 'stage', span: 'tall',
    title: 'From the wings',
    alt: 'Black and white view from the side of a stage: a single hard spotlight cuts through haze onto a singer, with the rest of the ensemble in silhouette and a rig of lanterns overhead.' },
  { src: './assets/photo-06.jpg', w: 1200, h: 1600, cat: 'stage',
    title: 'Dholki',
    alt: 'Black and white close-up of a two-headed drum lying across a player’s lap, hands resting on the skin, the performance going on out of focus behind it.' },
  { src: './assets/photo-07.jpg', w: 1200, h: 1600, cat: 'stage', span: 'tall',
    title: 'Cyan',
    alt: 'A band silhouetted in dense cyan haze under the Folk Lok sign, guitars and a keyboard picked out by backlight.' },
  { src: './assets/photo-08.jpg', w: 1200, h: 1600, cat: 'stage',
    title: 'Bansuri',
    alt: 'Black and white photograph of a seated flautist mid-phrase, a keyboard player behind him and a drummer to the right, smoke filling the space above.' },
  { src: './assets/photo-09.jpg', w: 1200, h: 1600, cat: 'stage', span: 'tall',
    title: 'Bansuri, closer',
    alt: 'A tighter black and white frame of the same flautist, lit from above so the white kurta separates from a near-black background.' },
  { src: './assets/photo-15.jpg', w: 1200, h: 1600, cat: 'stage',
    title: 'Full house',
    alt: 'An auditorium washed entirely in deep blue light, every seat on the floor and in the balcony occupied, photographed from the side of the stage.' },

  // --- City, crowd, structure --------------------------------------------
  { src: './assets/photo-04.jpg', w: 1200, h: 1600, cat: 'city', span: 'tall',
    title: 'After rain',
    alt: 'An ornately carved stone gateway on a wet promenade, palm fronds crossing the frame, with a cable-stayed bridge just visible through the arch in the haze.' },
  { src: './assets/photo-16.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Everyone is filming',
    alt: 'A dense crowd inside a decorated pandal, dozens of raised phones photographing a gilded shrine lit blue and gold.' },
  { src: './assets/photo-17.jpg', w: 1200, h: 1600, cat: 'city', span: 'tall',
    title: 'The same crowd, without colour',
    alt: 'The same scene in black and white: the shrine reduced to shape and the forest of raised arms and phone screens becoming the subject.' },
  { src: './assets/photo-18.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Idol',
    alt: 'A large seated Ganesh idol in painted detail, garlanded and lit warm against a dark interior.' },
  { src: './assets/photo-19.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Spokes',
    alt: 'Looking straight up the inside of a white spoked dome, the cables converging on a central hub against a pale sky.' },
  { src: './assets/photo-20.jpg', w: 1200, h: 1600, cat: 'city', span: 'tall',
    title: 'Corridor',
    alt: 'A long enclosed walkway of repeating arched ribs, receding to a small bright opening at the far end.' },
  { src: './assets/photo-22.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Painted street',
    alt: 'A row of tall narrow townhouses painted deep blue and cream, with shopfronts, street lamps and a parked scooter under a broken sky.' },
  { src: './assets/photo-25.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Gondolas',
    alt: 'The underside of a ferris wheel by day, empty gondolas and blue spokes filling the frame edge to edge.' },
  { src: './assets/photo-26.jpg', w: 1200, h: 1600, cat: 'city', span: 'tall',
    title: 'The same wheel, at night',
    alt: 'The same ferris wheel after dark, its structure picked out in violet and white light against a black sky.' },
  { src: './assets/photo-27.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Market',
    alt: 'A ferris wheel lit blue and white rising behind the wooden roofs and red awnings of a Christmas market.' },
  { src: './assets/photo-28.jpg', w: 1200, h: 1600, cat: 'city',
    title: 'Crossing',
    alt: 'A figure standing on a lit footbridge at night, the handrail lights running away in both directions under a deep red sky.' },

  // --- Nature -------------------------------------------------------------
  { src: './assets/photo-11.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Wingspan I',
    alt: 'A white goose on a stone path beside a pond, wings fully extended, neck stretched upward, other geese resting behind it.' },
  { src: './assets/photo-12.jpg', w: 1200, h: 1600, cat: 'nature', span: 'tall',
    title: 'Wingspan II',
    alt: 'The same goose from behind, wings raised into a broad V, feathers translucent against an overcast sky.' },
  { src: './assets/photo-13.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Wingspan III',
    alt: 'The goose caught side-on with both wings at full stretch across the frame, head turned away from the camera.' },
  { src: './assets/photo-14.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Wingspan IV',
    alt: 'The wings half-folded now, the bird settling, park benches and visitors soft in the background.' },
  { src: './assets/photo-10.jpg', w: 1200, h: 1600, cat: 'nature', span: 'tall',
    title: 'Monsoon paddle',
    alt: 'The nose of a yellow kayak pointing across grey water toward a low green hill wrapped in monsoon cloud, other kayaks moored along the far bank.' },
  { src: './assets/photo-21.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Neighbours',
    alt: 'A shaggy brown cow looking directly at the camera from a green field, the rest of the herd grazing behind under a bright overcast sky.' },
  { src: './assets/photo-23.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Rainbow, bare tree',
    alt: 'A leafless tree in a park with a faint rainbow arcing down behind it onto wet grass.' },
  { src: './assets/photo-29.jpg', w: 1200, h: 1600, cat: 'nature', span: 'tall',
    title: 'Aurora',
    alt: 'Faint green and violet aurora banding across a night sky above a dark treeline and still water.' },
  { src: './assets/photo-02.jpg', w: 900, h: 1600, cat: 'nature', span: 'tall',
    title: 'Two-day moon',
    alt: 'A thin crescent moon low in a pink and green dusk sky, above the silhouette of a rooftop water tank and a few branches.' },
  { src: './assets/photo-01.jpg', w: 607, h: 1080, cat: 'nature',
    title: 'Selective',
    alt: 'A cat photographed from above in black and white with only its amber eyes left in colour, sitting in a hard diagonal of sunlight.' },
  { src: './assets/photo-24.jpg', w: 1200, h: 1600, cat: 'nature',
    title: 'Direct address',
    alt: 'A black and white cat looking straight up at the camera with its mouth open, the background thrown completely out of focus.' },
]

/* Graphic design rather than photography, so they sit in their own strip
   instead of being counted as photographs. */
export const posters = [
  { src: './assets/photo-03.jpg', w: 1131, h: 1600,
    title: 'Folk Lok · August tour',
    alt: 'Tour poster over a black and white photograph of a standing ovation, the Folk Lok wordmark in yellow above eight tour dates set in Marathi.' },
  { src: './assets/photo-30.jpg', w: 1236, h: 1600,
    title: 'Folk Lok · October',
    alt: 'A single-date poster in dusty pink and violet, an illustrated group of folk performers beneath the Folk Lok wordmark.' },
  { src: './assets/photo-31.jpg', w: 1280, h: 1600,
    title: 'Housefull · Ahilyanagar',
    alt: 'A dark gold announcement poster reading Housefull in Marathi, with two show times and a photograph of the ensemble beneath.' },
]
