const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 0.8 + 0.4;  // smaller stars
    this.alpha = Math.random() * 0.5 + 0.2;
    this.alphaChange = 0.002 + Math.random() * 0.003;
  }

  update() {
    this.alpha += this.alphaChange;
    if (this.alpha <= 0.2 || this.alpha >= 0.6) {
      this.alphaChange = -this.alphaChange;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ffffff";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.4;
    this.len = Math.random() * 80 + 50;
    this.speed = Math.random() * 6 + 4;
    this.angle = Math.PI / 4;
    this.alpha = 1;
    this.fade = 0.007;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.alpha -= this.fade;
    if (this.alpha <= 0) this.reset();
  }

  draw() {
    const x2 = this.x - this.len * Math.cos(this.angle);
    const y2 = this.y - this.len * Math.sin(this.angle);
    const grad = ctx.createLinearGradient(this.x, this.y, x2, y2);
    grad.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    grad.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

// Fewer stars
for (let i = 0; i < 300; i++) {
  stars.push(new Star());
}

// One shooting star occasionally
setInterval(() => {
  if (shootingStars.length < 1 && Math.random() > 0.7) {
    shootingStars.push(new ShootingStar());
  }
}, 4000);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Softer background
  let gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height, 0,
    canvas.width / 2, canvas.height, canvas.height
  );
  gradient.addColorStop(0, "#0d0d1a");
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  shootingStars.forEach((shooting, i) => {
    shooting.update();
    shooting.draw();
    if (shooting.alpha <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
