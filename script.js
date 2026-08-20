/* ============================================================
   KISHORE K – PORTFOLIO SCRIPT
   Features: Loader, Particles, Cursor, Typed, Scroll Reveal,
             Skill Bars, Counters, Navbar, Form, Back-to-Top
   ============================================================ */

/* ── 1. LOADING SCREEN ──────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const accessBox = document.getElementById('accessBox');
  const accessText = document.getElementById('accessText');

  const playChimes = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.6);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.1); // A5
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.setValueAtTime(0.15, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.8);
    } catch (e) {}
  };

  const speakGranted = () => {
    try {
      const utterance = new SpeechSynthesisUtterance("Access Granted");
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  };

  // Phase 1: Shift to Access Granted display
  setTimeout(() => {
    if (accessBox && accessText) {
      accessBox.classList.add('granted');
      accessText.textContent = 'ACCESS GRANTED';
      playChimes();
      speakGranted();
    }
  }, 1000);

  // Phase 2: Fade out loader
  setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
    }
    // Kick off hero reveals
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 120);
    });
  }, 2200);
});

/* ── 2. PARTICLE CANVAS ─────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const PARTICLE_COUNT = 80;
  const COLORS = ['rgba(0,212,255,', 'rgba(37,99,235,', 'rgba(124,58,237,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - dist / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  animate();
})();

/* ── 3. CUSTOM CURSOR ───────────────────────────────────────── */
(function initCursor() {
  const dot     = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let ox = 0, oy = 0;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
  });

  function animateOutline() {
    ox += (tx - ox) * 0.12;
    oy += (ty - oy) * 0.12;
    outline.style.left = ox + 'px';
    outline.style.top  = oy + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effect on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-item, .cert-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
})();

/* ── 4. TYPED TEXT EFFECT ───────────────────────────────────── */
(function initTyped() {
  const el     = document.getElementById('typedText');
  const words  = ['Web Designer', 'Cybersecurity', 'IT Student', 'Problem Solver'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const word = words[wIdx];

    if (deleting) {
      el.textContent = word.substring(0, cIdx--);
      if (cIdx < 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 60);
    } else {
      el.textContent = word.substring(0, cIdx++);
      if (cIdx > word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 1200);
})();

/* ── 5. STICKY NAVBAR + ACTIVE LINKS ───────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Sticky glass effect
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Active link highlighting
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });


    // Back-to-top
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ── 6. BACK TO TOP ─────────────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── 7. SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keeps state clean for re-scrolling
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
})();

/* ── 8. SKILL BAR ANIMATION ─────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        // Small delay so the card reveal finishes first
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(f => io.observe(f));
})();

/* ── 9. COUNTER ANIMATION ───────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.getAttribute('data-target');
      const start  = performance.now();
      const dur    = 1600;

      function tick(now) {
        const progress = Math.min((now - start) / dur, 1);
        // Ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => io.observe(c));
})();

/* ── 10. PARALLAX ───────────────────────────────────────────── */
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.backgroundPositionY = y * 0.3 + 'px';
    const frame = hero.querySelector('.image-frame');
    if (frame) frame.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
})();

/* ── 11. TOAST NOTIFICATION ──────────────────────────────────── */
function showToast(title, message, type = 'success') {
  const toast = document.getElementById('toastNotification');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  
  if (!toast || !toastIcon || !toastTitle || !toastMessage) return;

  // Set content
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Set icon based on type
  if (type === 'success') {
    toastIcon.innerHTML = "<i class='bx bx-check-circle'></i>";
  } else {
    toastIcon.innerHTML = "<i class='bx bx-error-circle'></i>";
  }

  // Set status classes
  toast.className = `toast-notification glass show ${type}`;

  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ── 12. CONTACT FORM ───────────────────────────────────────── */
(function initForm() {
  const form   = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showToast('Validation Error', 'Please fill in all fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }

    // Send to Web3Forms
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'e4a85767-2ae7-4851-9567-f6474f6172c0',
        name: name,
        email: email,
        message: message
      })
    })
    .then(async (response) => {
      if (response.status == 200) {
        showToast('Message Sent', 'Thank you! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        showToast('Send Failed', 'Failed to send message. Please try again.', 'error');
      }
    })
    .catch(error => {
      console.log(error);
      showToast('Error', 'Something went wrong! Please try again.', 'error');
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
    });
  });
})();

