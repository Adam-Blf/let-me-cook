// Génère tous les assets de lancement depuis le SVG Cooky.
// Usage · node scripts/generate-assets.mjs
// Produit · assets/icon.png · adaptive-icon.png · splash-icon.png · favicon.png
//         · assets/notification-icon.png · assets/app-store-icon.png

import { writeFileSync, mkdirSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const TOKENS = {
  cream: '#F6F1E8',
  paper: '#FBF8F1',
  saffronSoft: '#F3D9B1',
  saffron: '#D97A27',
  ink: '#1A1511',
  skin: '#E8C9A8',
  hatShadow: '#E8E0CE',
  neck: '#C44536',
  neckDark: '#A03528',
  cheek: '#E8A896',
  mustache: '#3D342B',
};

// Cooky en pose "wave" (toque grande, bras levé à droite, sourire) · viewBox 120x120
const COOKY_WAVE = `
  <path d="M30 108 Q30 88 42 84 L78 84 Q90 88 90 108 Z" fill="${TOKENS.paper}"/>
  <path d="M30 108 Q30 88 42 84 L78 84 Q90 88 90 108 Z" fill="none" stroke="${TOKENS.hatShadow}" stroke-width="1"/>
  <circle cx="60" cy="95" r="1.8" fill="${TOKENS.neck}"/>
  <path d="M44 82 L60 86 L76 82 L72 92 L60 90 L48 92 Z" fill="${TOKENS.neck}"/>
  <path d="M60 86 L60 90" stroke="${TOKENS.neckDark}" stroke-width="0.8"/>
  <circle cx="60" cy="66" r="18" fill="${TOKENS.skin}"/>
  <ellipse cx="41" cy="66" rx="2.5" ry="3.5" fill="${TOKENS.skin}"/>
  <ellipse cx="79" cy="66" rx="2.5" ry="3.5" fill="${TOKENS.skin}"/>
  <ellipse cx="46" cy="70" rx="3" ry="2" fill="${TOKENS.cheek}" opacity="0.55"/>
  <ellipse cx="74" cy="70" rx="3" ry="2" fill="${TOKENS.cheek}" opacity="0.55"/>
  <path d="M46 63 Q50 58 54 63" stroke="${TOKENS.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M66 63 Q70 58 74 63" stroke="${TOKENS.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M52 70 Q55 73 60 71 Q65 73 68 70 Q65 74 60 73 Q55 74 52 70 Z" fill="${TOKENS.mustache}"/>
  <path d="M55 74 Q60 78 65 74" stroke="${TOKENS.ink}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <rect x="42" y="48" width="36" height="6" rx="2" fill="${TOKENS.paper}"/>
  <circle cx="48" cy="38" r="11" fill="${TOKENS.paper}"/>
  <circle cx="72" cy="38" r="11" fill="${TOKENS.paper}"/>
  <circle cx="60" cy="32" r="13" fill="${TOKENS.paper}"/>
  <circle cx="54" cy="42" r="9" fill="${TOKENS.paper}"/>
  <circle cx="66" cy="42" r="9" fill="${TOKENS.paper}"/>
  <circle cx="52" cy="36" r="3" fill="${TOKENS.hatShadow}" opacity="0.25"/>
  <path d="M38 92 Q34 100 36 108" stroke="${TOKENS.paper}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M82 92 Q92 80 96 68" stroke="${TOKENS.paper}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <circle cx="97" cy="66" r="5" fill="${TOKENS.skin}"/>
`;

// CookyMark · version simplifiée sans visage détaillé, pour favicon / notification
const COOKY_MARK = `
  <rect x="13" y="22" width="22" height="5" rx="1.5" fill="${TOKENS.ink}"/>
  <circle cx="17" cy="16" r="6" fill="${TOKENS.ink}"/>
  <circle cx="31" cy="16" r="6" fill="${TOKENS.ink}"/>
  <circle cx="24" cy="13" r="7" fill="${TOKENS.ink}"/>
  <circle cx="24" cy="33" r="8" fill="${TOKENS.ink}"/>
  <circle cx="21" cy="32" r="1.2" fill="${TOKENS.paper}"/>
  <circle cx="27" cy="32" r="1.2" fill="${TOKENS.paper}"/>
  <path d="M19.5 35 Q22 37 24 35.5 Q26 37 28.5 35" stroke="${TOKENS.paper}" stroke-width="1" fill="none" stroke-linecap="round"/>
`;

// iOS et App Store · fond plein (iOS arrondit les coins auto), Cooky centré au scale 6.5 pour laisser ~12% margin
function svgIOSIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
    <defs>
      <radialGradient id="warm" cx="0.3" cy="0.2" r="0.95">
        <stop offset="0" stop-color="${TOKENS.saffronSoft}"/>
        <stop offset="0.6" stop-color="${TOKENS.cream}"/>
        <stop offset="1" stop-color="${TOKENS.cream}"/>
      </radialGradient>
    </defs>
    <rect width="1024" height="1024" fill="url(#warm)"/>
    <g transform="translate(122, 122) scale(6.5)">${COOKY_WAVE}</g>
  </svg>`;
}

// Android adaptive foreground · 108dp safe zone = centre 66% (donc Cooky à scale 4.5 avec beaucoup de padding)
function svgAdaptiveForeground() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <g transform="translate(242, 242) scale(4.5)">${COOKY_WAVE}</g>
  </svg>`;
}

// Splash · icon centré, transparent (Expo met le backgroundColor depuis app.json)
function svgSplashIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
    <g transform="translate(212, 212) scale(5)">${COOKY_WAVE}</g>
  </svg>`;
}

// Favicon web · 48x48 upscalé à 196px (meilleur rendu sur écrans denses)
function svgFavicon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="${TOKENS.cream}"/>
    <g transform="translate(0, 0)">${COOKY_MARK}</g>
  </svg>`;
}

// Notification icon Android · silhouette blanche sur transparent (convention Material)
function svgNotificationIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48">
    <g>
      <rect x="13" y="22" width="22" height="5" rx="1.5" fill="#FFFFFF"/>
      <circle cx="17" cy="16" r="6" fill="#FFFFFF"/>
      <circle cx="31" cy="16" r="6" fill="#FFFFFF"/>
      <circle cx="24" cy="13" r="7" fill="#FFFFFF"/>
      <circle cx="24" cy="33" r="8" fill="#FFFFFF"/>
    </g>
  </svg>`;
}

function render(svg, outPath, { width } = {}) {
  const opts = width ? { fitTo: { mode: 'width', value: width } } : {};
  const png = new Resvg(svg, opts).render().asPng();
  writeFileSync(outPath, png);
  console.log(`wrote ${outPath} (${(png.length / 1024).toFixed(1)} KB)`);
}

mkdirSync('assets', { recursive: true });

render(svgIOSIcon(1024), 'assets/icon.png');
render(svgAdaptiveForeground(), 'assets/adaptive-icon.png');
render(svgSplashIcon(), 'assets/splash-icon.png');
render(svgFavicon(196), 'assets/favicon.png');
render(svgNotificationIcon(), 'assets/notification-icon.png');

// App Store Connect demande un 1024 carré non-transparent · on réutilise l'icon iOS
render(svgIOSIcon(1024), 'assets/app-store-icon.png');

console.log('\n✓ tous les assets générés dans assets/');
