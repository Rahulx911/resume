/* Rahul Jain Portfolio - Digital Constellation */

/* Constellation Canvas */
(function initConstellation() {
  var canvas = document.getElementById('constellation');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -1000, y: -1000 };
  var w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
  var CONNECT = 150;
  var MOUSE_R = 200;

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 212, 255, ' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT) {
          var a = (1 - dist / CONNECT) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + a + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      var mdx = particles[i].x - mouse.x;
      var mdy = particles[i].y - mouse.y;
      var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < MOUSE_R) {
        var ma = (1 - mDist / MOUSE_R) * 0.25;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(0, 212, 255, ' + ma + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
})();

/* Cursor Glow */
(function() {
  var glow = document.getElementById('cursor-glow');
  if (window.innerWidth < 769) return;
  document.addEventListener('mousemove', function(e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* Nav Scroll */
(function() {
  var header = document.getElementById('nav-header');
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* Mobile Menu */
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

function closeMobile() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

/* Typing Animation */
(function() {
  var el = document.getElementById('typedText');
  var strings = [
    'AI & ML Systems Engineer',
    'Building Production AI Pipelines',
    'Full-Stack Developer',
    'Published Researcher'
  ];
  var strIdx = 0, charIdx = 0, deleting = false;

  function type() {
    var current = strings[strIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        strIdx = (strIdx + 1) % strings.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 30);
    } else {
      el.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 60);
    }
  }
  setTimeout(type, 800);
})();

/* Scroll Reveal */
(function() {
  var reveals = document.querySelectorAll('.reveal');

  function revealCheck() {
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.classList.contains('visible')) continue;
      var rect = el.getBoundingClientRect();
      var windowH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowH - 40) {
        el.classList.add('visible');
      }
    }
  }

  window.addEventListener('scroll', revealCheck);
  window.addEventListener('resize', revealCheck);

  // Run on load
  if (document.readyState === 'complete') {
    revealCheck();
  } else {
    window.addEventListener('load', revealCheck);
  }
  // Also run after a short delay as safety net
  setTimeout(revealCheck, 300);
  setTimeout(revealCheck, 1000);
})();

/* Counter Animation */
(function() {
  var counters = document.querySelectorAll('.stat-number');
  var started = [];
  for (var i = 0; i < counters.length; i++) started.push(false);

  function checkCounters() {
    for (var i = 0; i < counters.length; i++) {
      if (started[i]) continue;
      var rect = counters[i].getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        started[i] = true;
        animateCounter(counters[i]);
      }
    }
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var current = 0;
    var step = Math.max(1, Math.floor(target / 30));
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 40);
  }

  window.addEventListener('scroll', checkCounters);
  window.addEventListener('load', checkCounters);
  setTimeout(checkCounters, 500);
})();

/* Smooth Scroll */
var anchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* Year */
document.getElementById('year').textContent = new Date().getFullYear();
