export interface SVGParams {
  ownerAddress: string;
  tokenId: number;
  level: number;
  levelAsString: string;
  lockers: number;
  tvl: number;
  colors: string[];
}

export const generateSVG = (params: SVGParams) => {
  const tokenId = params.tokenId;
  let tokenIdAsString = "";

  if (tokenId / 100 >= 1) {
    tokenIdAsString = tokenId.toString();
  } else if (tokenId / 10 >= 1) {
    tokenIdAsString = "0" + tokenId.toString();
  } else {
    tokenIdAsString = "00" + tokenId.toString();
  }
  return `
        ${generateSVGDefs(params)}
        ${generateSVGBorderText(params.colors[0], params.ownerAddress)}
        ${generateSVGCardTitle(params.colors[0], tokenIdAsString)}
        ${generateSVGCardLogo(params.colors[0])}
        ${generateSVGInfo(params.colors, params.levelAsString, params.lockers.toString(), params.tvl.toString())}
        </svg>
    `;
};

const generateSVGDefs = (params: SVGParams) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="290" height="500" viewBox="0 0 290 500">
          <defs><clipPath id="clip-path"><rect width="290" height="500" rx="42" ry="42" fill="none" /></clipPath>
          <linearGradient id="linear-gradient" x1="434.37" y1="325.45" x2="434.37" y2="-142.35" gradientTransform="matrix(1, 0, 0, -1, 0, 270)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#${params.colors[1]}" /><stop offset="1" stop-color="#${params.colors[2]}" stop-opacity="0" /></linearGradient>
          <linearGradient id="linear-gradient-2" x1="145.53" y1="65.57" x2="145.53" y2="414.28" gradientTransform="matrix(1, 0, 0, -1, 0, 270)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#${params.colors[3]}" /><stop offset="1" stop-color="#${params.colors[4]}" stop-opacity="0" /></linearGradient>
          <linearGradient id="linear-gradient-3" x1="40.1" y1="158.99" x2="40.1" y2="-115.28" gradientTransform="matrix(1, 0, 0, -1, 0, 270)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#${params.colors[5]}" /><stop offset="1" stop-color="#${params.colors[6]}" stop-opacity="0" /></linearGradient>
          <linearGradient id="linear-gradient-4" x1="0%" y1="50%" x2="0%" y2="100%"><stop offset="0" stop-color="#${params.colors[7]}" />
          <stop offset="1" stop-color="#${params.colors[8]}" stop-opacity="1" /></linearGradient>
          <path id="text-path-a" d="M40 12 H250 A28 28 0 0 1 278 40 V460 A28 28 0 0 1 250 488 H40 A28 28 0 0 1 12 460 V40 A28 28 0 0 1 40 12 z" /></defs>
          <g clip-path="url(#clip-path)"><g><rect width="290" height="500" fill="url(#linear-gradient-4)" rx="42" ry="42" />
          <path d="M221.47 355.75l142.33 82.31a69 69 0 0 0 69.14 0l142.33-82.31a69.23 69.23 0 0 0 34.54-60v-164.64a69.26 69.26 0 0 0-34.54-60l-142.33-82.27a69 69 0 0 0-69.14 0l-142.33 82.3a69.41 69.41 0 0 0-34.54 60v164.65a69.37 69.37 0 0 0 34.54 60z" fill="url(#linear-gradient)" />
          <path d="M295.129-83.6l-116.699-67.496a56.639 56.639 0 0 0-28.347-7.612 56.617 56.617 0 0 0-28.347 7.612l-116.71 67.496a56.661 56.661 0 0 0-20.735 20.779 56.892 56.892 0 0 0-7.59 28.391v135.025a56.793 56.793 0 0 0 28.325 49.17l116.71 67.485a56.518 56.518 0 0 0 56.694 0l116.699-67.485a56.892 56.892 0 0 0 28.325-49.17v-135.025a56.947 56.947 0 0 0-7.601-28.38 56.661 56.661 0 0 0-20.724-20.79z" fill="url(#linear-gradient-2)" />
          <path d="M-83.61 331.57l83.45 48.26a40.4 40.4 0 0 0 40.53 0l83.45-48.26a40.58 40.58 0 0 0 20.25-35.15v-96.55a40.58 40.58 0 0 0-20.25-35.16l-83.45-48.26a40.47 40.47 0 0 0-40.53 0l-83.45 48.26a40.62 40.62 0 0 0-14.82 14.86 40.71 40.71 0 0 0-5.43 20.3v96.55a40.71 40.71 0 0 0 5.43 20.29 40.54 40.54 0 0 0 14.82 14.86z" fill="url(#linear-gradient-3)" /></g></g>
    `;
};

const generateSVGBorderText = (color: string, address: string) => {
  return `
        <rect width="290" height="500" rx="42" ry="42" fill="rgba(0,0,0,0.5)" /><text text-rendering="optimizeSpeed">
        <textPath startOffset="-100%" fill="#${color}" font-family="Sans-serif" font-size="10" xlink:href="#text-path-a">${address} • OWNER
        <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /></textPath>
        <textPath startOffset="0%" fill="#${color}" font-family="Sans-serif" font-size="10" xlink:href="#text-path-a">${address} • OWNER
        <animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /></textPath></text>
    `;
};

const generateSVGCardTitle = (color: string, tokenId: string) => {
  return `
        <rect x="16" y="16" width="258" height="468" rx="26" ry="26" fill="rgba(0,0,0,0)" stroke="#${color}"/>
        <text x="41" y="56" font-family="Sans-serif" font-size="16" font-weight="600" fill="#${color}">www.nodesynapse.org</text>
        <text x="80" y="117" font-family="Sans-serif" font-size="40" font-weight="600" fill="#${color}">No.${tokenId}</text>
        <text x="100" y="355" font-family="Sans-serif" font-weight="600" font-size="20" fill="#${color}">NODESYNAPSE</text>
    `;
};

const generateSVGCardLogo = (color: string) => {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.22 392.95" width="200" height="200" x="45" y="135">
        <style>.cls-1{fill:#${color};}</style>
        <path class="cls-1" d="M148.29 71.71a43.49 43.49 0 0 0-8-8.66 57.54 57.54 0 0 0-11.42-7.26l-1.28-.62c0 .19.07.39.11.59.43 2.36.91 4.71 1.34 7.05.34 1.85.64 3.7.83 5.56.85 8.3-2.37 14.75-8.73 19.48-1.3 1-1.69 1.81-.68 3.27.78 1.13 1.43 2.34 2.26 3.43a6.42 6.42 0 0 0 5.4 2.45c4.25 0 7.83-1.64 11.15-3.74a27.13 27.13 0 0 0 9.73-9.87c2.09-3.84 2.1-7.64-.71-11.68z" />
        <path class="cls-1" d="M126.51 62.31a38.73 38.73 0 0 0-1.83-6.69 41.53 41.53 0 0 0-7.6-12.73c-1.69-2-3.77-3.62-5.67-5.42l-.44.27a46 46 0 0 1 2.45 17q-.11 1.74-.36 3.48a2.89 2.89 0 0 0 0 .29c-.6 3.77-2 7.33-2.9 11a7.42 7.42 0 0 0 0 4.1 28.77 28.77 0 0 0 7.77 11.49 1.55 1.55 0 0 0 2.39.06c4.83-3.87 6.91-9.18 6.88-15.39a42.85 42.85 0 0 0-.69-7.46z" />
        <path class="cls-1" d="M105 31a35.46 35.46 0 0 0-12.35-12.09c3.36 9.86 3.09 19.22 2.68 28.66-.1 2.31 1.36 5 2.54 7.29a43.65 43.65 0 0 0 3.13 5.26c.33.47.67.94 1 1.4a36.34 36.34 0 0 0 4.38 4.84c.42.38.89.71 1.47 1.16a56.71 56.71 0 0 0 2.15-9.43c.15-1.14.27-2.29.35-3.45.05-.63.08-1.25.1-1.88A38.13 38.13 0 0 0 105 31zM80.15 7.94c.19 2.37.51 4.43.49 6.45a23.75 23.75 0 0 1-.62 6.4c-1.13 3.8-.21 7.38 1.48 11 2.5 5.39 6.5 9.77 11.25 14.27.45-9.22.64-18-2.76-26.58-1.86-4.72-5.65-8.15-9.84-11.54zM76.73 6.34A23.76 23.76 0 0 0 69 .22 7.12 7.12 0 0 0 66.57 0a5.5 5.5 0 0 0 .13 2.2c2 3.8 4 7.59 6.19 11.29 1.26 2.13 2.86 4.1 4.55 6.49a29 29 0 0 0-.26-12.74 2.13 2.13 0 0 0-.45-.9zM258.93 240.28c4.74 4.78 10 9.48 15.08 14.23a78.72 78.72 0 0 1 12.65 14.78c6 8.37 7.15 19.35.38 27.54-5.32 6.44-13.28 11-22.13 14.37-27.41 8.92-53.25 9.9-81.78 6.81-18.75-2.85-37.25-7.07-56-9.84-19.27-2.53-37.24-3.6-56.48-.76-20.62 4.11-38 15.82-50.26 32.84-10.27 14.44-15.87 30-19.89 47.12A24.05 24.05 0 0 0 0 393c.29-.52.62-1 .87-1.56 9.27-21.47 24.67-40.29 46.21-50.18 15-5.77 28.92-8.44 44.91-9.64 27.29-.6 54.42 1.89 81.67 3a459.78 459.78 0 0 0 63.34-3.21 124.46 124.46 0 0 0 47.43-16.11c8.61-5.13 14.93-13.54 16.39-23.56 1.89-14.81-9-24.72-18.65-34a218.9 218.9 0 0 0-23.24-17.46zM123.23 279.77c-8.06 1.64-15.08-1.64-22-4.72a51.18 51.18 0 0 0-30.17-4 87.1 87.1 0 0 1-13.39 1.19c-9 .14-12.14-3.77-10.39-12.51.52-2.6 2.24-5.68 1.4-7.71a43.68 43.68 0 0 1-2.4-25.78c.09-.44-.26-.95-.35-1.44-1.19-6.92.34-11 6.79-13.84A48.7 48.7 0 0 1 68 207.31c10-.79 20.21-.23 30.24-1.16 12.77-1.17 23 4.7 27.27 16.86 2.16 6.11 4.51 12.17 6.3 18.39 2 7 3.51 14.12 5.23 21.19-.83 10.76-4.32 15.25-13.81 17.18zm-20.54-47.13c-3.36 2.77-3.85 9.37-1.07 12.23s8.24 2.75 11.1-1.06A25.1 25.1 0 0 0 117 233c.62-3.77-.19-7.77-.37-11.5-5.13 4.07-9.63 7.5-13.94 11.14zm-55.34 2.12c0 1.79 1.48 3.84 2.86 5.2.63.62 3.54.26 3.85-.38.83-1.79 1.62-4.25 1-5.91-1.3-3.49-3.52-6.64-5.37-9.93l-1.09.26c-.47 3.59-1.32 7.19-1.25 10.76zM245.13 79.05c-.34-23.87-15.13-37.55-33.74-43.74-1.69-.56-5.08 0-5.67 1.08a7.48 7.48 0 0 0 .36 6.34c2.08 3.35 5.24 6 7.56 9.24 4.46 6.22 7.47 13 6.25 21-.84 5.44-3.58 8.16-9 8-4.36-.17-5.46 2.06-6 5.52-1.32 8.53 2.17 15.59 10.84 19.26 14.51 6.15 16.42 6 24.49-7.6 3.26-5.49 4.57-12.13 5-19zM31.34 64.87c.24 10 5.36 20.8 15.23 28.42 7.1 5.49 15.71 9 23.71 13.33 3.21 1.73 6.41.57 7.75-2.29a181.8 181.8 0 0 0 7.66-19.79c.22-.65-2.22-2.78-3.74-3.32-5.62-2-11.64-3-17-5.45C52 69.83 44.2 60 44 45.12c0-1.49-1.21-3.9-2.32-4.2s-3.48.83-4.48 2c-4.62 5.51-5.97 12.14-5.86 21.95z" />
        <path class="cls-1" d="M164.42 289.19c34.78 5.19 65.58-9.18 73.37-51.76 2.76-15.07 2.48-30.7 3.66-47.08-3.46 15.93-5.57 31-10.12 45.36-7.34 23.09-21.46 41-45.44 48.83-7.18 2.36-14.83 3.25-21.47 4.65zM69.28 275.45c10.09 20.78 33.57 26.84 52.18 9.91-11.14-3.2-22.71-7-34.53-9.7-5.43-1.23-11.36-.21-17.65-.21zM175.89 71.3c-15.29-3.3-30.39 2.29-45.63 1.31 3.35.63 7.31.39 9.88 2.16 2.23 1.54 2.89 5.35 4 7.57 7.02-11.25 19.41-10.81 31.75-11.04z" />
        <path fill="none" d="M181.07 167.82c2.58 3.59 5.86 4.7 9.48 3.67 4.81-1.35 6.47-5.38 7.26-10.16-3.81 6.73-8.96 9.74-16.74 6.49zM211.47 155.44zM185.59 148.82c-5 4.72-6.35 7.15-11.33 13.23a19 19 0 0 0-2.47 3.34v.05c4-2.21 2.66-1 4-2.21 2.42-2.25 5.46-5.9 8.6-8.39-2.1-.22.85-1 1.17-1.87a4 4 0 0 1 2.1-2.1c.89-.51 6.46-2.74 7.39-2.58 1.1.19-.07 1.33-.63 2.29 2.7-.37 5.32.22 9 2.44-2.51-7.02-12.42-8.29-17.83-4.2zM198 135.52c-7.17-.84-12.85 4.26-17.4 8.78 6.17-4.15 15.87-11.23 22.74-3.24a6 6 0 0 0 2 .7c-2.13-2.84-5.41-6.01-7.34-6.24zM289.45 115.74l-10.38-5.36-.6.78 6.15 9.36c-6.24-1.61-11.32-2.75-16.63 1.47 5.11.31 9.36.67 11.62 6.4-7.63-.39-14.51.34-20.37 5.62l16.38-1.15.45 2.58c-4.93 1.27-9.81 3-14.82 3.69-4.57.64-9.3.16-14 .2-3.32 0-4.63-1.58-4.82-4.89-.62-10.48 3-19.58 8.59-28.11l3.17-4.82c-11.68 7.23-19.77 27-16.37 38.55.44 1.51 1.77 3.55 3.08 3.9 18 4.78 37.56 2.88 49.85-15.88 4.76-7.26 4.19-15.35-1.34-21z" />
        <path class="cls-1" d="M211.47 155.44zM309 81.37c-16.87-3.59-32.55-.43-46.84 8.74-6.82 4.38-12.87 10-19.14 15.17-4.58 3.8-9.12 7.69-13.38 11.85-2.06 2-3.45 4.73-5.14 7.13l-1.79-.44c.91-3.43 1.82-6.86 2.81-10.61-1-.3-2.33-.83-3.73-1.13-15.2-3.24-21.92-11.38-20.53-26.79.55-6.1-1.9-8-6.82-9-.65-.13-1.31-.25-2-.39-8.23-1.78-8.93-1.08-10 7.35a78.64 78.64 0 0 1-3.28 15.55c-3.33 9.85-1.5 15.45 7.68 20.81a5.35 5.35 0 0 1 2.33 2.68c-1-.21-2.09-.37-3.11-.64-8.25-2.25-15.59-.62-21.49 5.64a35.25 35.25 0 0 0-6.62 9.3c-3.07 6.87-7.75 11.81-13.49 16.73-6.82 5.83-12.19 13.57-17.3 21.09-2 3-2.73 7.72-2.23 11.42A86.68 86.68 0 0 0 130.1 206c2.34 5.92 3.87 11.49 2.4 17.81-1.32 5.67.94 10.17 5.63 13.36 4.88 3.31 8.62 7 8.89 13.56.08 1.79 2.39 3.87 4.16 5.11 2.57 1.8 3.32 3.79 1.74 6.31-2.69 4.29-5.64 8.42-8.18 12.19 11.55-3.08 26.37-15.79 40.09-34.79 1.72 5.49-3.2 16.19-15.25 32.58 18.61-14.17 32.29-30.66 39.62-52a108.86 108.86 0 0 0 2.27-64.75l6 14a32.51 32.51 0 0 0 2.56-2.08c6.09-6.08 13.44-8.64 22-9.11 8.26-.46 16.67-1.15 24.67-3.14 25.79-6.4 43-26.59 46.35-53.46.57-4.61.59-9.29 1.09-13.92.46-4-1.45-5.51-5.14-6.3zm-118.45 90.12c-3.62 1-6.9-.08-9.48-3.67 7.78 3.25 12.93.24 16.74-6.49-.81 4.78-2.45 8.81-7.26 10.16zm3.83-20.9a9.09 9.09 0 0 1-7.72 4.32 21.83 21.83 0 0 1-2.31-.07c-3.14 2.49-6.18 6.14-8.6 8.39-1.33 1.23 0 0-4 2.21v-.05a19 19 0 0 1 2.47-3.34c5-6.08 6.35-8.51 11.33-13.23 5.45-4.09 15.32-2.81 17.82 4.21-3.67-2.22-6.29-2.81-8.99-2.44zm9-9.53c-6.87-8-16.57-.91-22.74 3.24 4.55-4.52 10.23-9.62 17.4-8.78 1.92.23 5.2 3.4 7.3 6.24a6 6 0 0 1-1.99-.7zm87.44-13C278.5 146.84 259 148.74 240.94 144c-1.31-.35-2.64-2.39-3.08-3.9-3.4-11.57 4.69-31.32 16.37-38.55l-3.17 4.82c-5.61 8.53-9.21 17.63-8.59 28.11.19 3.31 1.5 4.92 4.82 4.89 4.66 0 9.39.44 14-.2 5-.7 9.89-2.42 14.82-3.69l-.45-2.58-16.42 1.1c5.86-5.28 12.74-6 20.37-5.62-2.26-5.73-6.51-6.09-11.62-6.4 5.31-4.22 10.39-3.08 16.63-1.47l-6.15-9.36.6-.78 10.38 5.36v-8.69c5.55 5.69 6.1 13.78 1.34 21.04z" />
        <path fill="none" d="M64.36 155.93c.85 4.1 2.72 6.84 6.29 10.28 1.29 1.25 3.5 2.59 7.33 3.78-9.67-5.65-10.5-8.17-13.62-14.06zM26.7 94l27.65 21.28C47.63 104.52 39.16 96.5 26.7 94zM63.41 146.34v-.24zM31.79 127.5l5.58.77c.23-.32.45-.65.68-1l-9.67-5.67c.57-1.16 1.45-3 2.62-5.38L25.74 114v-5.6l-4.08 2.12c-.82-2.8-1.6-5.42-2.51-8.49-5.5 16.64 10 37.12 27.43 37.1L31 129.46zM65.38 139.52a27.5 27.5 0 0 0 10.06 6.06 3.95 3.95 0 0 0 2.87.34 81.8 81.8 0 0 1-11.47-6.47c-1.38-.95-2.42-.61-1.46.07zM69.58 149.21c.89.32 4.61 5 5.12 5.91a4 4 0 0 1 .78 2.87c-.16 1 2.25 3.28-.29 2a58.78 58.78 0 0 0 3.12 7.11c-.87-7.4-3.58-16.26-10.13-20.46-1.81-1.17-2.49-1.49-4.74-.57a13.32 13.32 0 0 1 5.56 3.22c.12-.13.29-.18.58-.08z" />
        <path class="cls-1" d="M108.36 83.45c-.46-1.35-4.14-1.93-6.46-2.21-2.09-.26-4.28.56-6.43.56-3.44 0-4.83 1.8-5.9 4.87-2.18 6.24-4.27 12.63-7.42 18.4-3.92 7.17-7.36 8.33-14.83 5a120.06 120.06 0 0 1-20.8-11.58c-10.74-7.7-22.18-13.33-35.15-15.94-2.83-.58-4.42-.37-5 2.75-2.57 12.6-3.21 25.08 2.1 37.21 6.58 15 18.55 23 34.34 25.83 5.06.92 10.1 2 15.13 3.15 3.07.67 4.37 2.36 5 5.79.63 3.72 3 7.13 4.66 10.69.77 1.72 2.46 3.72 2.08 5.15-2.11 7.94-2.22 15.42 3.85 22.38 7.42-11.75 16-23.19 15.21-38.78-.48-9.05.44-18.17.48-27.26a7 7 0 0 0-9.31-6.91c-6.66 2-13 5.23-19.36 7.91 2.26-2 4.65-4.73 7.6-6.57s6.57-2.41 9.55-4.15c4.36-2.54 9-5 12.46-8.61 5.16-5.34 9.39-11.59 14-17.44.83-1 2-1.92 2.49-3.09.88-2.34 2.35-5.17 1.71-7.15zM19.15 102c.91 3.07 1.69 5.69 2.51 8.49l4.08-2.12V114l5.26 2.24c-1.17 2.4-2.05 4.22-2.62 5.38l9.67 5.67c-.23.33-.45.66-.68 1l-5.58-.77-.79 2 15.58 9.62c-17.45-.04-32.93-20.52-27.43-37.14zm7.55-8c12.46 2.55 20.93 10.57 27.65 21.28zm44 72.26c-3.57-3.44-5.44-6.18-6.29-10.28 3.12 5.89 4 8.41 13.62 14.06-3.88-1.24-6.09-2.58-7.38-3.83zm-3.81-26.76a81.8 81.8 0 0 0 11.47 6.47 3.95 3.95 0 0 1-2.87-.34 27.5 27.5 0 0 1-10.06-6.06c-1.01-.73.03-1.07 1.41-.12zm-3.4 6.65c2.25-.92 2.93-.6 4.74.57 6.55 4.2 9.26 13.06 10.13 20.46a58.78 58.78 0 0 1-3.17-7.18c-.41-.21-1-.5-1.66-.92a9.07 9.07 0 0 1-4.53-7.57c0-.81-.24-1.86 0-2.22a13.32 13.32 0 0 0-5.58-3.19v.24zM63.41 146.34z" /></svg>
    `;
};

const generateSVGInfo = (color: string[], level: string, lockers: string, tvl: string) => {
  return `
        <rect x="29" y="379" width="230" height="26" rx="8" ry="8" fill="#${color[9]}" />
        <text x="41" y="397" font-family="Sans-serif" font-size="14" font-weight="600" fill="#${color[0]}">LEVEL: ${level}</text>
        <rect x="29" y="409" width="230" height="26" rx="8" ry="8" fill="#${color[9]}" />
        <text x="41" y="427" font-family="Sans-serif" font-size="14" font-weight="600" fill="#${color[0]}">LOCKERS: ${lockers}</text>
        <rect x="29" y="439" width="230" height="26" rx="8" ry="8" fill="#${color[9]}" />
        <text x="41" y="457" font-family="Sans-serif" font-size="14" font-weight="600" fill="#${color[0]}">LOCKED: ${tvl} MILK</text>
    `;
};
