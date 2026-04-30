// ========== CYBER VISUAL EFFECTS BRE ==========
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');
let W, H;
let frame = 0;
let currentMode = 'grid'; // default: grid

const COLORS = {
  cyan: '#00fff2',
  magenta: '#ff00e5',
  red: '#ff003c',
  green: '#39ff14',
  yellow: '#ffe600',
  blue: '#0080ff'
};
const colorArr = [COLORS.cyan, COLORS.magenta, COLORS.red, COLORS.green, COLORS.yellow, COLORS.blue];

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
window.addEventListener('resize', resize);
resize();

// DRAW GRID
function drawGrid(t) {
  const horizon = H * 0.45;
  ctx.strokeStyle = COLORS.cyan;
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 25; i++) {
    const y = horizon + (H - horizon) * (i / 25);
    ctx.globalAlpha = 0.15 + i / 50;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  for (let i = -10; i <= 10; i++) {
    const x = W / 2 + i * 50;
    ctx.beginPath();
    ctx.moveTo(x, horizon);
    ctx.lineTo(x + Math.sin(t * 0.002 + i) * 10, H);
    ctx.stroke();
  }
  const grad = ctx.createRadialGradient(W / 2, horizon, 0, W / 2, horizon, 120);
  grad.addColorStop(0, 'rgba(0,255,242,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

// DRAW TUNNEL (tanpa wave)
function drawTunnel(t) {
  const cx = W / 2;
  const cy = H / 2;
  for (let i = 0; i < 30; i++) {
    const r = 30 + i * 15 + Math.sin(t * 0.002) * 20;
    const sides = 6;
    ctx.beginPath();
    for (let s = 0; s <= sides; s++) {
      const angle = (s / sides) * Math.PI * 2 + t * 0.001;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = colorArr[i % colorArr.length];
    ctx.globalAlpha = 0.3;
    ctx.stroke();
  }
}

// DRAW MATRIX (hanya kode hijau/neon jatuh)
function drawMatrix(t) {
  ctx.fillStyle = 'rgba(5,5,10,0.15)';
  ctx.fillRect(0, 0, W, H);
  ctx.font = 'bold 20px "Share Tech Mono"';
  for (let i = 0; i < 50; i++) {
    const x = (i * 37) % W;
    const y = (frame * 2 + i * 50) % H;
    const char = String.fromCharCode(0x30A0 + Math.random() * 80);
    ctx.fillStyle = `hsl(${Date.now() / 50 % 360}, 100%, 60%)`;
    ctx.fillText(char, x, y);
  }
}

// Mode switching (Grid, Tunnel, Matrix)
const btns = document.querySelectorAll('.mode-btn');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentMode = btn.dataset.mode;
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Light Mode Toggle
const lightBtn = document.getElementById('lightModeBtn');
if (lightBtn) {
  lightBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    lightBtn.innerHTML = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
    
    // Atur tampilan canvas saat light mode (opsional: redupkan atau biarkan)
    canvas.style.opacity = isLight ? '0.2' : '1';
  });
}

// Animasi loop
function animate() {
  frame++;
  const t = performance.now();
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(5,5,10,0.2)';
  ctx.fillRect(0, 0, W, H);
  
  switch (currentMode) {
    case 'grid':
      drawGrid(t);
      break;
    case 'tunnel':
      drawTunnel(t);
      break;
    case 'matrix':
      drawMatrix(t);
      break;
    default:
      drawGrid(t);
  }
  
  requestAnimationFrame(animate);
}
animate();
