/* =========================================================
   Birthday Surprise — Interaction Logic
   Vanilla JS, no dependencies, fully offline capable.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     State
     --------------------------------------------------------- */
  var state = {
    name: "Friend",
    noAttempts: 0,
    musicMuted: false,
  };
var SCREEN_ORDER = [
  "screen-welcome",
  "screen-something",
  "screen-funny",
  "screen-cake",
  "screen-wishes",
  "screen-final",
  "screen-friend",
];
  ];

  var currentScreenId = "screen-welcome";

  /* ---------------------------------------------------------
     Screen navigation
     --------------------------------------------------------- */
  function goToScreen(targetId) {
    var current = document.getElementById(currentScreenId);
    var target = document.getElementById(targetId);
    if (!target || target.id === current.id) return;

    current.classList.add("leaving");
    current.classList.remove("active");

    // small timeout lets the leaving animation start before hiding
    window.setTimeout(function () {
      current.classList.remove("leaving");
    }, 620);

    target.classList.add("active");
    currentScreenId = targetId;
    updateProgressDots(targetId);
    onScreenEnter(targetId);
  }

  function updateProgressDots(screenId) {
    var index = SCREEN_ORDER.indexOf(screenId);
    var dots = document.querySelectorAll(".dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }

  function onScreenEnter(screenId) {
    if (screenId === "screen-wishes") {
      startTypingAnimation();
    }
    if (screenId === "screen-cake") {
      document.getElementById("nameSlotCake").textContent = state.name;
      document.getElementById("nameSlotBig").textContent = state.name;
    }
  }

  // wire up every simple "Next" button via data-next
  document.querySelectorAll("[data-next]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goToScreen(btn.getAttribute("data-next"));
    });
  });

  /* ---------------------------------------------------------
     PAGE 1 — Welcome / name capture
     --------------------------------------------------------- */
  var nameForm = document.getElementById("nameForm");
  var nameInput = document.getElementById("nameInput");

  nameForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = nameInput.value.trim();
    state.name = value.length ? value : "Friend";
    goToScreen("screen-something");
  });

  /* ---------------------------------------------------------
     PAGE 4 — Cake: blow candles + cut cake
     --------------------------------------------------------- */
  var blowBtn = document.getElementById("blowBtn");
  var cutBtn = document.getElementById("cutBtn");
  var cakeGlow = document.getElementById("cakeGlow");
  var cakeEl = document.getElementById("cake");
  var bigBirthdayText = document.getElementById("bigBirthdayText");
  var continueFromCake = document.getElementById("continueFromCake");

  blowBtn.addEventListener("click", function () {
    document.querySelectorAll(".candle").forEach(function (candle, i) {
      window.setTimeout(function () {
        candle.classList.add("blown");
      }, i * 220);
    });
    cakeGlow.classList.add("on");
    blowBtn.classList.add("btn--hidden");
    window.setTimeout(function () {
      cutBtn.classList.remove("btn--hidden");
    }, 900);
  });

  cutBtn.addEventListener("click", function () {
    cutBtn.classList.add("btn--hidden");
    cakeEl.classList.add("cut");

    window.setTimeout(function () {
      bigBirthdayText.classList.add("show");
      startCelebration({ duration: 6500, withFireworks: true });
      continueFromCake.classList.remove("btn--hidden");
    }, 500);
  });

  /* ---------------------------------------------------------
     PAGE 5 — Good wishes: typing animation
     --------------------------------------------------------- */
  var WISH_MESSAGE =
    "You have one of the sweetest smiles I have ever seen.\n" +
    "Sometimes you're a little dramatic 😄...\n" +
    "Sometimes you're stubborn too...\n" +
    "But honestly, that's exactly what makes you, you.\n\n" +
    "May you always be protected and looked after.\n" +
    "May every one of your dreams find its way to you.\n" +
    "May your life always stay filled with laughter and light.\n" +
    "May success follow you wherever you go.\n\n" +
    "Keep smiling forever, okay?\n" +
    "Happy Birthday once again ❤️";

  var typingText = document.getElementById("typingText");
  var wishesNextBtn = document.getElementById("wishesNextBtn");
  var typingStarted = false;
  var typingTimer = null;

  function startTypingAnimation() {
    if (typingStarted) return;
    typingStarted = true;

    typingText.textContent = "";
    var cursor = document.createElement("span");
    cursor.className = "cursor";
    typingText.appendChild(cursor);

    var i = 0;
    typingTimer = window.setInterval(function () {
      if (i >= WISH_MESSAGE.length) {
        window.clearInterval(typingTimer);
        wishesNextBtn.classList.remove("btn--hidden");
        return;
      }
      var char = WISH_MESSAGE.charAt(i);
      var textNode = document.createTextNode(char);
      typingText.insertBefore(textNode, cursor);
      i++;
    }, 28);
  }

  /* ---------------------------------------------------------
     PAGE 6 — Final surprise: yes / no / dodging button
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
   PAGE 6 + PAGE 7
--------------------------------------------------------- */

