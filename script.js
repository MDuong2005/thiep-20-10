// Confetti animation
(function(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  addEventListener('resize', ()=>{ W = canvas.width = innerWidth; H = canvas.height = innerHeight; });
  const TAU = Math.PI*2;
  function rand(min, max){ return Math.random()*(max-min)+min; }
  function burst(duration = 1500){
    const pieces = [];
    const start = performance.now();
    const colors = ['#E91E63','#7C4DFF','#FF9800','#4CAF50','#03A9F4','#FFC107'];
    for(let i=0;i<180;i++){
      pieces.push({
        x: W/2, y: H/2,
        r: rand(3,6),
        a: rand(0,TAU),
        v: rand(2.8,6.0),
        g: rand(0.04,0.12),
        rot: rand(0,TAU),
        vr: rand(-0.2,0.2),
        col: colors[i%colors.length]
      });
    }
    function frame(t){
      const elapsed = t - start;
      ctx.clearRect(0,0,W,H);
      pieces.forEach(p=>{
        p.v *= 0.992;
        p.x += Math.cos(p.a)*p.v;
        p.y += Math.sin(p.a)*p.v + p.g*elapsed/60;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.col;
        ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);
        ctx.restore();
      });
      if(elapsed < duration){ requestAnimationFrame(frame); }
      else { ctx.clearRect(0,0,W,H); }
    }
    requestAnimationFrame(frame);
  }
  window.confettiBurst = burst;
})();

// Floating hearts
function heartsBurst(count=24){
  const wrap = document.getElementById('hearts');
  for(let i=0;i<count;i++){
    const el = document.createElement('span');
    el.className = 'heart';
    el.textContent = ['❤','💖','💗','💞','💝'][Math.floor(Math.random()*5)];
    const left = Math.random()*100;
    const dur = 3 + Math.random()*3;
    const dx = (Math.random()*60 - 30) + 'px';
    el.style.left = left+'vw';
    el.style.setProperty('--dx', dx);
    el.style.animationDuration = dur+'s';
    wrap.appendChild(el);
    setTimeout(()=> wrap.removeChild(el), dur*1000);
  }
}

// Reveal logic
const intro = document.getElementById('card-intro');
const reveal = document.getElementById('card-reveal');
const openBtn = document.getElementById('open');
const replayBtn = document.getElementById('replay');

function revealNow(){
 intro.classList.add('hidden');
  reveal.classList.remove('hidden');

  // Thêm hiệu ứng mượt khi hiện card
  setTimeout(() => reveal.classList.add('show'), 100);

  confettiBurst(1800);
  heartsBurst(30);
}
document.addEventListener('click', (e)=>{
  const introVisible = !intro.classList.contains('hidden');
  if(introVisible){ revealNow(); }
});
openBtn.addEventListener('click', (e)=>{ e.stopPropagation(); revealNow(); });
replayBtn.addEventListener('click', (e)=>{ e.stopPropagation(); confettiBurst(1600); heartsBurst(24); });
