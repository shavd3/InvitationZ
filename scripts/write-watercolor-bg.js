const fs = require('fs');
const path = require('path');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" fill="none">
  <defs>
    <radialGradient id="washTop1" cx="30%" cy="0%" r="75%">
      <stop offset="0%" stop-color="#c4a882" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#d8c4a8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="washTop2" cx="75%" cy="5%" r="60%">
      <stop offset="0%" stop-color="#b8956a" stop-opacity="0.4"/>
      <stop offset="55%" stop-color="#d4c0a0" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="washBottom1" cx="25%" cy="100%" r="70%">
      <stop offset="0%" stop-color="#c4a882" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#d8c4a8" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="washBottom2" cx="70%" cy="95%" r="55%">
      <stop offset="0%" stop-color="#b8956a" stop-opacity="0.38"/>
      <stop offset="55%" stop-color="#d4c0a0" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="soften" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>

  <rect width="800" height="1200" fill="#FFFFFF"/>

  <!-- Top watercolor washes -->
  <ellipse cx="180" cy="80" rx="320" ry="200" fill="url(#washTop1)" filter="url(#soften)"/>
  <ellipse cx="580" cy="60" rx="280" ry="170" fill="url(#washTop2)" filter="url(#soften)"/>
  <ellipse cx="400" cy="140" rx="360" ry="120" fill="#d8c4a8" opacity="0.12" filter="url(#soften)"/>

  <!-- Bottom watercolor washes -->
  <ellipse cx="200" cy="1120" rx="340" ry="210" fill="url(#washBottom1)" filter="url(#soften)"/>
  <ellipse cx="600" cy="1140" rx="300" ry="180" fill="url(#washBottom2)" filter="url(#soften)"/>
  <ellipse cx="420" cy="1060" rx="380" ry="130" fill="#d8c4a8" opacity="0.1" filter="url(#soften)"/>

  <!-- Gold flecks in washes -->
  <g opacity="0.35">
    <circle cx="120" cy="90" r="1.5" fill="#ccb181"/>
    <circle cx="200" cy="60" r="1" fill="#b8956a"/>
    <circle cx="280" cy="110" r="1.2" fill="#ccb181"/>
    <circle cx="350" cy="50" r="0.8" fill="#b8956a"/>
    <circle cx="500" cy="80" r="1.3" fill="#ccb181"/>
    <circle cx="620" cy="100" r="1" fill="#b8956a"/>
    <circle cx="680" cy="55" r="1.5" fill="#ccb181"/>
    <circle cx="150" cy="1110" r="1.2" fill="#ccb181"/>
    <circle cx="240" cy="1140" r="1" fill="#b8956a"/>
    <circle cx="320" cy="1080" r="1.4" fill="#ccb181"/>
    <circle cx="480" cy="1120" r="0.9" fill="#b8956a"/>
    <circle cx="560" cy="1090" r="1.1" fill="#ccb181"/>
    <circle cx="650" cy="1130" r="1.3" fill="#b8956a"/>
    <circle cx="720" cy="1100" r="1" fill="#ccb181"/>
  </g>

  <!-- Top botanical branch (white line art) -->
  <g id="branch-top" transform="translate(60, 120) rotate(-25)" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.92">
    <path d="M 20,0 C 40,30 55,70 60,120"/>
    <path d="M 35,25 C 55,20 80,30 95,45"/>
    <path d="M 42,50 C 65,48 90,55 105,72"/>
    <path d="M 48,78 C 72,75 98,82 112,98"/>
    <path d="M 55,105 C 78,102 100,110 115,125"/>
    <path d="M 95,45 C 100,55 102,68 100,82"/>
    <path d="M 105,72 C 110,82 112,95 108,108"/>
    <path d="M 112,98 C 116,108 118,120 114,132"/>
    <path d="M 30,40 C 15,55 8,75 5,95"/>
    <path d="M 38,65 C 22,72 12,88 8,105"/>
  </g>

  <!-- Bottom botanical branch (mirrored) -->
  <g id="branch-bottom" transform="translate(80, 1080) rotate(155)" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.92">
    <path d="M 20,0 C 40,30 55,70 60,120"/>
    <path d="M 35,25 C 55,20 80,30 95,45"/>
    <path d="M 42,50 C 65,48 90,55 105,72"/>
    <path d="M 48,78 C 72,75 98,82 112,98"/>
    <path d="M 55,105 C 78,102 100,110 115,125"/>
    <path d="M 95,45 C 100,55 102,68 100,82"/>
    <path d="M 105,72 C 110,82 112,95 108,108"/>
    <path d="M 112,98 C 116,108 118,120 114,132"/>
    <path d="M 30,40 C 15,55 8,75 5,95"/>
    <path d="M 38,65 C 22,72 12,88 8,105"/>
  </g>
</svg>
`;

const root = path.resolve(__dirname, '..', '..');
const targets = [
  path.join(root, 'Logo', 'invitation-card-bg.svg'),
  path.join(root, 'wedding-invite', 'public', 'backgrounds', 'invitation-card-bg.svg'),
];

for (const target of targets) {
  fs.writeFileSync(target, svg, 'utf8');
  const bytes = fs.readFileSync(target);
  const nulls = [...bytes].filter((b) => b === 0).length;
  console.log(`${path.basename(target)}: ${bytes.length} bytes, null bytes: ${nulls}`);
}
