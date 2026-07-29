// Route-based navigation. The site is a hub (/) with a handful of focused
// "dimension" routes rather than one long scroll — each entry is both a
// navbar link and a portal card on the landing hub.
export const navLinks = [
  {
    label: 'Origin Story',
    to: '/origin',
    icon: 'Compass',
    blurb: 'Who I am, where I trained, and what I do when the mask is off.',
    accent: 'pop',
  },
  {
    label: 'Missions',
    to: '/missions',
    icon: 'Rocket',
    blurb: 'Products I designed and shipped end-to-end — opened as case studies.',
    accent: 'accent',
  },
  {
    label: 'Powers',
    to: '/powers',
    icon: 'Sparkles',
    blurb: 'The stack I build with — plus real receipts from how I build.',
    accent: 'brand',
  },
  {
    label: 'Canon Events',
    to: '/canon',
    icon: 'Telescope',
    blurb: "The moments that couldn't be skipped, first commit to now.",
    accent: 'accent',
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'Send',
    blurb: 'Got a problem in your neighborhood? My inbox is open.',
    accent: 'brand',
  },
]

export default navLinks
