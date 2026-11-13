// A list of views held still while the page scrolls through them: the home's "Build it without code" and the "See it
// decide" of the solution pages. The list is a <ul class="sp-list">; each <li> holds a title (<h3>), its text (<p>) and a
// <figure>. On a wide screen, with motion allowed, the section's header and the list stay on screen while the page scrolls,
// so that scrolling down goes through every view. The titles stay on the left, numbered; the active one opens its text,
// with a thin line beside it that fills as the scroll moves on. On the right, the next figure slides up over the current
// one like a card laid on a pile, while the one below steps back and fades (the other way when scrolling up). A clip
// starts from its first frame and plays for as long as it shows. A click on a title scrolls to it. After the last view,
// the page scrolls on. Elsewhere (a phone, less motion) the list stays stacked as written. Styles: styles/scroll-player.css.
export function scrollPlayer(list: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(min-width: 901px)').matches) return;
  const items = Array.from(list.children) as HTMLElement[];
  if (items.length < 2) return;
  const head = list.closest('section')?.querySelector('.ed-sec-head') as HTMLElement | null;
  const track = document.createElement('div');
  const pin = document.createElement('div');
  const player = document.createElement('div');
  const stage = document.createElement('div');
  track.className = 'sp-track';
  pin.className = 'sp-pin';
  player.className = 'sp-player';
  stage.className = 'sp-stage';
  list.before(track);
  track.append(pin);
  if (head) pin.append(head);
  pin.append(player);
  player.append(list, stage);
  const figures = items.map((li) => { const figure = li.querySelector('figure') as HTMLElement; stage.append(figure); return figure; });
  const videos = figures.map((figure) => figure.querySelector('video'));
  list.classList.add('is-player');
  list.setAttribute('role', 'tablist');

  let active = -1, start = 0, step = 0, seen = false;
  const slide = 1300;
  const leaving = new Set<number>();
  const shown = (i: number) => i === active || leaving.has(i);
  const play = () => videos.forEach((video, i) => {
    if (!video) return;
    if (shown(i) && seen) { if (video.paused) video.play().catch(() => {}); }
    else if (!video.paused) video.pause();
  });
  const show = (index: number) => {
    if (index === active) return;
    const previous = active;
    active = index;
    items.forEach((li, i) => {
      const on = i === index;
      li.classList.toggle('is-active', on);
      li.querySelector('h3')?.setAttribute('aria-selected', String(on));
    });
    const card = figures[index];
    if (previous >= 0) {
      // The new card starts below (above when scrolling back up), without a transition, then moves into place.
      card.style.transition = 'none';
      card.style.transform = `translateY(${index > previous ? 60 : -60}%)`;
      void card.offsetWidth;
      card.style.transition = '';
      card.style.transform = '';
      const below = figures[previous];
      below.style.setProperty('--away', index > previous ? '-10%' : '10%');
      below.classList.remove('is-active');
      below.classList.add('is-leaving');
      leaving.add(previous);
      setTimeout(() => {
        below.classList.remove('is-leaving');
        leaving.delete(previous);
        play();
      }, slide);
    }
    leaving.delete(index);
    card.classList.remove('is-leaving');
    card.classList.add('is-active');
    const video = videos[index];
    if (video) video.currentTime = 0;
    play();
  };
  // The page's other clips start when they come on screen: here, a clip plays only while it shows, and the section is seen.
  videos.forEach((video, i) => video?.addEventListener('play', () => { if (!shown(i) || !seen) video.pause(); }));

  // The header stays held with the views; on a short screen it slides up out of sight, the views do not.
  const measure = () => {
    const height = pin.offsetHeight;
    const room = innerHeight - 72;
    const top = height <= room ? 72 + Math.round((room - height) / 2) : innerHeight - height - 20;
    step = Math.round(innerHeight * 0.75);
    pin.style.top = top + 'px';
    track.style.height = height + step * items.length + 'px';
    // From the layout itself: the pieces still rising into place would shift a measured box.
    let y = 0;
    for (let e: HTMLElement | null = track; e; e = e.offsetParent as HTMLElement | null) y += e.offsetTop;
    start = y - top;
  };
  const update = () => {
    const at = Math.min(Math.max((scrollY - start) / step, 0), items.length - 0.001);
    const index = Math.floor(at);
    show(index);
    items.forEach((li, i) => li.style.setProperty('--p', String(i < index ? 1 : i === index ? at - index : 0)));
  };
  let frame = 0;
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
  items.forEach((li, i) => {
    const tab = li.querySelector('h3') as HTMLElement;
    tab.setAttribute('role', 'tab');
    tab.tabIndex = 0;
    const go = () => scrollTo({ top: start + i * step + 2, behavior: 'smooth' });
    li.addEventListener('click', go);
    tab.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) videos.forEach((video) => { if (video && video.preload !== 'auto') { video.preload = 'auto'; video.load(); } });
  }, { rootMargin: '0px 0px 100% 0px' }).observe(track);
  new IntersectionObserver(([entry]) => {
    seen = entry.isIntersecting;
    play();
  }, { threshold: 0.3 }).observe(stage);
  measure();
  update();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { measure(); update(); });
  addEventListener('load', () => { measure(); update(); });
}
