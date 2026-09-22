// Content for the hidden terminal easter egg.
// Trigger: type "whois jiteen" anywhere on the site, or press Ctrl/Cmd + K.

export const terminalBanner = String.raw`
   __ _ _
  / /(_) |_ ___  ___ _ __
 / / | | __/ _ \/ _ \ '_ \
/ /__| | ||  __/  __/ | | |
\____/_|\__\___|\___|_| |_|   jiteen@portfolio:~$
`

export const helpLines = [
  { cmd: 'whois', desc: 'who is Jiteen, really' },
  { cmd: 'projects', desc: 'list things I have built' },
  { cmd: 'skills', desc: 'my technical toolkit' },
  { cmd: 'thwip', desc: 'fire a web' },
  { cmd: 'canon', desc: 'my canon events' },
  { cmd: 'spidey', desc: 'why all the webs?' },
  { cmd: 'music', desc: 'what is playing while I build' },
  { cmd: 'future', desc: 'where this is all going' },
  { cmd: 'social', desc: 'where to find me' },
  { cmd: 'secret', desc: '???' },
  { cmd: 'clear', desc: 'clear the screen' },
  { cmd: 'exit', desc: 'close the terminal' },
]

export const thwipLines = [
  '      \\   |   /',
  '   \\   \\  |  /   /',
  '  ── ── ( ● ) ── ──',
  '   /   /  |  \\   \\',
  '      /   |   \\',
  '',
  'THWIP! 🕸️  web deployed — and like my code, it sticks.',
]

export const spideyLines = [
  'big big Spider-Man fan. so the portfolio suits up too. 🕷️',
  '',
  '"I\'m half Batman and half Spider-Man,',
  ' cause I got no super powers and I\'m broke."',
  '',
  'with great power comes great responsibility. — uncle ben',
]

export const musicLines = [
  '♫ now playing — something with heavy bass ♫',
  '',
  'Hip-hop is my compile soundtrack. The rhythm keeps the commits flowing.',
  'I am also a beginner beatboxer, so half the beats are coming from my mouth.',
  '',
  '  > flow state == headphones on + lo-fi boom bap',
  '  > "started from the localhost now we here"',
]

export const futureLines = [
  'mission> build products that turn complex processes into intuitive experiences.',
  '',
  '  [ ] ship products used by many, not few',
  '  [ ] go deeper on distributed systems & AI',
  '  [ ] keep the craft fun — stay curious, stay building',
  '',
  'loading next chapter... ████████░░ 80%',
]

export const secretLines = [
  'you found it. 🥚',
  '',
  'fun fact: this whole portfolio was built with AI in the loop —',
  'because the best engineers use the best tools available.',
  '',
  'now go build something. — jiteen',
]

export default helpLines