/* ── 12. SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 13. CURSOR HOVER TRACKING (dynamic re-query for cards) ─── */
// Re-attach cursor hover to dynamically relevant elements
document.addEventListener('DOMContentLoaded', () => {
  const outline  = document.getElementById('cursorOutline');
  if (!outline) return;

  document.querySelectorAll('.achievement-card, .about-card, .timeline-content, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
});


/* ── 14. KK ASSISTANT FLOATING WIDGET ── */
(function initKKAssistant() {
  const assistantTrigger = document.getElementById('assistantTrigger');
  const assistantChat = document.getElementById('assistantChat');
  const chatClose = document.getElementById('chatClose');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  const notificationDot = document.querySelector('.notification-dot');

  if (!assistantTrigger || !assistantChat) return;

  // Toggle Chat window
  assistantTrigger.addEventListener('click', () => {
    assistantChat.classList.add('open');
    if (notificationDot) notificationDot.style.display = 'none';
  });

  if (chatClose) {
    chatClose.addEventListener('click', (e) => {
      e.stopPropagation();
      assistantChat.classList.remove('open');
    });
  }

  // Answer matching logic
  const responseCategories = [
    {
      id: 'greetings',
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'yo', 'sup'],
      response: "Hello! I'm the KK Assistant. How can I help you today? You can ask about Krishna Kumar's skills, projects, internships, education, achievements, certifications, or contact details!"
    },
    {
      id: 'about',
      keywords: ['about', 'who are you', 'your name', 'krishna', 'krishnakumar', 'profile', 'bio', 'yourself', 'who is', 'who\'s'],
      response: "Krishna Kumar is a Web Designer, Cybersecurity enthusiast, and an Information Technology student (B.Tech, 3rd year) at M. Kumarasamy College of Engineering. He is passionate about building technology that solves problems, open-source UNIX/Linux systems, and secure application development."
    },
    {
      id: 'skills',
      keywords: ['skill', 'tool', 'tech', 'stack', 'languages', 'program', 'java', 'c', 'javascript', 'css', 'html', 'python', 'flask', 'mysql', 'mongodb', 'mariadb', 'git', 'github', 'what can you do', 'develop'],
      response: "Krishna Kumar has strong technical skills in:\n- **Programming**: Java, C\n- **Web Technologies**: HTML, CSS, JavaScript, Flask\n- **Databases**: MySQL, MariaDB, MongoDB\n- **Operating Systems**: Linux (Ubuntu, Parrot OS, Kali Linux)\n- **Version Control**: Git, GitHub"
    },
    {
      id: 'projects',
      keywords: ['project', 'build', 'work', 'make', 'website', 'app', 'account monitor', 'hotel booking', 'smart cab', 'taxi', 'hotel', 'compromise', 'developments'],
      response: "Krishna has built several notable projects:\n1. **Account Monitor**: A React-based web app designed to check if social media accounts have been compromised or leaked online. [Visit site](https://accmonitor.vercel.app)\n2. **KK Hotel Booking**: A full-featured booking client covering hotels across India with search, filter, and reservation flows. [Visit site](https://kk-hotel.vercel.app)\n3. **KK Smart Cab**: An interactive cab booking client supporting quick routing calculations and maps. [Visit site](https://kk-smart-cab.vercel.app)"
    },
    {
      id: 'experience',
      keywords: ['experience', 'intern', 'work', 'job', 'training', 'kaashiv', 'istudio', 'career', 'corporate'],
      response: "Krishna has gained industry experience through internships:\n1. **Cyber Security Intern** at kaashiv InfoTech (June – July 2026): Worked on security analysis, network monitoring, Linux shell administration, and system vulnerability mitigation.\n2. **Web Development Intern** at iStudio Technologies (Dec 2025 – Jan 2026): Collaborated on UI/UX optimization and built clean, responsive user interfaces."
    },
    {
      id: 'education',
      keywords: ['education', 'study', 'college', 'degree', 'university', 'btech', 'it', 'school', 'hsc', 'sslc', 'gpa', 'marks', 'kumarasamy', 'mkce', 'learning'],
      response: "Krishna's academic background:\n- **B.Tech in Information Technology** (2024 - 2028) at M. Kumarasamy College of Engineering (Current CGPA: 7.5/10.0)\n- **Higher Secondary Education (HSC)** in Bio-Maths (2022 - 2024) – 72.33%\n- **Secondary School Education (SSLC)** (2021 - 2022) – 83.4%"
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'reach', 'phone', 'mail', 'linkedin', 'github', 'instagram', 'insta', 'social', 'address', 'message', 'send', 'connect'],
      response: "You can connect with Krishna Kumar via:\n- **Email**: [kk6308608@gmail.com](mailto:kk6308608@gmail.com)\n- **LinkedIn**: [pkrishnakumar-kk](https://www.linkedin.com/in/pkrishnakumar-kk)\n- **GitHub**: [KRISHNAKUMARP20](https://github.com/KRISHNAKUMARP20)\n- **Instagram**: [Instagram Profile](https://instagram.com/)"
    },
    {
      id: 'achievements',
      keywords: ['achievement', 'award', 'prize', 'win', 'mr coder', 'ekna', 'fest', 'competition', 'hackathon'],
      response: "Krishna won the **Mr. Coder** award at the EKNA '25 National Level Techno Cultural Fest coding event."
    },
    {
      id: 'certifications',
      keywords: ['certification', 'cert', 'course', 'cisco', 'ibm', 'iot', 'nptel', 'bano', 'be10x', 'credential'],
      response: "Krishna has earned several certifications including:\n- **CISCO** Network Defense & Cyber Threat Management\n- **IBM** Data Science Foundation & Python Basics\n- **NPTEL** Internet of Things (IoT) & IoT 4.0\n- **SkillUp** Cyber Security\n- **Bano** Job Ready & Workspace Communication\n- **BE10X** AI Productivity Workshop"
    },
    {
      id: 'resume',
      keywords: ['resume', 'cv', 'biodata', 'profile document'],
      response: "You can view Krishna's resume by clicking the 'View Resume' button in the Hero section, or download it here: [KK_Resume.pdf](assets/KK_Resume.pdf)."
    }
  ];

  const getResponse = (query) => {
    const q = query.toLowerCase().trim();
    let bestMatch = null;
    let maxScore = 0;

    responseCategories.forEach(category => {
      let score = 0;
      category.keywords.forEach(keyword => {
        if (q.includes(keyword)) {
          // Add extra weight for exact match word or if keyword starts/ends nicely
          score += 1;
          // Exact match bonus
          if (q === keyword) score += 2;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = category;
      }
    });

    if (maxScore > 0 && bestMatch) {
      return bestMatch.response;
    }

    return "I'm not sure I understand that question completely. Try asking about 'skills', 'projects', 'internships', 'education', 'achievements', 'certifications', 'resume', or 'contact'!";
  };


  const addMessage = (text, sender) => {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = `<div class="message-content">` + text.replace(/\n/g, '<br>') + `</div>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Gemini API key settings
  const apiKey = 'AQ.Ab8RN6JlrBuRoDVkGSazHh72uR7NLtLIoCgYVD4CltUjNTivkA';
  const aiBadge = document.getElementById('aiBadge');

  if (aiBadge) {
    aiBadge.textContent = 'AI';
    aiBadge.className = 'ai-badge';
  }

  const callGeminiAPI = async (userText) => {
    const systemPrompt = `You are KK Assistant, a professional and smart AI chatbot for Krishna Kumar's portfolio website. 
Answer questions about Krishna Kumar accurately and concisely based on the following portfolio context. Keep your response short, engaging, and under 3-4 sentences if possible. Use markdown where appropriate. If the question is not about Krishna Kumar's portfolio or background, politely pivot back to his profile.

Context of Krishna Kumar:
- Name: Krishna Kumar (often referred to as KK)
- Role: IT Student (3rd year B.Tech), Web Designer, Cybersecurity enthusiast, Linux lover.
- College: M. Kumarasamy College of Engineering (MKCE), Karur. Current CGPA is 7.5.
- Technical Skills: Programming in Java & C, Frontend web dev (HTML, CSS, JavaScript), backend/routing with Flask, databases (MySQL, MariaDB, MongoDB), Unix/Linux (Ubuntu, Parrot, Kali), Git & GitHub.
- Projects: 
  1. Account Monitor (React app checking compromised social accounts, site: https://accmonitor.vercel.app)
  2. KK Hotel Booking (Hotel booking engine across India, site: https://kk-hotel.vercel.app)
  3. KK Smart Cab (Taxi booking client with route calculations and maps, site: https://kk-smart-cab.vercel.app)
- Work Experience:
  1. Cyber Security Intern at Kaashiv InfoTech (June-July 2026): Unix administration, vulnerability checking, log auditing, networking defense.
  2. Web Development Intern at iStudio Technologies (Dec 2025-Jan 2026): Frontend web dev, UI/UX optimization.
- Achievements: Winner of "Mr. Coder" coding event at EKNA '25 National Level Techno Cultural Fest.
- Certifications: CISCO Network Defense & Cyber Threat Management, IBM Data Science & Python (PY0101EN), NPTEL IoT & IoT 4.0, SkillUp Cyber Security, Bano Job Ready & Communication.
- Contacts: Email: kk6308608@gmail.com, GitHub: KRISHNAKUMARP20, LinkedIn: pkrishnakumar-kk, Instagram: https://instagram.com/
- Resume link: assets/KK_Resume.pdf`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        })
      });
      const data = await response.json();
      if (data && data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text.trim();
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.error(err);
      return "Sorry, I had trouble reaching my AI brain. Let me answer using offline rules instead:\n\n" + getResponse(userText);
    }
  };

  const simulateBotResponse = async (userText) => {
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chat-message bot typing-msg';
    typing.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;

    let reply = "";
    if (apiKey) {
      reply = await callGeminiAPI(userText);
    } else {
      // Simulate typing delay for offline
      await new Promise(resolve => setTimeout(resolve, 800));
      reply = getResponse(userText);
    }

    typing.remove();
    addMessage(reply, 'bot');
  };

  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage(text, 'user');
      chatInput.value = '';
      simulateBotResponse(text);
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      addMessage(chip.textContent, 'user');
      simulateBotResponse(query);
    });
  });
})();

/* ── 15. CERTIFICATIONS SLIDER CONTROL ── */
(function initCertsSlider() {
  const grid = document.getElementById('certsGrid');
  const btnLeft = document.getElementById('slideLeft');
  const btnRight = document.getElementById('slideRight');
  
  if (!grid || !btnLeft || !btnRight) return;

  const scrollAmount = 374; // card width (350px) + gap (24px)

  btnLeft.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
})();
