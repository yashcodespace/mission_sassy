// ========== PAGE NAVIGATION ==========
function goTo(page) {
  window.location.href = page;
}

// ========== RESPONSIVE LAYOUT ADJUSTMENTS ==========
function adjustLayoutAll() {
  const width = window.innerWidth;
  const surprise2 = document.getElementById('surprise2');

  if (surprise2) {
    // Reset styles
    surprise2.style.cssText = '';

    // Base styles
    surprise2.style.position = 'relative';
    surprise2.style.width = '100%';
    surprise2.style.height = '100vh';
    surprise2.style.boxSizing = 'border-box';
    surprise2.style.display = 'flex';
    surprise2.style.flexDirection = 'column';
    surprise2.style.justifyContent = 'flex-start';
    surprise2.style.alignItems = 'center';
    surprise2.style.overflowY = 'auto';
    surprise2.style.scrollBehavior = 'smooth';
    surprise2.style.backgroundColor = '#fff'; // Optional: set background

    // Responsive font and padding
    if (width < 400) {
      surprise2.style.padding = '10px';
      surprise2.style.fontSize = '14px';
    } else if (width < 600) {
      surprise2.style.padding = '12px';
      surprise2.style.fontSize = '16px';
    } else if (width < 768) {
      surprise2.style.padding = '16px';
      surprise2.style.fontSize = '18px';
    } else {
      surprise2.style.padding = '20px';
      surprise2.style.fontSize = '20px';
    }

    // Content container
    const content = surprise2.querySelector('.surprise2-content');
    if (content) {
      content.style.padding = '16px';
      content.style.maxWidth = '960px';
      content.style.width = '100%';
      content.style.boxSizing = 'border-box';
    }

    // Images
    const images = surprise2.querySelectorAll('.surprise2-image');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.margin = '10px 0';
      img.style.borderWidth = '2px';
    });

    // Buttons
    const buttons = surprise2.querySelectorAll('.surprise2-btn');
    buttons.forEach(btn => {
      btn.style.padding = '10px 16px';
      btn.style.fontSize = '1rem';
      btn.style.margin = '6px';
    });

    // Headings
    const headings = surprise2.querySelectorAll('h2');
    headings.forEach(h2 => {
      h2.style.fontSize = width < 400 ? '1.5rem' : '1.8rem';
      h2.style.marginBottom = '12px';
    });

    // Paragraphs
    const paragraphs = surprise2.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.style.fontSize = width < 400 ? '0.9rem' : '1rem';
      p.style.lineHeight = width < 400 ? '1.4' : '1.6';
      p.style.marginBottom = '10px';
    });
  }

  // Resize fireworks canvas
  resizeCanvas();
}

// ========== AUTO-LAYOUT ON LOAD/RESIZE ==========
window.addEventListener('load', adjustLayoutAll);
window.addEventListener('resize', adjustLayoutAll);

// ========== BACKGROUND AUDIO UNMUTE ON CLICK ==========
document.addEventListener('click', () => {
  const audio = document.getElementById('background-audio');
  if (audio) {
    audio.muted = false;
    audio.play().catch(err => console.warn("Audio autoplay blocked:", err));
  }
}, { once: true });

// ========== FIREWORKS ANIMATION ==========
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas?.getContext('2d');
let fireworks = [];

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function createFirework() {
  if (!canvas) return;

  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

  for (let i = 0; i < 40; i++) {
    fireworks.push({
      x,
      y,
      radius: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
      alpha: 1,
      color
    });
  }
}

function updateFireworks() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks = fireworks.filter(p => p.alpha > 0);

  fireworks.forEach(p => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.015;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
}

function animateFireworks() {
  updateFireworks();
  requestAnimationFrame(animateFireworks);
}

if (canvas && ctx) {
  resizeCanvas();
  setInterval(createFirework, 800);
  animateFireworks();

  window.addEventListener('resize', resizeCanvas);
}

// ========== CONFETTI BUTTON SETUP ==========
document.addEventListener('DOMContentLoaded', () => {
  const confettiBtn = document.getElementById('confetti-btn');
  const birthdaySong = document.getElementById('birthday-song');

  if (!confettiBtn || !birthdaySong) {
    console.warn("Confetti button or birthday song element not found.");
    return;
  }

  confettiBtn.addEventListener('click', () => {
    try {
      // Play birthday music
      birthdaySong.currentTime = 0;
      birthdaySong.play().catch(e => console.log("Audio play failed:", e));

      // Button feedback
      confettiBtn.textContent = "🎊 Party Time!";
      confettiBtn.style.backgroundColor = "#ff00cc";

      // Center confetti burst
      if (typeof confetti === "function") {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });

        // Side bursts
        setTimeout(() => {
          confetti({ particleCount: 100, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 100, angle: 120, spread: 55, origin: { x: 1 } });
        }, 300);
      }

    } catch (error) {
      console.error("Confetti trigger error:", error);
    }
  });
});

// Show/hide Scroll To Top button
document.addEventListener('scroll', () => {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const surprise2 = document.getElementById('surprise2');
  if (scrollBtn && surprise2) {
    const scrollTop = surprise2.scrollTop || document.documentElement.scrollTop;
    scrollBtn.style.display = scrollTop > 100 ? 'block' : 'none';
  }
});

// Scroll to top on click
document.getElementById('scrollTopBtn').addEventListener('click', () => {
  const surprise2 = document.getElementById('surprise2');
  if (surprise2) {
    surprise2.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
