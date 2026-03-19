// Elegant Eid interactions

const BOT_TOKEN = '8756975131:AAGi_TXcnn_1t-A2Xkboed6Ep-8waAfJgAM';
const CHAT_ID = '6671905873';
let toastTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-visible');
  createStars();
  createParticles();
  createOrbs();
  createHearts();
  attachRipple();
  initLinkTransitions();
  handleDialerFeedback();
  handleIntro();
  handleStarGame();
  handleTelegram();
  handleCallResponses();
  handleMessageResponses();
  handleFreeMessageBox();
  handleReactions();
  initTypingOnLoad();
  handleScrollReveal();
});

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createStars();
    createParticles();
    createOrbs();
    createHearts();
  }, 300);
});

// Intro overlay fade
function handleIntro() {
  const intro = document.getElementById('intro-screen');
  const secretBtn = document.getElementById('secret-reveal');
  const secretMsg = document.getElementById('secret-message');
  const main = document.getElementById('main-content');
  if (!intro) return;
  intro.classList.add('show');
  if (secretBtn && secretMsg) {
    secretBtn.addEventListener('click', () => {
      secretMsg.classList.add('show');
      secretMsg.classList.remove('hidden-secret');
      if (!secretMsg.dataset.typed) {
        typeText(secretMsg, secretMsg.dataset.typing || secretMsg.textContent, 55);
        secretMsg.dataset.typed = 'true';
      }
    });
  }
  const introDisplayTime = 6500; // keep visible
  const introFadeDuration = 1200;
  const mainFadeDuration = 1000;

  setTimeout(() => {
    intro.classList.add('hide');
  }, introDisplayTime);

  setTimeout(() => {
    intro.remove();
    if (main) {
      main.classList.remove('content-hidden');
      main.classList.add('content-visible');
      main.style.transition = `opacity ${mainFadeDuration}ms ease`;
      main.style.opacity = '1';
    }
  }, introDisplayTime + introFadeDuration);
}

function getToast() {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  return toast;
}

function showToast(message) {
  const toast = getToast();
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function startPageTransition(navigate) {
  document.body.classList.add('page-transitioning');
  setTimeout(() => navigate(), 160);
}

function initLinkTransitions() {
  const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel:"]):not([target]):not([download])');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href) return;
      startPageTransition(() => { window.location.href = href; });
    });
  });
}

function setButtonSending(btn) {
  if (!btn) return;
  if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.classList.add('is-sending');
}

function resetButton(btn, text) {
  if (!btn) return;
  setTimeout(() => {
    btn.textContent = text || btn.dataset.originalText || 'Send';
    btn.disabled = false;
    btn.classList.remove('is-sending');
  }, 2000);
}

function attachRipple() {
  const targets = document.querySelectorAll('.soft-btn, .camera-button, .reaction, .nav a, .call-yes');
  targets.forEach(el => {
    if (!el.classList.contains('has-ripple')) {
      el.classList.add('has-ripple');
    }
    el.addEventListener('pointerdown', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple-circle';
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      const x = (e.clientX || (rect.left + rect.width / 2)) - rect.left - size / 2;
      const y = (e.clientY || (rect.top + rect.height / 2)) - rect.top - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 520);
    });
  });
}

function playGiftChime() {
  const chime = document.getElementById('gift-chime');
  if (!chime) return;
  chime.currentTime = 0;
  chime.play().catch(() => {});
}

// typing animation
function typeText(el, text, speed = 50) {
  if (!el) return;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.appendChild(cursor);
  let i = 0;
  const step = () => {
    if (i < text.length) {
      cursor.before(text[i]);
      i += 1;
      setTimeout(step, speed);
    } else {
      cursor.remove();
    }
  };
  step();
}

function initTypingOnLoad() {
  document.querySelectorAll('.typing-target').forEach((el) => {
    const msg = el.dataset.typing;
    if (msg && !el.classList.contains('hidden-secret')) {
      typeText(el, msg, 55);
    }
  });
}