var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");

var friendQuestion = document.getElementById("friendQuestion");
var friendHappy = document.getElementById("friendHappy");

var friendYesBtn = document.getElementById("friendYesBtn");
var friendNoBtn = document.getElementById("friendNoBtn");

var cryingOverlay = document.getElementById("cryingOverlay");

/* Surprise Page */

yesBtn.addEventListener("click", function () {

    goToScreen("screen-friend");

});

noBtn.addEventListener("click", function () {

    cryingOverlay.hidden = false;

    setTimeout(function(){

        cryingOverlay.hidden = true;

        goToScreen("screen-friend");

    },2500);

});


/* Friend Page */

friendYesBtn.addEventListener("click",function(){

    friendQuestion.style.display="none";

    friendHappy.hidden=false;

    startCelebration({
        duration:7000,
        withFireworks:true
    });

    playMusic();

});

friendNoBtn.addEventListener("click",function(){

    cryingOverlay.hidden=false;

    setTimeout(function(){

        cryingOverlay.hidden=true;

        window.close();

    },2500);

});
  /* ---------------------------------------------------------
     Music
     --------------------------------------------------------- */
  var bgMusic = document.getElementById("bgMusic");
  var soundToggle = document.getElementById("soundToggle");

  function playMusic() {
    if (state.musicMuted) return;
    soundToggle.hidden = false;
    bgMusic.volume = 0.55;
    var playPromise = bgMusic.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function () {
        // Autoplay may be blocked until further interaction; toggle stays visible.
      });
    }
  }

  soundToggle.addEventListener("click", function () {
    state.musicMuted = !state.musicMuted;
    soundToggle.classList.toggle("muted", state.musicMuted);
    if (state.musicMuted) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(function () {});
    }
  });

  // Start music once the cake celebration begins too
  var originalStartCelebrationMusicHook = function () {
    playMusic();
  };

  /* ---------------------------------------------------------
     Celebration particle system
     confetti + balloons + sparkles + hearts (DOM) + fireworks (canvas)
     --------------------------------------------------------- */
  var celebrationOverlay = document.getElementById("celebrationOverlay");
  var particleLayer = document.getElementById("particleLayer");
  var fireworksCanvas = document.getElementById("fireworksCanvas");
  var ctx = fireworksCanvas.getContext("2d");
  var fireworkParticles = [];
  var fireworksRAF = null;
  var fireworksInterval = null;

  var CONFETTI_COLORS = ["#ff8fb3", "#ffd166", "#b9a6ff", "#7fd8c4", "#ff6f9c", "#e3d9ff"];

  function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function startCelebration(opts) {
    var duration = (opts && opts.duration) || 6000;
    var withFireworks = opts && opts.withFireworks;

    celebrationOverlay.classList.add("on");
    playMusic();

    var confettiTimer = window.setInterval(spawnConfettiBurst, 260);
    var balloonTimer = window.setInterval(spawnBalloon, 700);
    var sparkleTimer = window.setInterval(spawnSparkle, 350);
    var heartTimer = window.setInterval(spawnHeart, 500);

    if (withFireworks) {
      startFireworks();
    }

    window.setTimeout(function () {
      window.clearInterval(confettiTimer);
      window.clearInterval(balloonTimer);
      window.clearInterval(sparkleTimer);
      window.clearInterval(heartTimer);
      stopFireworks();
      window.setTimeout(function () {
        celebrationOverlay.classList.remove("on");
        particleLayer.innerHTML = "";
      }, 1200);
    }, duration);
  }

  function spawnConfettiBurst() {
    for (var i = 0; i < 6; i++) {
      var piece = document.createElement("span");
      piece.className = "particle particle--confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      var duration = 2.6 + Math.random() * 2;
      piece.style.animationDuration = duration + "s";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      particleLayer.appendChild(piece);
      window.setTimeout(function (el) {
        return function () {
          el.remove();
        };
      }(piece), duration * 1000 + 100);
    }
  }

  function spawnBalloon() {
    var emojis = ["🎈", "🎈", "🎈"];
    var balloon = document.createElement("span");
    balloon.className = "particle particle--balloon";
    balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    balloon.style.left = Math.random() * 90 + "vw";
    var duration = 5 + Math.random() * 2.5;
    balloon.style.animationDuration = duration + "s";
    particleLayer.appendChild(balloon);
    window.setTimeout(function () {
      balloon.remove();
    }, duration * 1000 + 100);
  }

  function spawnSparkle() {
    var sparkle = document.createElement("span");
    sparkle.className = "particle particle--sparkle";
    sparkle.textContent = "✨";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 70 + "vh";
    var duration = 1.4 + Math.random();
    sparkle.style.animationDuration = duration + "s";
    particleLayer.appendChild(sparkle);
    window.setTimeout(function () {
      sparkle.remove();
    }, duration * 1000 + 100);
  }

  function spawnHeart() {
    var emojis = ["❤️", "💕", "💖", "💗"];
    var heart = document.createElement("span");
    heart.className = "particle particle--heart";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 90 + "vw";
    var duration = 4 + Math.random() * 2;
    heart.style.animationDuration = duration + "s";
    particleLayer.appendChild(heart);
    window.setTimeout(function () {
      heart.remove();
    }, duration * 1000 + 100);
  }

  /* Fireworks — lightweight canvas particle burst simulation */
  function createFireworkBurst(x, y) {
    var count = 34;
    var hue = Math.floor(Math.random() * 360);
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i) / count;
      var speed = 2 + Math.random() * 3;
      fireworkParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: "hsl(" + (hue + Math.random() * 40) + ", 90%, 68%)",
        size: 2 + Math.random() * 2,
      });
    }
  }

  function fireworksTick() {
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    for (var i = fireworkParticles.length - 1; i >= 0; i--) {
      var p = fireworkParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.045; // gravity
      p.alpha -= 0.012;

      if (p.alpha <= 0) {
        fireworkParticles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = Math.max(p.alpha, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    fireworksRAF = window.requestAnimationFrame(fireworksTick);
  }

  function startFireworks() {
    if (fireworksRAF) return;
    fireworksTick();
    fireworksInterval = window.setInterval(function () {
      var x = window.innerWidth * (0.2 + Math.random() * 0.6);
      var y = window.innerHeight * (0.15 + Math.random() * 0.35);
      createFireworkBurst(x, y);
    }, 650);
    // fire one immediately
    createFireworkBurst(window.innerWidth / 2, window.innerHeight * 0.3);
  }

  function stopFireworks() {
    if (fireworksInterval) {
      window.clearInterval(fireworksInterval);
      fireworksInterval = null;
    }
    window.setTimeout(function () {
      if (fireworksRAF) {
        window.cancelAnimationFrame(fireworksRAF);
        fireworksRAF = null;
      }
      ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }, 1400);
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  updateProgressDots(currentScreenId);
  nameInput.focus();
})();
