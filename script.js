// ========== CYBER RGB VISUAL EFFECTS ========== <>????????????? 0x00000602 anjai
const canvas = document.getElementById('cyberCanvas');
const trailCanvasEl = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');
const tctx = trailCanvasEl.getContext('2d');
let W, H;
let frame = 0;
let currentMode = 'grid';

const COLORS = { cyan:'#00fff2', magenta:'#ff00e5', red:'#ff003c', green:'#39ff14', yellow:'#ffe600', blue:'#0080ff' };
const colorArr = [COLORS.cyan, COLORS.magenta, COLORS.red, COLORS.green, COLORS.yellow, COLORS.blue];

function resize() {
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W; canvas.height = H;
  trailCanvasEl.width = W; trailCanvasEl.height = H;
}
window.addEventListener('resize', resize);
resize();

// MODE putar baling baling bambu
function drawGrid(t) {
  const horizon = H*0.45;
  ctx.strokeStyle = COLORS.cyan; ctx.lineWidth = 0.8;
  for(let i=0;i<25;i++) {
    const y = horizon + (H-horizon)*(i/25);
    ctx.globalAlpha = 0.15 + i/50;
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
  }
  for(let i=-10;i<=10;i++) {
    const x = W/2 + i*50;
    ctx.beginPath(); ctx.moveTo(x, horizon); ctx.lineTo(x + Math.sin(t*0.002 + i)*10, H); ctx.stroke();
  }
  const grad = ctx.createRadialGradient(W/2,horizon,0,W/2,horizon,120);
  grad.addColorStop(0,'rgba(0,255,242,0.2)'); grad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
}
function drawWave(t) {
  for(let l=0;l<4;l++) {
    const baseY = H*0.3 + l*80;
    const amp = 30 + l*10;
    ctx.beginPath(); ctx.moveTo(0, baseY);
    for(let x=0;x<=W;x+=15) {
      const y = baseY + Math.sin(x*0.01 + t*0.002)*amp + Math.sin(x*0.03 + t*0.005)*10;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
    ctx.fillStyle = colorArr[l%colorArr.length]+'20'; ctx.fill();
    ctx.strokeStyle = colorArr[l%colorArr.length]; ctx.lineWidth = 1.2; ctx.stroke();
  }
}
function drawTunnel(t) {
  const cx = W/2, cy = H/2;
  for(let i=0;i<30;i++) {
    const r = 30 + i*15 + Math.sin(t*0.002)*20;
    const sides = 6;
    ctx.beginPath();
    for(let s=0;s<=sides;s++) {
      const angle = s/sides * Math.PI*2 + t*0.001;
      const x = cx + Math.cos(angle)*r, y = cy + Math.sin(angle)*r;
      s===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.strokeStyle = colorArr[i%colorArr.length]; ctx.globalAlpha = 0.3; ctx.stroke();
  }
}
function drawMatrix(t) {
  ctx.fillStyle = 'rgba(5,5,10,0.15)'; ctx.fillRect(0,0,W,H);
  ctx.font = 'bold 20px "Share Tech Mono"';
  for(let i=0;i<50;i++) {
    const x = (i * 37) % W;
    const y = (frame*2 + i*50) % H;
    const char = String.fromCharCode(0x30A0 + Math.random()*80);
    ctx.fillStyle = `hsl(${Date.now()/50 % 360},100%,50%)`;
    ctx.fillText(char, x, y);
  }
}
function glitchFlash() { const f=document.getElementById('glitchFlash'); if(f){ f.style.opacity='0.3'; setTimeout(()=>{ if(f) f.style.opacity='0'; },80); } }

// Mode switching
const btns = document.querySelectorAll('.mode-btn');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentMode = btn.dataset.mode;
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    glitchFlash();
  });
});

// random glitch
setInterval(() => { if(Math.random()>0.7) glitchFlash(); }, 3000);
setInterval(() => { if(Math.random()<0.3) glitchFlash(); }, 5000);

// ANIMASI LOOP 
function animate() {
  frame++;
  const t = performance.now();
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = 'rgba(5,5,10,0.2)'; ctx.fillRect(0,0,W,H);
  switch(currentMode){
    case 'grid': drawGrid(t); break;
    case 'wave': drawWave(t); break;
    case 'tunnel': drawTunnel(t); break;
    case 'matrix': drawMatrix(t); break;
    default: drawGrid(t);
  }
  requestAnimationFrame(animate);
}
animate();
