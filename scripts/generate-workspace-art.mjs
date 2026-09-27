import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, '..', 'public', 'images');

const W = 1600;
const H = 1000;
const SW = 1360;
const SH = 700;

const AMBER = '#d6aa52';
const BRIGHT = '#f3d184';
const PAPER = '#f7f0e3';

const s1 = 'stroke="rgba(214,170,82,.62)"';
const s2 = 'stroke="rgba(214,170,82,.3)"';
const sb = 'stroke="rgba(243,209,132,.82)"';
const fillSoft = 'fill="rgba(214,170,82,.07)"';
const mono = 'font-family="monospace"';

const line = (x1, y1, x2, y2, attrs = s2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attrs} />`;
const rect = (x, y, w, h, attrs = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${attrs} />`;
const circle = (cx, cy, r, attrs = '') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" ${attrs} />`;
const text = (x, y, str, attrs = '') => `<text x="${x}" y="${y}" ${attrs}>${str}</text>`;

const tick = (x, y, dir = 'v') =>
  dir === 'v' ? line(x - 5, y, x + 5, y, s1) : line(x, y - 5, x, y + 5, s1);

function dimension(x1, y, x2, label) {
  return [
    line(x1, y, x2, y, s2),
    tick(x1, y),
    tick(x2, y),
    tick((x1 + x2) / 2, y),
    text((x1 + x2) / 2, y - 10, label, `fill="rgba(184,169,140,.72)" font-size="15" text-anchor="middle" ${mono} letter-spacing="1.5"`),
  ].join('');
}

function desk(x, y, w = 250, h = 96) {
  return [
    rect(x, y, w, h, `${s1} ${fillSoft}`),
    rect(x + w * 0.32, y + 14, w * 0.36, 12, `${sb} fill="rgba(243,209,132,.16)"`),
    line(x + w * 0.5, y + 26, x + w * 0.5, y + 40, s2),
    rect(x + w * 0.5 - 22, y + 40, 44, 8, `${s2}`),
    circle(x + w * 0.5, y + h + 30, 24, `${s2}`),
    circle(x + w * 0.5, y + h + 30, 9, `fill="rgba(214,170,82,.18)"`),
    circle(x + 20, y + h - 18, 5, `fill="rgba(243,209,132,.5)"`),
  ].join('');
}

function plant(x, y, size = 1) {
  return [
    `<path d="M ${x - 26 * size} ${y} L ${x + 26 * size} ${y} L ${x + 19 * size} ${y + 38 * size} L ${x - 19 * size} ${y + 38 * size} Z" ${s2} ${fillSoft} />`,
    circle(x, y - 22 * size, 30 * size, s2),
    circle(x - 20 * size, y - 34 * size, 20 * size, s1),
    circle(x + 22 * size, y - 30 * size, 17 * size, s1),
    circle(x + 2 * size, y - 52 * size, 15 * size, `fill="rgba(214,170,82,.09)" stroke="rgba(243,209,132,.42)"`),
  ].join('');
}

function chair(x, y, r = 26) {
  return [
    circle(x, y, r, `${s2} fill="rgba(214,170,82,.05)"`),
    `<path d="M ${x - r} ${y - 4} A ${r} ${r} 0 0 1 ${x + r} ${y - 4}" ${s1} fill="none" />`,
    circle(x, y, 3.5, `fill="rgba(243,209,132,.55)"`),
  ].join('');
}

function rack(x, y, w = 120, h = 210) {
  const slots = Array.from({ length: 7 }, (_, i) =>
    line(x + 10, y + 16 + i * 26, x + w - 10, y + 16 + i * 26, s2)).join('');
  return [
    rect(x, y, w, h, `${s1} ${fillSoft}`),
    slots,
    circle(x + 18, y + h - 16, 5, `fill="rgba(243,209,132,.55)"`),
    circle(x + 36, y + h - 16, 5, `fill="rgba(214,170,82,.35)"`),
  ].join('');
}

