/* ==========================================================================
   script.js — behaviour only. Personal content lives in js/config.js.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.INVITE;
  if (!C) { console.warn('config.js did not load.'); return; }

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setText(id, t) { var el = $(id); if (el) el.textContent = t || ''; }
  function hide(el, cond) { if (el) el.hidden = !!cond; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ---------- theme ---------- */
  (function applyTheme() {
    var t = C.theme || {}, r = document.documentElement.style;
    ['blush', 'rose', 'burgundy', 'ivory', 'cream', 'ink'].forEach(function (k) { if (t[k]) r.setProperty('--' + k, t[k]); });
  })();

  /* ---------- date helpers ---------- */
  var eventDate = null;
  if (C.event && C.event.dateTime) {
    var d = new Date(C.event.dateTime);
    if (!isNaN(d.getTime())) eventDate = d;
  }
  function fmt(opts) { return eventDate ? new Intl.DateTimeFormat('en-GB', opts).format(eventDate) : ''; }
  var dateLong = eventDate ? fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Date to be announced';
  var timeStr = eventDate ? fmt({ hour: 'numeric', minute: '2-digit', hour12: true }) + (C.event.timeZoneLabel ? ' ' + C.event.timeZoneLabel : '') : 'Time to be announced';

  /* ---------- bind static content ---------- */
  var L = C.labels || {};
  var name = C.name || 'Your Name Here';
  document.title = "You're Invited ♡ " + name;

  var W = C.welcome || {};
  setText('welcomeLine', W.line);
  setText('openBtn', W.openButton);
  setText('skipBtn', W.skipButton || 'Skip intro');
  setText('cardName', name);
  if (W.toName) setText('welcomeTo', W.toName); else hide($('welcomeTo'), true);

  setText('heroName', name);
  setText('heroTagline', C.tagline);
  setText('heroAge', C.age ? 'turning ' + C.age : '');
  hide($('heroAge'), !C.age);
  setText('heroMessage', C.event && C.event.invitationMessage);
  setText('heroDate', dateLong);
  setText('heroTime', timeStr);
  setText('heroVenue', C.event && C.event.venueName);
  var dress = C.event && C.event.dressCode;
  setText('heroDress', dress); hide($('heroDressWrap'), !dress);

  setText('aboutTitle', C.introTitle);
  var aboutBox = $('aboutText');
  (C.introText || []).forEach(function (p) { aboutBox.appendChild(el('p', '', p)); });

  setText('galleryTitle', C.galleryTitle);
  setText('gallerySub', C.gallerySubtitle);

  /* nav labels */
  var navLabels = L.nav || {};
  document.querySelectorAll('#navList a').forEach(function (a) { a.textContent = navLabels[a.getAttribute('data-k')] || a.getAttribute('data-k'); });
  $('toTop').setAttribute('aria-label', L.backToTop || 'Back to top');

  /* ---------- background petals ---------- */
  (function petals() {
    if (reduceMotion) return;
    var box = $('petals'), n = window.innerWidth < 600 ? 10 : 18;
    for (var i = 0; i < n; i++) {
      var p = el('span', 'petal');
      p.style.left = Math.random() * 100 + '%';
      var fall = 14 + Math.random() * 14, sway = 3 + Math.random() * 3;
      p.style.animationDuration = fall + 's,' + sway + 's';
      p.style.animationDelay = (-Math.random() * fall) + 's,' + (-Math.random() * sway) + 's';
      p.style.transform = 'scale(' + (0.6 + Math.random() * 0.9) + ')';
      box.appendChild(p);
    }
  })();

  /* ---------- welcome / envelope ---------- */
  var welcome = $('welcome'), envelope = $('envelope'), opened = false, entered = false;

  function enterSite() {
    if (entered) return; entered = true;
    welcome.classList.add('leaving');
    $('site').classList.remove('hidden');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    setTimeout(function () { welcome.style.display = 'none'; revealCheck(); }, 1000);
    if (C.music && C.music.file) { $('musicFloat').hidden = false; $('musicFloat').classList.remove('hidden'); }
  }
  function burst() {
    var box = $('burst'), glyphs = ['♡', '✿', '✦', '♥', '❀'];
    for (var i = 0; i < 26; i++) {
      var s = el('i', '', glyphs[i % glyphs.length]);
      s.style.setProperty('--x', ((Math.random() - 0.5) * 520) + 'px');
      s.style.setProperty('--y', (-(120 + Math.random() * 380)) + 'px');
      s.style.setProperty('--r', ((Math.random() - 0.5) * 120) + 'deg');
      s.style.fontSize = (14 + Math.random() * 22) + 'px';
      s.style.animationDelay = (Math.random() * 0.5) + 's';
      box.appendChild(s);
    }
  }
  $('openBtn').addEventListener('click', function () {
    if (opened) return; opened = true;
    $('openBtn').disabled = true;
    envelope.classList.add('open');
    welcome.classList.add('opened');
    burst();
    setTimeout(enterSite, reduceMotion ? 300 : 3000);
  });
  $('skipBtn').addEventListener('click', enterSite);

  /* ---------- nav ---------- */
  var nav = $('nav'), navToggle = $('navToggle');
  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open'); navToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#navList a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) { nav.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- scroll reveal + active nav + back to top ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(function (e) { io.observe(e); });
  } else revealEls.forEach(function (e) { e.classList.add('in'); });
  function revealCheck() { if (!io) return; revealEls.forEach(function (e) { var r = e.getBoundingClientRect(); if (r.top < window.innerHeight) e.classList.add('in'); }); }

  var links = Array.prototype.slice.call(document.querySelectorAll('#navList a'));
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) so.observe(s); });
  }
  var toTop = $('toTop');
  window.addEventListener('scroll', function () { toTop.classList.toggle('show', window.scrollY > 600); }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------- countdown ---------- */
  (function countdown() {
    var box = $('countdownBox'), note = $('cdNote');
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    if (!eventDate) {
      box.classList.add('off');
      note.textContent = 'The date will be announced very soon ♡';
      return;
    }
    function tick() {
      var diff = eventDate.getTime() - Date.now();
      if (diff <= 0) {
        box.classList.add('off');
        note.textContent = 'The celebration day has arrived — or has just passed. Thank you for the love ♡';
        clearInterval(timer); return;
      }
      var s = Math.floor(diff / 1000);
      $('cdD').textContent = Math.floor(s / 86400);
      $('cdH').textContent = pad(Math.floor(s % 86400 / 3600));
      $('cdM').textContent = pad(Math.floor(s % 3600 / 60));
      $('cdS').textContent = pad(s % 60);
      note.textContent = 'until ' + dateLong;
    }
    var timer = setInterval(tick, 1000); tick();
  })();

  /* ---------- gallery + lightbox ---------- */
  var photos = (C.photos || []).filter(function (p) { return p && p.src; });
  var gallery = $('gallery');
  photos.forEach(function (p, i) {
    var b = el('button', 'polaroid ' + (p.size || 'md'));
    b.type = 'button';
    b.style.setProperty('--tilt', (p.tilt || 0) + 'deg');
    b.setAttribute('aria-label', 'Open photo' + (p.caption ? ': ' + p.caption : ' ' + (i + 1)));
    var img = document.createElement('img');
    img.src = p.src; img.alt = p.caption || 'Photo ' + (i + 1); img.loading = 'lazy'; img.decoding = 'async';
    b.appendChild(img); b.appendChild(el('span', '', p.caption || ''));
    b.addEventListener('click', function () { openLb(i, b); });
    gallery.appendChild(b);
  });
  if (!photos.length) $('memories').hidden = true;

  var lb = $('lightbox'), lbImg = $('lbImg'), lbCap = $('lbCap'), cur = 0, lastFocus = null;
  function showLb(i) {
    cur = (i + photos.length) % photos.length;
    lbImg.src = photos[cur].src; lbImg.alt = photos[cur].caption || 'Photo ' + (cur + 1);
    lbCap.textContent = photos[cur].caption || '';
    var one = photos.length < 2; $('lbPrev').hidden = one; $('lbNext').hidden = one;
  }
  function openLb(i, trigger) { lastFocus = trigger; showLb(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('lbClose').focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('lbClose').addEventListener('click', closeLb);
  $('lbPrev').addEventListener('click', function () { showLb(cur - 1); });
  $('lbNext').addEventListener('click', function () { showLb(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') showLb(cur - 1);
    else if (e.key === 'ArrowRight') showLb(cur + 1);
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50 && photos.length > 1) showLb(cur + (dx < 0 ? 1 : -1));
  });

  /* ---------- letter ---------- */
  var LT = C.letter || {};
  setText('letterTitle', LT.title);
  setText('sealLabel', LT.revealButton);
  setText('lGreeting', LT.greeting);
  setText('lClosing', LT.closing);
  setText('lSign', LT.signature);
  setText('lPS', LT.closingNote); hide($('lPS'), !LT.closingNote);

  var typeJobs = [];
  function fillBlock(id, paras) {
    var box = $(id);
    (paras || []).forEach(function (text) {
      var p = el('p'), rest = text, used = false;
      (LT.typewriter || []).forEach(function (s) {
        if (used || !s) return;
        var idx = rest.indexOf(s);
        if (idx < 0) return;
        used = true;
        if (idx > 0) p.appendChild(document.createTextNode(rest.slice(0, idx)));
        var span = el('span', '', reduceMotion ? s : '');
        p.appendChild(span);
        if (!reduceMotion) typeJobs.push({ span: span, text: s });
        rest = rest.slice(idx + s.length);
      });
      if (rest) p.appendChild(document.createTextNode(rest));
      box.appendChild(p);
    });
  }
  fillBlock('lWishes', LT.wishes); fillBlock('lMemories', LT.memories); fillBlock('lFinal', LT.finalMessage);

  function runTypewriter() {
    (function next() {
      var job = typeJobs.shift(); if (!job) return;
      var i = 0; job.span.classList.add('type-cursor');
      var t = setInterval(function () {
        job.span.textContent = job.text.slice(0, ++i);
        if (i >= job.text.length) { clearInterval(t); job.span.classList.remove('type-cursor'); next(); }
      }, 38);
    })();
  }
  // Reserve the typewriter text in the layout so the page doesn't jump while typing
  var sealBtn = $('sealBtn');
  sealBtn.addEventListener('click', function () {
    var paper = $('letterPaper');
    paper.hidden = false; sealBtn.setAttribute('aria-expanded', 'true');
    $('letterSealWrap').classList.add('gone');
    if (!reduceMotion) setTimeout(runTypewriter, 900);
    paper.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if ((LT.surpriseNotes || []).length) $('notesWrap').hidden = false;
  });

  var notes = LT.surpriseNotes || [];
  if (notes.length) {
    setText('notesTitle', LT.surpriseTitle);
    notes.forEach(function (msg, i) {
      var b = el('button', 'note', '✉'); b.type = 'button';
      b.style.setProperty('--t', ((i % 2 ? 1 : -1) * (2 + (i % 3))) + 'deg');
      b.setAttribute('aria-label', 'Surprise note ' + (i + 1));
      b.addEventListener('click', function () { b.classList.add('read'); setText('noteOut', msg); });
      $('notes').appendChild(b);
    });
  }

  /* ---------- details ---------- */
  var E = C.event || {};
  setText('dDateTime', eventDate ? dateLong + ' · ' + timeStr : 'Date & time to be announced');
  setText('dVenue', E.venueName); setText('dAddress', E.address);
  setText('dDress', dress); hide($('dDressWrap'), !dress);
  if (eventDate) {
    setText('calMonth', fmt({ month: 'long' }));
    setText('calDay', String(eventDate.getDate()));
    setText('calWeekday', fmt({ weekday: 'long' }));
    setText('calYear', String(eventDate.getFullYear()));
  } else { setText('calMonth', 'Save'); setText('calDay', '♡'); setText('calWeekday', 'the date'); setText('calYear', 'soon'); }

  var mapBtn = $('mapBtn');
  mapBtn.textContent = L.openMaps || 'Open in Google Maps ♡';
  mapBtn.href = E.mapLink ? E.mapLink : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([E.venueName, E.address].filter(Boolean).join(' '));

  var calBtn = $('calBtn');
  calBtn.textContent = L.addToCalendar || 'Add to calendar';
  if (!eventDate) calBtn.hidden = true;
  calBtn.addEventListener('click', function () {
    function z(n) { return n < 10 ? '0' + n : '' + n; }
    function ics(d) { return d.getUTCFullYear() + z(d.getUTCMonth() + 1) + z(d.getUTCDate()) + 'T' + z(d.getUTCHours()) + z(d.getUTCMinutes()) + '00Z'; }
    function esc(s) { return String(s || '').replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n'); }
    var end = new Date(eventDate.getTime() + 3 * 3600 * 1000);
    var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Birthday Invitation//EN', 'BEGIN:VEVENT',
      'UID:' + eventDate.getTime() + '@birthday-invitation', 'DTSTAMP:' + ics(new Date()), 'DTSTART:' + ics(eventDate), 'DTEND:' + ics(end),
      'SUMMARY:' + esc(name + "'s Birthday"), 'LOCATION:' + esc([E.venueName, E.address].filter(Boolean).join(', ')), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var url = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
    var a = document.createElement('a'); a.href = url; a.download = 'birthday.ics';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  });

  /* ---------- delivery (RSVP + wishes) ---------- */
  var R = C.rsvp || {};
  function stash(kind, data) {
    try { var k = 'invite_' + kind, arr = JSON.parse(localStorage.getItem(k) || '[]'); arr.push(data); localStorage.setItem(k, JSON.stringify(arr)); } catch (e) {}
  }
  // Returns a Promise resolving to {mode:'form'|'whatsapp'|'local', link?}
  function deliver(kind, data, plainText) {
    var stamped = Object.assign({ kind: kind, at: new Date().toISOString() }, data);
    if (R.formEndpoint) {
      return fetch(R.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(stamped)
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        stash(kind, stamped); return { mode: 'form' };
      });
    }
    if (R.whatsappNumber) {
      var num = String(R.whatsappNumber).replace(/\D/g, '');
      stash(kind, stamped);
      return Promise.resolve({ mode: 'whatsapp', link: 'https://wa.me/' + num + '?text=' + encodeURIComponent(plainText) });
    }
    stash(kind, stamped);
    return Promise.resolve({ mode: 'local' });
  }
  function showDone(box, headline, res, extraNote) {
    box.textContent = '';
    box.appendChild(el('span', 'big', headline));
    if (res.mode === 'whatsapp') {
      box.appendChild(el('span', 'small', 'One last step: tap the button so it reaches the host on WhatsApp.'));
      var a = el('a', 'btn btn-primary', 'Send on WhatsApp ♡'); a.href = res.link; a.target = '_blank'; a.rel = 'noopener noreferrer'; box.appendChild(a);
    } else if (res.mode === 'form') {
      box.appendChild(el('span', 'small', 'Your reply has been delivered to the host.'));
    } else {
      box.appendChild(el('span', 'small', 'Note: this invitation has no inbox connected, so your reply is saved only on this device. Please also tell the host directly.'));
    }
    box.hidden = false;
    box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  /* ---------- RSVP ---------- */
  setText('rsvpTitle', R.title); setText('rsvpSub', R.subtitle);
  setText('rsvpDeadline', R.deadlineText); hide($('rsvpDeadline'), !R.deadlineText);
  var choice = null, btns = Array.prototype.slice.call(document.querySelectorAll('.choice'));
  btns.forEach(function (b) {
    b.textContent = (R.buttons || {})[b.getAttribute('data-v')] || b.getAttribute('data-v');
    b.addEventListener('click', function () {
      choice = b.getAttribute('data-v');
      btns.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      $('rsvpErr').textContent = '';
    });
  });
  $('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('rsvpName').value.trim(), err = $('rsvpErr');
    if (!n) { err.textContent = 'Please tell us your name ♡'; $('rsvpName').focus(); return; }
    if (!choice) { err.textContent = 'Please choose one of the options above.'; return; }
    err.textContent = '';
    var label = (R.buttons || {})[choice] || choice, sub = $('rsvpSubmit');
    sub.disabled = true;
    deliver('rsvp', { name: n, attendance: choice }, 'RSVP for ' + name + "'s birthday\nName: " + n + '\nReply: ' + label)
      .then(function (res) {
        $('rsvpForm').hidden = true;
        showDone($('rsvpDone'), (R.confirmations || {})[choice] || 'Thank you!', res);
      })
      .catch(function () { err.textContent = 'Sorry, that did not send. Please check your connection and try again.'; sub.disabled = false; });
  });

  /* ---------- music ---------- */
  var M = C.music || {}, audio = $('audio'), playBtn = $('playBtn'), fab = $('musicFloat');
  if (M.file) {
    $('musicBox').hidden = false;
    audio.src = M.file;
    setText('musicTitle', M.title); setText('songName', M.songName);
    audio.addEventListener('error', function () { setText('songName', 'Music file not found — check assets/music/'); });
    var toggle = function () {
      if (audio.paused) {
        var pr = audio.play();
        if (pr && pr.catch) pr.catch(function () { setText('songName', 'Tap play again to start the music'); });
      } else audio.pause();
    };
    var sync = function () {
      var on = !audio.paused;
      playBtn.textContent = on ? '❚❚' : '▶';
      [playBtn, fab].forEach(function (b) { b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Pause music' : 'Play music'); });
    };
    playBtn.addEventListener('click', toggle); fab.addEventListener('click', toggle);
    audio.addEventListener('play', sync); audio.addEventListener('pause', sync);
  }
  if (M.playlistLink) {
    var pl = $('playlistBtn'); pl.href = M.playlistLink; pl.textContent = M.playlistButton || 'Open the playlist ♪'; pl.hidden = false;
    $('musicBox').hidden = false; if (!M.file) { $('playBtn').parentNode.hidden = true; setText('musicTitle', M.title); }
  }

  /* ---------- wishes ---------- */
  var WS = C.wishes || {};
  setText('wishesTitle', WS.title); setText('wishesSub', WS.subtitle); setText('wishBtn', WS.button);
  $('wishName').placeholder = WS.placeholderName || 'Your name';
  $('wishMsg').placeholder = WS.placeholderMessage || 'Write your wish here…';
  $('wishForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('wishName').value.trim(), m = $('wishMsg').value.trim(), err = $('wishErr');
    if (!m) { err.textContent = 'Please write a little wish first ♡'; $('wishMsg').focus(); return; }
    err.textContent = ''; $('wishBtn').disabled = true;
    deliver('wish', { name: n || 'A friend', message: m }, 'A birthday wish for ' + name + ' ♡\nFrom: ' + (n || 'A friend') + '\n\n' + m)
      .then(function (res) { $('wishForm').hidden = true; showDone($('wishDone'), 'Thank you — your wish is on its way ♡', res); })
      .catch(function () { err.textContent = 'Sorry, that did not send. Please try again.'; $('wishBtn').disabled = false; });
  });

  /* ---------- thanks ---------- */
  var T = C.thanks || {};
  setText('thanksTitle', T.title); setText('thanksText', T.text); setText('thanksSign', T.signoff);
})();
