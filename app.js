'use strict';
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const typograph = text => text.replace(/(?<![а-яё])(в|во|на|к|ко|с|со|о|об|обо|у|из|от|до|за|по|под|над|при|про|без|для|перед|через|между|и|а|не) (?=\S)/giu, '$1\u00a0');
  const promptText = typograph('Привет! Проанализируй проблему личного восприятия авторства при работе с ИИ в наши дни. Стиль – научно-публицистический, объём – 10–12 экранов.');

  // Only the gradient moves. Interpolation runs while a pointer target settles.
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  $$('.intro:not(#prompt-scene)').forEach(scene => {
    let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, lastTime = 0;
    function draw(now) {
      frame = 0;
      if (scene.hidden || motion.matches || document.hidden) { lastTime = 0; return; }
      const ease = 1 - Math.exp(-Math.min(64, now - (lastTime || now - 16)) / 170);
      lastTime = now; x += (targetX - x) * ease; y += (targetY - y) * ease;
      scene.style.setProperty('--pointer-x', x.toFixed(4));
      scene.style.setProperty('--pointer-y', y.toFixed(4));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .001) frame = requestAnimationFrame(draw);
      else lastTime = 0;
    }
    function schedule() { if (!frame && !motion.matches && finePointer.matches) frame = requestAnimationFrame(draw); }
    scene.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || !finePointer.matches) return;
      const rect = scene.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width * 2 - 1;
      targetY = (event.clientY - rect.top) / rect.height * 2 - 1; schedule();
    }, {passive:true});
    scene.addEventListener('pointerleave', () => { targetX = targetY = 0; schedule(); });
    motion.addEventListener('change', () => {
      if (motion.matches) { cancelAnimationFrame(frame); frame = 0; x = y = targetX = targetY = 0; scene.style.removeProperty('--pointer-x'); scene.style.removeProperty('--pointer-y'); }
    });
  });
  // The base stays fixed. Only two faint, pre-positioned atmospheric layers move.
  const atmosphereScene = $('#prompt-scene');
  const atmosphereLayers = [...atmosphereScene.querySelectorAll('.atmosphere-layer')];
  const atmospherePositions = atmosphereLayers.map(() => ({x:0,y:0}));
  let atmosphereFrame = 0, atmosphereTime = 0, aimX = 0, aimY = 0;
  function resetAtmosphere() {
    cancelAnimationFrame(atmosphereFrame); atmosphereFrame = 0; atmosphereTime = 0;
    aimX = aimY = 0;
    atmospherePositions.forEach((point,i) => { point.x = point.y = 0; atmosphereLayers[i].style.transform = 'translate3d(0,0,0)'; });
  }
  function drawAtmosphere(now) {
    atmosphereFrame = 0;
    if (atmosphereScene.hidden || document.hidden || motion.matches || !finePointer.matches) { atmosphereTime = 0; return; }
    const delta = Math.min(64, now - (atmosphereTime || now - 16)); atmosphereTime = now;
    let moving = false;
    atmospherePositions.forEach((point,i) => {
      const amplitude = i === 0 ? 32 : 22;
      const x = aimX * amplitude, y = aimY * amplitude * .75;
      const ease = 1 - Math.exp(-delta / (i === 0 ? 650 : 950));
      point.x += (x-point.x)*ease; point.y += (y-point.y)*ease;
      moving ||= Math.abs(x-point.x)+Math.abs(y-point.y) > .02;
      atmosphereLayers[i].style.transform = `translate3d(${point.x.toFixed(3)}px,${point.y.toFixed(3)}px,0)`;
    });
    if (moving) atmosphereFrame = requestAnimationFrame(drawAtmosphere);
    else atmosphereTime = 0;
  }
  function scheduleAtmosphere() {
    if (!atmosphereFrame && !motion.matches && finePointer.matches) atmosphereFrame = requestAnimationFrame(drawAtmosphere);
  }
  atmosphereScene.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || !finePointer.matches || motion.matches) return;
    const bounds = atmosphereScene.getBoundingClientRect();
    aimX = Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
    aimY = Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
    scheduleAtmosphere();
  }, {passive:true});
  atmosphereScene.addEventListener('pointerleave', () => { aimX = aimY = 0; scheduleAtmosphere(); });
  motion.addEventListener('change', resetAtmosphere);
  finePointer.addEventListener('change', resetAtmosphere);
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetAtmosphere(); });

  const scrollBehavior = () => motion.matches ? 'instant' : 'smooth';
  const textNode = (tag, text, cls) => { const el = document.createElement(tag); el.textContent = text; if (cls) el.className = cls; return el; };

  // Two introductory scenes; reading never depends on the typing duration.
  let introRun = 0, titleTimer, promptTimer;
  function startTitle() { clearTimeout(titleTimer); }
  function closeContents() { $('#contents').hidden = true; $('#contents-toggle').setAttribute('aria-expanded', 'false'); }
  function enterReading(target = 'introduction', push = false) {
    introRun++; clearTimeout(titleTimer); clearTimeout(promptTimer);
    $('#cover').hidden = true; $('#prompt-scene').hidden = true;
    $('#publication').hidden = false; $('#publication').inert = false;
    $('#generation-pill').hidden = false;
    $('#generation-pill').classList.remove('is-arriving', 'has-arrived');
    document.body.dataset.view = 'reading';
    if (push) history.replaceState(null, '', '#article');
    requestAnimationFrame(() => {
      const destination = document.getElementById(target) || $('#article');
      destination.scrollIntoView({ behavior: 'instant', block: 'start' });
      $('#article').focus({ preventScroll: true }); scheduleScroll();
    });
  }
  function backCover() {
    introRun++; clearTimeout(promptTimer); closeContents();
    $('#prompt-record').hidden = true; $('#generation-pill').hidden = true;
    $('#generation-pill').setAttribute('aria-expanded', 'false');
    $('#publication').hidden = true; $('#prompt-scene').hidden = true;
    $('#cover').hidden = false; document.body.dataset.view = 'cover';
    history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: 'instant' });
    startTitle(); $('#start-reading').focus({ preventScroll: true });
  }
  async function beginPrompt() {
    if (document.body.dataset.view !== 'cover') return;
    const run = ++introRun;
   
    const cover = $('#cover'), scene = $('#prompt-scene');
    scene.getAnimations().forEach(a => a.cancel());
    scene.hidden = false; scene.inert = false; scene.classList.remove('is-sending');
    $('#prompt-form').getAnimations().forEach(a => a.cancel());
    $('#prompt').value = ''; $('#send-prompt').disabled = false;
    document.body.dataset.view = 'opening'; cover.inert = true;
    const rise = cover.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],
      {duration:motion.matches ? 1 : 900,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'});
    try { await rise.finished; } catch { return; }
    if (run !== introRun) { rise.cancel(); cover.inert = false; return; }
    cover.hidden = true; cover.inert = false; rise.cancel();
    document.body.dataset.view = 'prompt'; $('#send-prompt').focus({preventScroll:true});
    let length = 0;
    function type() {
      if (run !== introRun) return;
      length = motion.matches ? promptText.length : Math.min(length + 1, promptText.length);
      $('#prompt').value = promptText.slice(0,length);
      $('#prompt').scrollTop = 0;
      if (length < promptText.length) promptTimer = setTimeout(type,24);
    }
    promptTimer = setTimeout(type,300);
  }
  async function sendPrompt() {
    if (document.body.dataset.view !== 'prompt' || $('#send-prompt').disabled) return;
    clearTimeout(promptTimer); $('#prompt').value = promptText;
    $('#send-prompt').disabled = true;
    const run = introRun, scene = $('#prompt-scene');
    document.body.dataset.view = 'sending'; scene.inert = true;
    $('#publication').hidden = false; $('#publication').inert = true;
    $('#generation-pill').hidden = false;
    window.scrollTo({top:0,behavior:'instant'});
    // Move the opaque scene as a single surface. Its badge never overlaps
    // the article header, and text is never compressed into a scaled form.
    const leave = scene.animate([
      {transform:'translateY(0)'}, {transform:'translateY(-100%)'}
    ], {duration:motion.matches ? 1 : 850,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'});
    try { await leave.finished; } catch { scene.inert = false; return; }
    if (run === introRun) enterReading('introduction',true);
    leave.cancel(); scene.inert = false;
  }
  $('#record-text').textContent = promptText;
  $('#start-reading').addEventListener('click', beginPrompt);
  $('#prompt-form').addEventListener('submit', e => { e.preventDefault(); sendPrompt(); });
  
  $('#cover-return').addEventListener('click', backCover);
  $('#generation-pill').addEventListener('click', () => {
    const open = $('#prompt-record').hidden;
    $('#prompt-record').hidden = !open; $('#generation-pill').setAttribute('aria-expanded', String(open));
  });
  $('#contents-toggle').addEventListener('click', () => {
    const open = $('#contents').hidden;
    $('#contents').hidden = !open; $('#contents-toggle').setAttribute('aria-expanded', String(open));
  });
  $$('#contents a').forEach(a => a.addEventListener('click', closeContents));
  document.addEventListener('click', e => {
    if (!e.target.closest('#contents, #contents-toggle')) closeContents();
    if (!e.target.closest('#prompt-record, #generation-pill')) { $('#prompt-record').hidden = true; $('#generation-pill').setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const contentsOpen = !$('#contents').hidden;
      closeContents(); $('#prompt-record').hidden = true; $('#generation-pill').setAttribute('aria-expanded', 'false');
      if (contentsOpen) $('#contents-toggle').focus();
    }
  });
  window.addEventListener('hashchange', () => {
    if (document.body.dataset.view !== 'reading' && location.hash) enterReading(location.hash.slice(1));
  });

  // Three comparable survey percentages share a fixed 0–100% width scale.
  const series = {
    context: {
      all: { value:52, text:'Пользователей генеративного ИИ среди опрошенных учёных считают его полезным для своей области науки.' },
      medical: { value:64, text:'Пользователей генеративного ИИ среди опрошенных учёных в медицинских науках считают его полезным для своей области.' },
      humanities: { value:41, text:'Пользователей генеративного ИИ среди опрошенных учёных в гуманитарных науках считают его полезным для своей области.' }
    }
  };
  function renderData(kind, key) {
    const selected = series[kind][key];
    $(`[id="${kind}-value"]`).textContent = new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(selected.value) + '%';
    $(`#${kind}-description`).textContent = typograph(selected.text[0].toLowerCase() + selected.text.slice(1));
    $$(`[data-${kind}]`).forEach(button => button.setAttribute('aria-pressed', String(button.dataset[kind] === key)));

  }
  for (const kind of ['context']) {
    $$(`[data-${kind}]`).forEach(button => button.addEventListener('click', () => renderData(kind,button.dataset[kind])));
  }
  renderData('context','all');

  // Identical galleries and accessible native modal for both image sequences.
  $$('[data-gallery-prev], [data-gallery-next]').forEach(b => b.addEventListener('click', () => {
    const next = b.hasAttribute('data-gallery-next'), gallery = document.getElementById(next ? b.dataset.galleryNext : b.dataset.galleryPrev);
    const distance = gallery.firstElementChild.getBoundingClientRect().width + 24;
    gallery.scrollBy({ left: (next ? 1 : -1) * distance, behavior: scrollBehavior() });
  }));
  $$('.gallery').forEach(gallery => gallery.addEventListener('keydown', e => {
    if (e.target !== gallery || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault(); gallery.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * gallery.clientWidth * .8, behavior: scrollBehavior() });
  }));
  $$('.image-zoom').forEach(b => b.addEventListener('click', () => {
    const img = b.querySelector('img'); $('#dialog-image').src = img.src; $('#dialog-image').alt = img.alt; $('#image-dialog').showModal();
  }));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#source-"]');
    if (!link) return;
    document.querySelector(link.getAttribute('href'))?.closest('details')?.setAttribute('open','');
  });
  $('#close-image').addEventListener('click', () => $('#image-dialog').close());
  $('#image-dialog').addEventListener('click', e => { if (e.target === $('#image-dialog')) $('#image-dialog').close(); });

  // Scroll-linked ink is a visual duplicate. The source is complete, selectable,
  // searchable and available to assistive technologies from the first frame.
  let ink = [], scheduled = false, lastScroll = 0, writingTimer;
  function setupInk() {
    ink.forEach(({ p, source }) => { p.replaceChildren(...source.childNodes); p.classList.remove('write-paragraph', 'has-ink', 'is-active-writing'); }); ink = [];
    if (motion.matches) return;
    $$('[data-write]').forEach(p => {
      const source = document.createElement('span'); source.className = 'paragraph-source'; source.append(...p.childNodes);
      const layer = document.createElement('span'); layer.className = 'write-layer'; layer.setAttribute('aria-hidden', 'true'); layer.textContent = source.textContent;
      const caret = document.createElement('span'); caret.className = 'write-caret'; caret.setAttribute('aria-hidden', 'true');
      p.append(source, layer, caret); p.classList.add('write-paragraph', 'has-ink');
      ink.push({ p, source, layer, caret, progress: 0 });
    });
    scheduleScroll();
  }
  function scheduleScroll() { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }
  function updateScroll() {
    scheduled = false;
    if (document.body.dataset.view !== 'reading') return;
    const viewport = window.innerHeight, y = window.scrollY;
    const max = document.documentElement.scrollHeight - viewport;
    $('#progress-bar').style.width = `${max > 0 ? Math.min(100, Math.max(0, y / max * 100)) : 100}%`;
    const chapters = $$('.chapter, .data-break, #reflection, #sources'); let current = chapters[0]?.id;
    chapters.forEach(ch => { if (ch.getBoundingClientRect().top < viewport * .42) current = ch.id; });
    $$('#contents a').forEach(a => { if (a.hash === '#' + current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    let active = null, changed = false;
    ink.forEach(item => {
      const r = item.p.getBoundingClientRect();
      if (r.top > viewport || r.bottom < 0 && item.progress >= 1) return;
      const progress = Math.max(item.progress, Math.min(1, Math.max(0, (viewport * .76 - r.top) / r.height)));
      if (progress > item.progress + .001) changed = true;
      item.progress = progress; item.p.dataset.inkProgress = progress.toFixed(4);
      if (!progress) return;
      const line = parseFloat(getComputedStyle(item.p).lineHeight), rows = Math.max(1, Math.round(r.height / line));
      const at = progress * rows, full = Math.floor(at), fraction = at - full;
      const charWidth = parseFloat(getComputedStyle(item.p).fontSize) * .6;
      const x = Math.min(r.width, Math.round(fraction * r.width / charWidth) * charWidth), top = full * line;
      item.layer.style.clipPath = progress >= 1 ? 'inset(0)' : `polygon(0 0,100% 0,100% ${top}px,${x}px ${top}px,${x}px ${top + line}px,0 ${top + line}px)`;
      item.caret.style.left = `${x}px`; item.caret.style.top = `${top + line * .2}px`;
      item.p.classList.remove('is-active-writing');
      if (progress < 1 && r.top < viewport * .8 && r.bottom > 120) active = item;
    });
    if (document.body.classList.contains('reading-static')) active = null;
    if (active && Math.abs(y - lastScroll) > 1) active.p.classList.add('is-active-writing');
    if (changed && !document.body.classList.contains('reading-static') && Math.abs(y - lastScroll) > 1) {
      $('#generation-pill').classList.add('is-writing');
      clearTimeout(writingTimer); writingTimer = setTimeout(() => {
        $('#generation-pill').classList.remove('is-writing'); ink.forEach(item => item.p.classList.remove('is-active-writing'));
      }, 350);
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  motion.addEventListener('change', () => { setupInk(); startTitle(); });
  document.fonts.ready.then(() => { setupInk(); });
 
  const initialTarget = decodeURIComponent(location.hash.slice(1));
  if (initialTarget && document.getElementById(initialTarget)) enterReading(initialTarget);
  else startTitle();
})();