function screen(x, y, w, h, bright = false) {
  return [
    rect(x, y, w, h, `${bright ? sb : s1} fill="${bright ? 'rgba(243,209,132,.12)' : 'rgba(214,170,82,.06)'}"`),
    line(x + 8, y + h - 12, x + w - 8, y + h - 12, s2),
    line(x + 8, y + h - 24, x + w * 0.62, y + h - 24, s2),
  ].join('');
}

function bench(x, y, w, h = 46) {
  return [
    rect(x, y, w, h, `${s1} ${fillSoft}`),
    line(x + 14, y + h + 26, x + 22, y + h, s2),
    line(x + w - 14, y + h + 26, x + w - 22, y + h, s2),
  ].join('');
}

const SCENES = {
  'workspace-01': {
    code: 'WS-01 / OPEN STUDIO',
    caption: '开放办公区 · 工位与任务灯带',
    body: () => {
      const rows = [118, 316, 514];
      const parts = [dimension(40, 74, 1320, '12 × 工位 · 3.2m 柱距')];
      rows.forEach((y, ri) => {
        parts.push(line(20, y - 34, 1340, y - 34, `stroke="rgba(224,194,126,.1)"`));
        for (let i = 0; i < 4; i += 1) {
          parts.push(desk(40 + i * 320, y, 250, 96));
        }
        parts.push(text(1344, y + 100, `R0${ri + 1}`, `fill="rgba(120,107,85,.9)" font-size="14" text-anchor="end" ${mono}`));
      });
      parts.push(line(700, 60, 700, 660, `stroke="rgba(224,194,126,.07)" stroke-dasharray="6 12"`));
      return parts.join('');
    },
  },
  'workspace-02': {
    code: 'WS-02 / SYNC ROOM',
    caption: '协作讨论区 · 圆桌与投屏墙',
    body: () => {
      const parts = [
        screen(430, 58, 500, 26, true),
        line(680, 84, 680, 180, `stroke="rgba(214,170,82,.35)"`),
        `<ellipse cx="680" cy="392" rx="286" ry="142" ${s1} fill="rgba(214,170,82,.06)" />`,
        `<ellipse cx="680" cy="392" rx="186" ry="88" ${s2} fill="none" />`,
        circle(680, 392, 26, `fill="rgba(214,170,82,.14)" stroke="rgba(243,209,132,.5)"`),
      ];
      for (let i = 0; i < 8; i += 1) {
        const a = (Math.PI * 2 * i) / 8;
        parts.push(chair(680 + Math.cos(a) * 356, 392 + Math.sin(a) * 190, 26));
      }
      parts.push(dimension(394, 640, 966, '5.6m'));
      parts.push(text(120, 640, 'ACOUSTIC PANEL', `fill="rgba(120,107,85,.9)" font-size="14" ${mono} letter-spacing="2"`));
      return parts.join('');
    },
  },
  'workspace-03': {
    code: 'WS-03 / CREATIVE SUITE',
    caption: '创作工位 · 无限画布与分镜台',
    body: () => {
      const parts = [
        rect(80, 84, 620, 380, `${s1} ${fillSoft}`),
        line(80, 464, 700, 464, s1),
        rect(104, 108, 572, 20, `fill="rgba(214,170,82,.09)"`),
        circle(700, 84, 6, `fill="rgba(243,209,132,.65)"`),
        rect(772, 96, 22, 16, `fill="rgba(214,170,82,.12)"`),
      ];
      for (let i = 0; i < 3; i += 1) {
        const w = 150 + i * 90;
        parts.push(rect(120 + i * 180, 160 + i * 24, w, 92 + i * 20, `stroke="rgba(243,209,132,.34)" fill="rgba(243,209,132,.035)"`));
      }
      parts.push(desk(800, 120, 250, 96));
      parts.push(desk(800, 316, 250, 96));
      parts.push(rect(1120, 120, 200, 292, `${s2} fill="rgba(214,170,82,.04)"`));
      parts.push(line(1120, 190, 1320, 190, s2));
      parts.push(line(1120, 260, 1320, 260, s2));
      parts.push(line(1120, 330, 1320, 330, s2));
      parts.push(dimension(80, 540, 1320, 'TIMELINE · 24fps'));
      parts.push(line(80, 592, 1320, 592, s2));
      for (let i = 0; i <= 12; i += 1) {
        parts.push(line(80 + i * 103, 585, 80 + i * 103, 599, i % 3 === 0 ? s1 : s2));
      }
      return parts.join('');
    },
  },
  'workspace-04': {
    code: 'WS-04 / DEPLOYMENT BAY',
    caption: '部署机房 · 本地运行与模型网关',
    body: () => {
      const parts = [
        dimension(60, 66, 1300, 'RACK ROW · N+1'),
        line(40, 640, 1320, 640, `stroke="rgba(224,194,126,.09)" stroke-dasharray="4 10"`),
      ];
      for (let r = 0; r < 2; r += 1) {
        for (let i = 0; i < 6; i += 1) {
          parts.push(rack(70 + i * 210, 118 + r * 268, 120, 210));
        }
        parts.push(line(60, 96 + r * 268, 1310, 96 + r * 268, s2));
      }
      parts.push(line(880, 96, 880, 384, `stroke="rgba(243,209,132,.35)"`));
      parts.push(line(880, 384, 1310, 384, `stroke="rgba(243,209,132,.35)"`));
      parts.push(circle(880, 96, 5, `fill="rgba(243,209,132,.7)"`));
      parts.push(text(1320, 660, 'PRIVATE / ON-PREM', `fill="rgba(120,107,85,.9)" font-size="14" text-anchor="end" ${mono} letter-spacing="2"`));
      return parts.join('');
    },
  },
  'workspace-05': {
    code: 'WS-05 / SHOWCASE HALL',
    caption: '展示厅 · 成果墙与体验动线',
    body: () => {
      const parts = [
        rect(120, 70, 1120, 272, `${s1} fill="rgba(214,170,82,.045)"`),
        line(120, 342, 1240, 342, s1),
      ];
      for (let r = 0; r < 2; r += 1) {
        for (let c = 0; c < 6; c += 1) {
          parts.push(screen(160 + c * 184, 104 + r * 118, 148, 92, r === 1 && c === 2));
        }
      }
      for (let i = 0; i < 4; i += 1) {
        parts.push(`<path d="M ${200 + i * 300} 52 L ${172 + i * 300} 150 L ${228 + i * 300} 150 Z" fill="rgba(243,209,132,.07)" stroke="none" />`);
        parts.push(circle(200 + i * 300, 46, 6, `fill="rgba(243,209,132,.6)"`));
      }
      parts.push(bench(300, 470, 760, 48));
      parts.push(`<path d="M 120 620 Q 680 566 1240 620" ${s2} fill="none" stroke-dasharray="8 12" />`);
      for (let i = 0; i < 5; i += 1) {
        parts.push(chair(240 + i * 220, 606 - Math.abs(2 - i) * 10, 20));
      }
      parts.push(text(1240, 660, 'VISITOR ROUTE', `fill="rgba(120,107,85,.9)" font-size="14" text-anchor="end" ${mono} letter-spacing="2"`));
      return parts.join('');
    },
  },
  'workspace-06': {
    code: 'WS-06 / LOUNGE DECK',
    caption: '休息区 · 绿植与自由交流',
    body: () => {
      const parts = [
        rect(150, 170, 460, 210, `stroke="rgba(214,170,82,.14)" fill="none" stroke-dasharray="10 10" rx="16"`),
        rect(190, 210, 380, 130, `${s1} ${fillSoft} rx="10"`),
        line(190, 254, 570, 254, s2),
        line(317, 210, 317, 340, s2),
        line(444, 210, 444, 340, s2),
        rect(760, 210, 380, 130, `${s1} ${fillSoft} rx="10"`),
        line(760, 254, 1140, 254, s2),
        line(887, 210, 887, 340, s2),
        line(1013, 210, 1013, 340, s2),
        `<ellipse cx="680" cy="290" rx="86" ry="46" ${s1} fill="rgba(214,170,82,.08)" />`,
        circle(680, 290, 16, `fill="rgba(243,209,132,.22)"`),
        plant(120, 520, 1.1),
        plant(1240, 500, 1.25),
        plant(660, 560, 0.9),
      ];
      parts.push(dimension(150, 640, 1140, 'COLLAB ZONE'));
      parts.push(text(120, 130, 'DAYLIGHT 68%', `fill="rgba(120,107,85,.9)" font-size="14" ${mono} letter-spacing="2"`));
      return parts.join('');
    },
  },
  'workspace-07': {
    code: 'WS-07 / RECEPTION',
    caption: '前台接待 · 品牌墙与访客动线',
    body: () => {
      const parts = [
        rect(420, 66, 520, 180, `${s1} fill="rgba(214,170,82,.05)"`),
        circle(680, 140, 46, `stroke="rgba(243,209,132,.6)" fill="rgba(214,170,82,.08)"`),
        `<path d="M 664 140 L 680 116 L 696 140 L 680 164 Z" fill="rgba(243,209,132,.5)" />`,
        line(560, 212, 800, 212, s2),
        text(680, 232, 'IGNISPATH / UVW', `fill="rgba(184,169,140,.8)" font-size="15" text-anchor="middle" ${mono} letter-spacing="3"`),
        `<path d="M 250 430 Q 680 350 1110 430 L 1110 500 Q 680 420 250 500 Z" ${s1} fill="rgba(214,170,82,.07)" />`,
        `<path d="M 250 430 Q 680 350 1110 430" stroke="rgba(243,209,132,.45)" fill="none" />`,
        text(680, 486, 'CONSULT', `fill="rgba(120,107,85,.95)" font-size="14" text-anchor="middle" ${mono} letter-spacing="4"`),
        rect(300, 592, 150, 40, `${s2} ${fillSoft} rx="6"`),
        rect(478, 592, 150, 40, `${s2} ${fillSoft} rx="6"`),
        rect(656, 592, 150, 40, `${s2} ${fillSoft} rx="6"`),
        plant(156, 380, 1.2),
        line(120, 560, 1240, 560, `stroke="rgba(224,194,126,.08)" stroke-dasharray="6 14"`),
      ];
      return parts.join('');
    },
  },
  'workspace-08': {
    code: 'WS-08 / FOCUS PODS',
    caption: '专注舱 · 深度工作与安静工位',
    body: () => {
      const pods = [[300, 210], [760, 210], [300, 500], [760, 500]];
      const parts = [];
      pods.forEach(([x, y], i) => {
        parts.push(circle(x, y, 86, `${s1} fill="rgba(214,170,82,.055)"`));
        parts.push(`<path d="M ${x - 86} ${y} A 86 86 0 0 1 ${x + 86} ${y}" stroke="rgba(243,209,132,.42)" fill="none" />`);
        parts.push(chair(x, y, 24));
        parts.push(desk(x + 150, y - 48, 210, 82));
        if (i % 2 === 0) {
          parts.push(`<path d="M ${x + 96} ${y - 22} A 42 42 0 0 1 ${x + 96} ${y + 22}" stroke="rgba(214,170,82,.3)" fill="none" stroke-dasharray="5 7" />`);
        }
      });
      parts.push(dimension(214, 656, 846, '2 × POD GRID'));
      parts.push(text(1160, 660, 'dB ≤ 38', `fill="rgba(120,107,85,.9)" font-size="14" text-anchor="end" ${mono} letter-spacing="2"`));
      parts.push(text(1160, 120, 'FOCUS / DEEP WORK', `fill="rgba(120,107,85,.9)" font-size="14" text-anchor="end" ${mono} letter-spacing="2"`));
      return parts.join('');
    },
  },
};