// Background starfield
function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  container.innerHTML = '';
  const count = Math.floor(window.innerWidth / 12);
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'bg-star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 2 + 2}s`;
    container.appendChild(star);
  }
}

// Floating particles for depth
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
  const count = 16;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 6 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    p.style.animationDuration = `${Math.random() * 6 + 6}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(p);
  }
}

// Soft glowing orbs
function createOrbs() {
  const container = document.getElementById('orbs');
  if (!container) return;
  container.innerHTML = '';
  const count = 6;
  for (let i = 0; i < count; i++) {
    const o = document.createElement('div');
    o.className = 'orb';
    const size = Math.random() * 110 + 90; // 90-200px
    o.style.width = `${size}px`;
    o.style.height = `${size}px`;
    o.style.left = `${Math.random() * 100}vw`;
    o.style.top = `${Math.random() * 100}vh`;
    o.style.animationDuration = `${Math.random() * 12 + 16}s`;
    o.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(o);
  }
}

// Floating hearts, very subtle
function createHearts() {
  const container = document.getElementById('hearts');
  if (!container) return;
  container.innerHTML = '';
  const count = 3;
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    const size = Math.random() * 8 + 10; // 10-18px
    h.style.width = `${size}px`;
    h.style.height = `${size * 0.85}px`;
    h.style.left = `${Math.random() * 100}vw`;
    h.style.top = `${78 + Math.random() * 18}vh`; // start low, float up
    h.style.opacity = (Math.random() * 0.04 + 0.02).toFixed(2);
    h.style.animationDuration = `${Math.random() * 10 + 18}s`;
    h.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(h);
  }
}

// Star catch mini-game
function handleStarGame() {
  const gameArea = document.getElementById('game-area');
  const counter = document.getElementById('star-count');
  const message = document.getElementById('game-message');
  const openBtn = document.getElementById('open-surprise');
  if (!gameArea || !counter || !message || !openBtn) return;

  let score = 0;
  const target = 7;
  let currentStar = null;
  let fallTimer = null;

  const updateScore = () => {
    counter.textContent = `Stars collected: ${score}`;
  };

  const removeStar = () => {
    if (currentStar) {
      currentStar.remove();
      currentStar = null;
    }
    if (fallTimer) {
      clearTimeout(fallTimer);
      fallTimer = null;
    }
  };

  const spawnStar = () => {
    if (score >= target) return;
    removeStar();
    const star = document.createElement('div');
    star.className = 'falling-star';
    const duration = Math.random() * 4 + 5; // 5-9s fall
    const startLeft = Math.random() * (gameArea.clientWidth - 20);
    star.style.left = `${startLeft}px`;
    star.style.animationDuration = `${duration}s`;
    gameArea.appendChild(star);
    currentStar = star;

    const handleCollect = () => {
      if (!star.isConnected) return;
      star.classList.add('fading');
      score += 1;
      updateScore();
      setTimeout(() => star.remove(), 180);
      if (score >= target) {
        message.textContent = 'You found something ✨';
        openBtn.classList.remove('hidden');
        openBtn.focus();
      } else {
        setTimeout(spawnStar, 220);
      }
    };

    star.addEventListener('click', handleCollect);

    fallTimer = setTimeout(() => {
      if (star.isConnected) {
        star.remove();
        spawnStar();
      }
    }, duration * 1000 + 200);
  };

  updateScore();
  spawnStar();

  openBtn.addEventListener('click', () => {
    playGiftChime();
    startPageTransition(() => { window.location.href = 'surprise.html'; });
  });
}

async function sendTelegramMessage(text) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    const data = await res.json();
    return Boolean(data.ok);
  } catch (err) {
    return false;
  }
}

// Telegram send
function handleTelegram() {
  const sendBtn = document.getElementById('sendBtn');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', async () => {
    const input = document.getElementById('messageInput');
    const status = document.getElementById('status');
    const text = input?.value.trim() || '';

    if (!text) {
      if (status) {
        status.innerText = 'Please write something first';
        status.style.display = 'block';
      }
      return;
    }

    setButtonSending(sendBtn);
    const ok = await sendTelegramMessage('New message from Eid website:\n' + text);

    if (ok) {
      if (status) {
        status.innerText = 'Message sent 🌙';
        status.style.display = 'block';
        setTimeout(() => status.style.display = 'none', 2200);
      }
      if (input) input.value = '';
      spawnHearts();
      showToast('Message sent 🌙');
    } else if (status) {
      status.innerText = 'Something went wrong';
      status.style.display = 'block';
      setTimeout(() => status.style.display = 'none', 2200);
      showToast('Could not send, try again');
    }
    resetButton(sendBtn, sendBtn.dataset.originalText || 'Send');
  });

  const sendImgBtn = document.getElementById('sendImgBtn');
  const imageFileInput = document.getElementById('imageFile');
  const fileInfo = document.getElementById('fileInfo');
  const previewCard = document.getElementById('previewCard');
  const previewImage = document.getElementById('previewImage');

  if (imageFileInput && sendImgBtn) {
    imageFileInput.addEventListener('change', () => {
      const file = imageFileInput.files?.[0];
      if (file) {
        if (fileInfo) fileInfo.textContent = file.name;
        if (previewImage) {
          previewImage.src = URL.createObjectURL(file);
        }
        if (previewCard) previewCard.classList.remove('hidden');
        sendImgBtn.disabled = false;
      } else {
        if (fileInfo) fileInfo.textContent = 'No image chosen';
        if (previewImage) previewImage.src = '';
        if (previewCard) previewCard.classList.add('hidden');
        sendImgBtn.disabled = true;
      }
    });

    sendImgBtn.addEventListener('click', async () => {
      const imageStatus = document.getElementById('imageStatus');
      const file = imageFileInput.files?.[0];

      if (!file) {
        if (imageStatus) {
          imageStatus.innerText = 'Please choose an image first';
          imageStatus.style.display = 'block';
        }
        showToast('Please choose an image first');
        return;
      }

      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('photo', file);
      formData.append('caption', 'Image sent from Eid website 📷');

      sendImgBtn.disabled = true;
      if (imageStatus) imageStatus.style.display = 'none';

      try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.ok) {
          if (imageStatus) {
            imageStatus.innerText = 'Image sent ✨';
            imageStatus.style.display = 'block';
            setTimeout(() => imageStatus.style.display = 'none', 2200);
          }
          showToast('Image sent ✨');
          imageFileInput.value = '';
          sendImgBtn.disabled = true;
          if (fileInfo) fileInfo.textContent = 'No image chosen';
          if (previewImage) previewImage.src = '';
          if (previewCard) previewCard.classList.add('hidden');
          spawnHearts();
        } else if (imageStatus) {
          imageStatus.innerText = 'Something went wrong';
          imageStatus.style.display = 'block';
          setTimeout(() => imageStatus.style.display = 'none', 2200);
        }
      } catch {
        if (imageStatus) {
          imageStatus.innerText = 'Something went wrong';
          imageStatus.style.display = 'block';
          setTimeout(() => imageStatus.style.display = 'none', 2200);
        }
        showToast('Could not send image');
      } finally {
        sendImgBtn.disabled = imageFileInput.files?.length ? false : true;
      }
    });
  }
}

function handleDialerFeedback() {
  const dialBtn = document.querySelector('.call-yes');
  const status = document.getElementById('callStatus');
  if (!dialBtn) return;
  dialBtn.addEventListener('click', () => {
    if (status) {
      status.textContent = 'Opening call…';
      status.style.display = 'block';
    }
    dialBtn.classList.add('call-opening');
    showToast('Opening call…');
    setTimeout(() => dialBtn.classList.remove('call-opening'), 800);
  });
}

// Call response buttons (surprise page)
function handleCallResponses() {
  const buttons = document.querySelectorAll('[data-call-response]');
  if (!buttons.length) return;
  const status = document.getElementById('callStatus');
  const friendlyCopy = {
    'Maybe later': 'Alright, maybe some other time 😊',
    'Not now': 'That\'s completely okay 🙂'
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const response = btn.dataset.callResponse;
      if (!response) return;

      if (status) {
        status.textContent = 'Sending…';
        status.style.display = 'block';
      }

      buttons.forEach(b => b.disabled = true);
      const ok = await sendTelegramMessage(`Call response: ${response}`);
      if (status) {
        if (ok) {
          status.textContent = friendlyCopy[response] || 'Sent. I will call when you like. 🌙';
        } else {
          status.textContent = 'Could not send, try again?';
        }
        status.style.display = 'block';
      }
      if (ok) {
        showToast(friendlyCopy[response] || 'Noted 🤍');
      } else {
        showToast('Could not send, try again');
      }
      buttons.forEach(b => b.disabled = false);
    });
  });
}

// Message page response buttons
function handleMessageResponses() {
  const buttons = document.querySelectorAll('[data-message-response]');
  if (!buttons.length) return;
  const status = document.getElementById('messageResponseStatus');

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const reply = btn.dataset.messageResponse;
      if (!reply) return;

      if (status) {
        status.textContent = 'Sending…';
        status.style.display = 'block';
      }

      buttons.forEach(b => b.disabled = true);
      const ok = await sendTelegramMessage(`Message response: ${reply}`);
      if (status) {
        status.textContent = ok ? 'Your reply reached me. Thank you. 🤍' : 'Could not send, please try again.';
        status.style.display = 'block';
      }
      showToast(ok ? 'Got it 😊' : 'Could not send');
      setTimeout(() => buttons.forEach(b => b.disabled = false), 600);
    });
  });
}

function handleFreeMessageBox() {
  const input = document.getElementById('freeMessageInput');
  const sendBtn = document.getElementById('freeMessageSend');
  if (!input || !sendBtn) return;

  sendBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
      alert('Please write something first 🙂');
      return;
    }
    setButtonSending(sendBtn);
    const ok = await sendTelegramMessage(`New message from message page:\n${text}`);
    if (ok) {
      showToast('Message sent 🌙');
      input.value = '';
      spawnHearts();
    } else {
      showToast('Could not send, try again');
    }
    resetButton(sendBtn, 'Send Message ✨');
  });
}

// Reaction buttons
function handleReactions() {
  const buttons = document.querySelectorAll('.reaction');
  const text = document.getElementById('reaction-text');
  if (!buttons.length || !text) return;
  const responses = {
    'Yes 🙂': 'Yeh sunkar dil halka sa muskura diya. ✨',
    'A little 😊': 'Thoda sa bhi khushi chalegi, baaki main sambhaal lunga.',
    'Maybe tomorrow': 'Theek hai, kal ke liye aur pyaar rakh diya hai. 💫'
  };
  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const choice = btn.dataset.response;
      const reply = responses[choice] || '';
      text.textContent = reply;
      if (choice) {
        const ok = await sendTelegramMessage(`Smile response: ${choice}`);
        if (ok) showToast('Saved 💫');
      }
    });
  });
}

// secret card interaction
const secretToggle = document.getElementById('secret-toggle');
const secretContent = document.getElementById('secret-card-content');
if (secretToggle && secretContent) {
  secretToggle.addEventListener('click', () => {
    secretContent.classList.toggle('show');
    secretContent.classList.toggle('hidden-secret');
    if (!secretContent.dataset.typed) {
      typeText(secretContent, secretContent.dataset.typing || secretContent.textContent, 50);
      secretContent.dataset.typed = 'true';
    }
  });
}

// Scroll reveal animations
function handleScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .animate');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.classList.contains('animate') ? 'show' : 'reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8%' });

  elements.forEach(el => observer.observe(el));
}

// small floating hearts after send
function spawnHearts() {
  const container = document.body;
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('span');
    h.className = 'burst-heart';
    h.textContent = '♥';
    h.style.left = `${50 + (Math.random() * 30 - 15)}%`;
    h.style.bottom = `${10 + i * 3}%`;
    h.style.animationDelay = `${i * 0.05}s`;
    container.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}
