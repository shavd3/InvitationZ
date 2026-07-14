const fs = require('fs');
const path = require('path');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" fill="none">
  <rect width="800" height="1200" fill="#FFFFFF"/>

  <g id="top-right">
    <path fill="none" stroke="#b8956a" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"
      d="M 820,-10 C 780,40 720,90 660,150 C 600,210 540,270 500,340"/>
    <path fill="none" stroke="#ccb181" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"
      d="M 800,30 C 740,60 680,100 620,160 C 570,210 520,280 480,360"/>
    <path fill="none" stroke="#ccb181" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"
      d="M 790,80 C 730,120 660,180 590,260"/>
    <g transform="translate(720,55) rotate(-35)">
      <path fill="none" stroke="#b8956a" stroke-width="1" opacity="0.65" d="M 0,0 C 8,18 12,38 0,72 C -12,38 -8,18 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.5" opacity="0.35" d="M 0,4 L 0,68"/>
    </g>
    <g transform="translate(680,110) rotate(-55)">
      <path fill="none" stroke="#ccb181" stroke-width="0.9" opacity="0.6" d="M 0,0 C 6,14 10,30 0,58 C -10,30 -6,14 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.4" opacity="0.3" d="M 0,3 L 0,54"/>
    </g>
    <g transform="translate(640,165) rotate(-70)">
      <path fill="none" stroke="#b8956a" stroke-width="1" opacity="0.7" d="M 0,0 C 10,22 14,46 0,88 C -14,46 -10,22 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.5" opacity="0.35" d="M 0,5 L 0,82"/>
    </g>
    <g transform="translate(600,220) rotate(-85)">
      <path fill="none" stroke="#ccb181" stroke-width="0.85" opacity="0.55" d="M 0,0 C 7,16 11,34 0,64 C -11,34 -7,16 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.4" opacity="0.3" d="M 0,3 L 0,60"/>
    </g>
    <g transform="translate(560,280) rotate(-100)">
      <path fill="none" stroke="#b8956a" stroke-width="0.95" opacity="0.6" d="M 0,0 C 9,20 13,42 0,80 C -13,42 -9,20 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.45" opacity="0.32" d="M 0,4 L 0,75"/>
    </g>
    <g transform="translate(530,340) rotate(-115)">
      <path fill="none" stroke="#ccb181" stroke-width="0.8" opacity="0.5" d="M 0,0 C 6,13 9,28 0,52 C -9,28 -6,13 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.35" opacity="0.28" d="M 0,2 L 0,48"/>
    </g>
    <path fill="none" stroke="#ccb181" stroke-width="0.85" stroke-linecap="round" opacity="0.45"
      d="M 760,20 C 700,50 650,90 610,140 C 580,180 550,230 530,290"/>
    <g transform="translate(700,70) rotate(-20)">
      <path fill="none" stroke="#b8956a" stroke-width="0.9" opacity="0.55" d="M 0,0 C 5,12 8,26 0,50 C -8,26 -5,12 0,0"/>
    </g>
    <g transform="translate(660,130) rotate(-40)">
      <path fill="none" stroke="#ccb181" stroke-width="0.8" opacity="0.5" d="M 0,0 C 7,15 10,32 0,60 C -10,32 -7,15 0,0"/>
    </g>
    <g transform="translate(620,190) rotate(-60)">
      <path fill="none" stroke="#b8956a" stroke-width="0.85" opacity="0.58" d="M 0,0 C 8,18 11,36 0,68 C -11,36 -8,18 0,0"/>
    </g>
    <g transform="translate(750,25) rotate(-15)">
      <path fill="none" stroke="#ccb181" stroke-width="0.7" opacity="0.4" d="M 0,0 C 4,10 6,22 0,42 C -6,22 -4,10 0,0"/>
    </g>
    <g transform="translate(770,60) rotate(-50)">
      <path fill="none" stroke="#ccb181" stroke-width="0.65" opacity="0.35" d="M 0,0 C 3,8 5,18 0,34 C -5,18 -3,8 0,0"/>
    </g>
    <g transform="translate(740,100) rotate(-75)">
      <path fill="none" stroke="#b8956a" stroke-width="0.7" opacity="0.42" d="M 0,0 C 5,12 7,24 0,46 C -7,24 -5,12 0,0"/>
    </g>
  </g>

  <g id="bottom-left">
    <path fill="none" stroke="#b8956a" stroke-width="1.1" stroke-linecap="round" opacity="0.55"
      d="M -20,1210 C 40,1160 100,1110 160,1050 C 220,990 280,930 320,860"/>
    <path fill="none" stroke="#ccb181" stroke-width="0.9" stroke-linecap="round" opacity="0.4"
      d="M 0,1180 C 60,1140 120,1090 180,1030 C 230,980 280,920 320,840"/>
    <path fill="none" stroke="#ccb181" stroke-width="0.8" stroke-linecap="round" opacity="0.35"
      d="M 10,1130 C 70,1090 140,1030 210,950"/>
    <g transform="translate(80,1145) rotate(145)">
      <path fill="none" stroke="#b8956a" stroke-width="1" opacity="0.65" d="M 0,0 C 8,18 12,38 0,72 C -12,38 -8,18 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.5" opacity="0.35" d="M 0,4 L 0,68"/>
    </g>
    <g transform="translate(120,1090) rotate(125)">
      <path fill="none" stroke="#ccb181" stroke-width="0.9" opacity="0.6" d="M 0,0 C 6,14 10,30 0,58 C -10,30 -6,14 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.4" opacity="0.3" d="M 0,3 L 0,54"/>
    </g>
    <g transform="translate(160,1035) rotate(110)">
      <path fill="none" stroke="#b8956a" stroke-width="1" opacity="0.7" d="M 0,0 C 10,22 14,46 0,88 C -14,46 -10,22 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.5" opacity="0.35" d="M 0,5 L 0,82"/>
    </g>
    <g transform="translate(200,980) rotate(95)">
      <path fill="none" stroke="#ccb181" stroke-width="0.85" opacity="0.55" d="M 0,0 C 7,16 11,34 0,64 C -11,34 -7,16 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.4" opacity="0.3" d="M 0,3 L 0,60"/>
    </g>
    <g transform="translate(240,920) rotate(80)">
      <path fill="none" stroke="#b8956a" stroke-width="0.95" opacity="0.6" d="M 0,0 C 9,20 13,42 0,80 C -13,42 -9,20 0,0"/>
      <path fill="none" stroke="#b8956a" stroke-width="0.45" opacity="0.32" d="M 0,4 L 0,75"/>
    </g>
    <g transform="translate(270,860) rotate(65)">
      <path fill="none" stroke="#ccb181" stroke-width="0.8" opacity="0.5" d="M 0,0 C 6,13 9,28 0,52 C -9,28 -6,13 0,0"/>
      <path fill="none" stroke="#ccb181" stroke-width="0.35" opacity="0.28" d="M 0,2 L 0,48"/>
    </g>
    <path fill="none" stroke="#ccb181" stroke-width="0.85" stroke-linecap="round" opacity="0.45"
      d="M 40,1190 C 100,1160 150,1120 190,1070 C 220,1030 250,980 270,920"/>
    <g transform="translate(100,1135) rotate(160)">
      <path fill="none" stroke="#b8956a" stroke-width="0.9" opacity="0.55" d="M 0,0 C 5,12 8,26 0,50 C -8,26 -5,12 0,0"/>
    </g>
    <g transform="translate(140,1080) rotate(140)">
      <path fill="none" stroke="#ccb181" stroke-width="0.8" opacity="0.5" d="M 0,0 C 7,15 10,32 0,60 C -10,32 -7,15 0,0"/>
    </g>
    <g transform="translate(180,1020) rotate(120)">
      <path fill="none" stroke="#b8956a" stroke-width="0.85" opacity="0.58" d="M 0,0 C 8,18 11,36 0,68 C -11,36 -8,18 0,0"/>
    </g>
    <g transform="translate(50,1170) rotate(170)">
      <path fill="none" stroke="#ccb181" stroke-width="0.7" opacity="0.4" d="M 0,0 C 4,10 6,22 0,42 C -6,22 -4,10 0,0"/>
    </g>
    <g transform="translate(30,1135) rotate(135)">
      <path fill="none" stroke="#ccb181" stroke-width="0.65" opacity="0.35" d="M 0,0 C 3,8 5,18 0,34 C -5,18 -3,8 0,0"/>
    </g>
    <g transform="translate(60,1095) rotate(105)">
      <path fill="none" stroke="#b8956a" stroke-width="0.7" opacity="0.42" d="M 0,0 C 5,12 7,24 0,46 C -7,24 -5,12 0,0"/>
    </g>
  </g>

  <g id="bottom-right" opacity="0.3">
    <path fill="none" stroke="#ccb181" stroke-width="0.75" stroke-linecap="round"
      d="M 820,1100 C 760,1060 700,1020 650,970 C 610,930 580,880 560,820"/>
    <g transform="translate(720,1080) rotate(200)">
      <path fill="none" stroke="#ccb181" stroke-width="0.7" d="M 0,0 C 5,12 8,26 0,50 C -8,26 -5,12 0,0"/>
    </g>
    <g transform="translate(680,1030) rotate(185)">
      <path fill="none" stroke="#b8956a" stroke-width="0.75" d="M 0,0 C 7,16 10,34 0,64 C -10,34 -7,16 0,0"/>
    </g>
    <g transform="translate(640,980) rotate(170)">
      <path fill="none" stroke="#ccb181" stroke-width="0.65" d="M 0,0 C 6,14 9,28 0,54 C -9,28 -6,14 0,0"/>
    </g>
    <g transform="translate(610,920) rotate(155)">
      <path fill="none" stroke="#ccb181" stroke-width="0.6" d="M 0,0 C 4,10 6,22 0,42 C -6,22 -4,10 0,0"/>
    </g>
    <g transform="translate(760,1120) rotate(215)">
      <path fill="none" stroke="#ccb181" stroke-width="0.55" d="M 0,0 C 3,8 5,18 0,34 C -5,18 -3,8 0,0"/>
    </g>
  </g>

  <g id="accents" opacity="0.18">
    <circle cx="720" cy="520" r="3" fill="#ccb181"/>
    <circle cx="735" cy="545" r="2" fill="#b8956a"/>
    <circle cx="710" cy="560" r="2.5" fill="#ccb181"/>
    <circle cx="745" cy="580" r="1.5" fill="#b8956a"/>
    <circle cx="725" cy="600" r="2" fill="#ccb181"/>
    <ellipse cx="738" cy="535" rx="6" ry="4" fill="#ccb181" opacity="0.5"/>
    <ellipse cx="715" cy="575" rx="5" ry="3" fill="#b8956a" opacity="0.4"/>
  </g>
</svg>
`;

const root = path.resolve(__dirname, '..', '..');
const targets = [
  path.join(root, 'Logo', 'invitation-leaves-bg.svg'),
  path.join(root, 'wedding-invite', 'public', 'backgrounds', 'invitation-card-bg.svg'),
];

for (const target of targets) {
  fs.writeFileSync(target, svg, 'utf8');
  const bytes = fs.readFileSync(target);
  const nulls = [...bytes].filter((b) => b === 0).length;
  console.log(`${path.basename(target)}: ${bytes.length} bytes, null bytes: ${nulls}`);
}