function build(key, scene) {
  const uid = key.replace(/[^a-z0-9]/gi, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${scene.caption}">
  <defs>
    <linearGradient id="bg${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0904" />
      <stop offset="0.55" stop-color="#080602" />
      <stop offset="1" stop-color="#050401" />
    </linearGradient>
    <radialGradient id="glow${uid}" cx="0.72" cy="0.26" r="0.7">
      <stop offset="0" stop-color="rgba(214,170,82,.2)" />
      <stop offset="0.45" stop-color="rgba(139,96,41,.07)" />
      <stop offset="1" stop-color="rgba(0,0,0,0)" />
    </radialGradient>
    <linearGradient id="scan${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgba(243,209,132,.09)" />
      <stop offset="1" stop-color="rgba(243,209,132,0)" />
    </linearGradient>
    <pattern id="grid${uid}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(224,194,126,.075)" stroke-width="1" />
    </pattern>
    <clipPath id="clip${uid}">
      <rect x="110" y="150" width="${SW}" height="${SH}" />
    </clipPath>
    <clipPath id="frame${uid}">
      <rect x="0" y="0" width="${W}" height="${H}" />
    </clipPath>
  </defs>

  <g clip-path="url(#frame${uid})">
    <rect width="${W}" height="${H}" fill="url(#bg${uid})" />
    <rect width="${W}" height="${H}" fill="url(#glow${uid})" />
    <rect x="110" y="150" width="${SW}" height="${SH}" fill="url(#grid${uid})" />
    <rect x="110" y="150" width="${SW}" height="${SH}" fill="none" stroke="rgba(224,194,126,.16)" />
    <rect x="110" y="150" width="${SW}" height="90" fill="url(#scan${uid})" />

    <g clip-path="url(#clip${uid})" transform="translate(110,150)">
      ${scene.body()}
    </g>

    <path d="M 46 96 L 46 62 L 80 62" fill="none" stroke="rgba(214,170,82,.5)" stroke-width="1.5" />
    <path d="M ${W - 46} 96 L ${W - 46} 62 L ${W - 80} 62" fill="none" stroke="rgba(214,170,82,.5)" stroke-width="1.5" />
    <path d="M 46 ${H - 96} L 46 ${H - 62} L 80 ${H - 62}" fill="none" stroke="rgba(214,170,82,.5)" stroke-width="1.5" />
    <path d="M ${W - 46} ${H - 96} L ${W - 46} ${H - 62} L ${W - 80} ${H - 62}" fill="none" stroke="rgba(214,170,82,.5)" stroke-width="1.5" />

    <text x="110" y="72" fill="rgba(214,170,82,.85)" font-size="17" ${mono} letter-spacing="2.5">${scene.code}</text>
    <text x="${W - 110}" y="72" fill="rgba(120,107,85,.9)" font-size="15" text-anchor="end" ${mono} letter-spacing="2">IGNISPATH · UVW LAB</text>
    <line x1="110" y1="90" x2="${W - 110}" y2="90" stroke="rgba(224,194,126,.16)" />

    <text x="110" y="${H - 74}" fill="rgba(184,169,140,.78)" font-size="17" ${mono}>${scene.caption}</text>
    <text x="${W - 110}" y="122" fill="rgba(120,107,85,.8)" font-size="14" text-anchor="end" ${mono} letter-spacing="2">SCALE 1:50 · REV 2026</text>

    <line x1="110" y1="900" x2="${W - 110}" y2="900" stroke="rgba(224,194,126,.14)" />
    <line x1="110" y1="900" x2="230" y2="900" stroke="rgba(243,209,132,.6)" stroke-width="3" />
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<line x1="${110 + i * 172}" y1="890" x2="${110 + i * 172}" y2="900" stroke="rgba(120,107,85,.7)" />`).join('')}
    <text x="${W - 110}" y="926" fill="rgba(120,107,85,.8)" font-size="14" text-anchor="end" ${mono} letter-spacing="2">0 — 8 000 mm</text>
    <circle cx="${W - 132}" cy="${H - 118}" r="6" fill="rgba(243,209,132,.65)" />
    <circle cx="${W - 158}" cy="${H - 118}" r="4" fill="rgba(214,170,82,.45)" />
  </g>
</svg>
`;
}

await mkdir(OUT, { recursive: true });
for (const [key, scene] of Object.entries(SCENES)) {
  await writeFile(path.join(OUT, `${key}.svg`), build(key, scene), 'utf8');
  console.log('wrote', `${key}.svg`);
}
