/* Aaina Beauty Studio - app demo
   Front-end only. The cart, saved services and bookings use the same localStorage
   keys as the website, so both stay in sync in this browser. */

/* ---------- icons ---------- */

const iconSet = {
  'arrow': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'whatsapp': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M9 9.5c.3 2 2.5 4.2 5 5l1.3-1.3-1.8-1-.9.7a4 4 0 0 1-1.7-1.7l.7-.9-1-1.8z"/>',
  'close': '<path d="M6 6l12 12M18 6 6 18"/>',
  'check': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
  'pin': '<path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'sparkle': '<path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6z"/><path d="M19 15v4M17 17h4"/>',
  'tick': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  'calendar': '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  'chevron-left': '<path d="M15 6l-6 6 6 6"/>',
  'chevron-right': '<path d="M9 6l6 6-6 6"/>',
  'heart': '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  'plus': '<path d="M12 5v14M5 12h14"/>',
  'trash': '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  'home': '<path d="M4 11 12 4l8 7v8.5a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19.5z"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  'bell': '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  'gift': '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3.5 8 4.2 8.5 8 12 8zM12 8s1.5-4.5 4-3.8S15.5 8 12 8z"/>',
  'copy': '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
  'repeat': '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
  'logout': '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10"/>',
  'card': '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
  'upi': '<path d="M7 4l-3 16M13 4l-3 16"/><path d="M15 8l5 4-5 4"/>',
  'store': '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M10 20v-5h4v5"/>',
  'edit': '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  'star': '<path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
  'scissors': '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  'lipstick': '<path d="M8 21h8v-8H8z"/><path d="M9.5 13V8.5L14.5 5v8"/>',
  'drop': '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
  'polish': '<rect x="7" y="11" width="10" height="10" rx="2.5"/><path d="M10 11V7.5h4V11M11 7.5V3h2v4.5"/>',
  'leaf': '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="M5 19l8-8"/>',
  'mandala': '<circle cx="32" cy="32" r="29"/><circle cx="32" cy="32" r="21"/><circle cx="32" cy="32" r="4"/><ellipse cx="32" cy="15" rx="4" ry="8"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(45 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(90 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(135 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(180 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(225 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(270 32 32)"/><ellipse cx="32" cy="15" rx="4" ry="8" transform="rotate(315 32 32)"/>'
};

const spriteMarkup = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
  Object.entries(iconSet).map(([id, paths]) => `<symbol id="${id}" viewBox="${id === 'mandala' ? '0 0 64 64' : '0 0 24 24'}">${paths}</symbol>`).join('') +
  '</svg>';
document.body.insertAdjacentHTML('afterbegin', spriteMarkup);

/* ---------- small helpers ---------- */

const icon = name => `<svg class="icon"><use href="#${name}"/></svg>`;
const money = amount => '₹' + amount.toLocaleString('en-IN');
const findService = id => serviceList.find(item => item.id === id);
const findArtist = id => stylistList.find(item => item.id === id);
const catName = id => serviceCategories.find(item => item.id === id).name;
const firstName = name => (name || '').trim().split(' ')[0];
const namesOf = ids => ids.map(id => findService(id).name).join(' + ');
const catIcons = { hair: 'scissors', makeup: 'lipstick', skin: 'drop', nails: 'polish', mehendi: 'leaf' };
const ratings = { riya: ['4.9', 214], naina: ['4.8', 167], simran: ['4.9', 188], pooja: ['5.0', 96] };

const studioPhone = '918791272440';
const rewardPercent = 25;

function durationText(mins) {
  const hrs = Math.floor(mins / 60);
  const rest = mins % 60;
  if (hrs === 0) return `${mins} min`;
  return rest === 0 ? `${hrs} hr` : `${hrs} hr ${rest} min`;
}

function priceOf(service) {
  return service.offer ? Math.round(service.price * (1 - service.offer / 100)) : service.price;
}

function priceHtml(service) {
  return (service.from ? '<small>from</small> ' : '') +
    (service.offer ? `<del>${money(service.price)}</del> ` : '') +
    `<b>${money(priceOf(service))}</b>`;
}

function initials(name) {
  return (name || '?').trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function prettyPhone(digits) {
  return digits ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : '';
}

function cleanPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  return digits;
}

const phoneOk = digits => /^[6-9]\d{9}$/.test(digits);

/* ---------- storage ---------- */

const keys = {
  cart: 'aainaBooking',
  bookings: 'aainaBookings',
  last: 'aainaLastBooking',
  wishlist: 'aainaWishlist',
  profile: 'aainaProfile'
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* private mode */ }
}

/* ---------- dates ---------- */

// opening hours by weekday (0 = Sunday), same as the website
const hours = { 0: [11, 18], 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 20] };

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function fromKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function timeLabel(time) {
  const [h, m] = time.split(':').map(Number);
  return (h % 12 || 12) + (m ? ':' + String(m).padStart(2, '0') : '') + (h >= 12 ? ' PM' : ' AM');
}

function dayLabel(key) {
  if (key === dateKey(new Date())) return 'Today';
  if (key === dateKey(addDays(new Date(), 1))) return 'Tomorrow';
  return fromKey(key).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function longDate(key) {
  return fromKey(key).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
}

function startsAt(booking) {
  const [h, m] = booking.time.split(':').map(Number);
  const date = fromKey(booking.date);
  date.setHours(h, m);
  return date;
}

function openStatus() {
  const now = new Date();
  const time = now.getHours() + now.getMinutes() / 60;
  const [opens, closes] = hours[now.getDay()];
  const fmt = h => (h % 12 || 12) + (h >= 12 ? ' PM' : ' AM');
  if (time >= opens && time < closes) return { open: true, text: `Open now · Closes ${fmt(closes)}` };
  if (time < opens) return { open: false, text: `Closed · Opens today ${fmt(opens)}` };
  return { open: false, text: `Closed · Opens tomorrow ${fmt(hours[(now.getDay() + 1) % 7][0])}` };
}

/* ---------- state ---------- */

const defaultProfile = {
  name: 'Ananya Sharma',
  phone: '9811024680',
  email: 'ananya.sharma@example.com',
  birthday: '',
  loggedIn: false,
  reminders: true,
  offers: true,
  artist: 'any',
  notesSeen: false
};

let profile, wishlist, cart, bookings;

function seedBookings() {
  const today = new Date();
  const make = (id, services, stylist, days, time) => ({
    id, name: profile.name, phone: profile.phone, notes: '',
    services, combo: null, stylist,
    date: dateKey(addDays(today, days)), time,
    mins: services.reduce((sum, item) => sum + findService(item).mins, 0),
    total: services.reduce((sum, item) => sum + priceOf(findService(item)), 0),
    discount: 0, status: 'confirmed', rescheduled: false
  });
  return [
    make('AAI-4821', ['hair-spa'], 'riya', 1, '16:00'),
    make('AAI-3967', ['glow-facial', 'face-threading'], 'simran', -19, '12:30'),
    make('AAI-3310', ['party-makeup'], 'naina', -54, '18:00')
  ];
}

function loadState() {
  profile = { ...defaultProfile, ...load(keys.profile, {}) };
  wishlist = load(keys.wishlist, []).filter(findService);
  cart = load(keys.cart, { services: [], combo: null });
  cart.services = (cart.services || []).filter(findService);

  bookings = load(keys.bookings, []);
  if (!Array.isArray(bookings)) bookings = [];
  bookings = bookings.filter(item => item.services && item.services.every(findService));
  if (bookings.length === 0) {
    bookings = seedBookings();
    save(keys.bookings, bookings);
  }
}

const saveProfile = () => save(keys.profile, profile);
const saveCart = () => save(keys.cart, cart);
const saveBookings = () => save(keys.bookings, bookings);

// same shape as the website: status is 'confirmed' or 'cancelled', the date decides past or upcoming
function stateOf(item) {
  if (item.status === 'cancelled') return 'cancelled';
  return startsAt(item) < new Date() ? 'done' : 'upcoming';
}

const upcoming = () => bookings.filter(item => stateOf(item) === 'upcoming').sort((a, b) => startsAt(a) - startsAt(b));
const past = () => bookings.filter(item => stateOf(item) !== 'upcoming').sort((a, b) => startsAt(b) - startsAt(a));
const visits = () => bookings.filter(item => stateOf(item) === 'done').length;
const stamps = () => visits() % 6;
const rewardReady = () => stamps() === 5;

function bill(ids, comboId) {
  const items = ids.map(findService);
  const subtotal = items.reduce((sum, item) => sum + priceOf(item), 0);
  const mins = items.reduce((sum, item) => sum + item.mins, 0);
  const combo = comboList.find(item => item.id === comboId && item.ids.every(id => ids.includes(id)));
  const comboOff = combo ? Math.round(combo.ids.reduce((sum, id) => sum + findService(id).price, 0) * combo.percent / 100) : 0;
  const reward = rewardReady() ? Math.round((subtotal - comboOff) * rewardPercent / 100) : 0;
  return { items, subtotal, mins, combo, comboOff, reward, total: subtotal - comboOff - reward };
}

function newBookingId() {
  let id;
  do { id = 'AAI-' + Math.floor(1000 + Math.random() * 9000); } while (bookings.some(item => item.id === id));
  return id;
}

/* ---------- slots ---------- */

function slotsFor(key, artist, length = 30) {
  const date = fromKey(key);
  const [opens, closes] = hours[date.getDay()];
  const soonest = Date.now() + 60 * 60000;
  const list = [];

  // the service has to finish before closing time
  for (let mins = opens * 60; mins + length <= closes * 60; mins += 30) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const at = new Date(date);
    at.setHours(h, m);
    // a few slots look taken so the grid feels real
    const seed = (date.getDate() * 7 + mins / 30 * 3 + (artist || 'any').length) % 9;
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const yours = bookings.some(item => item.status === 'confirmed' && item.date === key && item.time === time && (!resched || item.id !== resched.id));
    list.push({ time, taken: at.getTime() < soonest || seed === 0 || seed === 4 || yours });
  }
  return list;
}

function firstFreeDate(artist, length) {
  for (let i = 0; i < 14; i++) {
    const key = dateKey(addDays(new Date(), i));
    if (slotsFor(key, artist, length).some(slot => !slot.taken)) return key;
  }
  return dateKey(new Date());
}

function pickerHtml(pick) {
  const days = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const strip = days.map((day, i) => {
    const key = dateKey(day);
    const free = slotsFor(key, pick.artist, pick.length).some(slot => !slot.taken);
    return `
      <button class="day ${key === pick.date ? 'active' : ''}" data-date="${key}" ${free ? '' : 'disabled'}>
        <small>${i === 0 ? 'Today' : day.toLocaleDateString('en-IN', { weekday: 'short' })}</small>
        <b>${day.getDate()}</b>
        <small>${day.toLocaleDateString('en-IN', { month: 'short' })}</small>
      </button>`;
  }).join('');

  const slots = slotsFor(pick.date, pick.artist, pick.length);
  const groups = [
    ['Morning', slots.filter(slot => slot.time < '12:00')],
    ['Afternoon', slots.filter(slot => slot.time >= '12:00' && slot.time < '17:00')],
    ['Evening', slots.filter(slot => slot.time >= '17:00')]
  ].filter(([, list]) => list.length);

  const grid = groups.map(([title, list]) => `
    <h4 class="slot-title">${title}</h4>
    <div class="slots">
      ${list.map(slot => `<button class="slot ${slot.time === pick.time ? 'active' : ''}" data-time="${slot.time}" ${slot.taken ? 'disabled' : ''}>${timeLabel(slot.time)}</button>`).join('')}
    </div>`).join('');

  return `
    <div class="days h-scroll">${strip}</div>
    <p class="picked-day">${longDate(pick.date)}</p>
    ${grid}`;
}

/* ---------- elements + screen state ---------- */

const phone = document.querySelector('#appFrame');
const view = document.querySelector('#view');
const tabbar = document.querySelector('#tabbar');
const sheet = document.querySelector('#sheet');
const backdrop = document.querySelector('#backdrop');
const busy = document.querySelector('#busy');
const toastBox = document.querySelector('#toast');

const tabs = ['home', 'services', 'bookings', 'profile'];
let screen = 'home';
let svcCat = 'all';
let svcQuery = '';
let bookingsTab = 'upcoming';
let flow = null;
let resched = null;
let loginInfo = { name: '', phone: '' };
let freshNotes = false;
let toastTimer;

function showToast(message) {
  toastBox.textContent = message;
  toastBox.classList.toggle('lift', !tabbar.hidden);
  toastBox.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastBox.classList.remove('show'), 2800);
}

function go(name) {
  screen = name;
  closeSheet();
  history.replaceState(null, '', '#' + name);
  render();
  view.scrollTop = 0;
  view.classList.remove('enter');
  void view.offsetWidth;
  view.classList.add('enter');
}

function render() {
  const top = view.scrollTop;
  view.innerHTML = screens[screen]();
  view.dataset.screen = screen;
  view.scrollTop = top;

  tabbar.hidden = !tabs.includes(screen);
  tabbar.querySelectorAll('[data-go]').forEach(button => {
    button.classList.toggle('active', button.dataset.go === screen);
  });
  const badge = document.querySelector('#bookBadge');
  badge.hidden = upcoming().length === 0;
  badge.textContent = upcoming().length;
}

/* ---------- sheet ---------- */

function openSheet(html) {
  sheet.innerHTML = `<div class="grab"></div><button class="sheet-close" data-close-sheet aria-label="Close">${icon('close')}</button>${html}`;
  sheet.scrollTop = 0;
  sheet.classList.add('open');
  backdrop.classList.add('show');
}

function closeSheet() {
  sheet.classList.remove('open');
  backdrop.classList.remove('show');
  resched = null;
}

/* ---------- notifications ---------- */

function notifications() {
  const list = [];
  const today = fromKey(dateKey(new Date()));

  upcoming().forEach(item => {
    const days = Math.round((fromKey(item.date) - today) / 86400000);
    if (days > 2) return;
    list.push({
      icon: 'clock', when: 'Reminder', go: 'bookings',
      title: `${dayLabel(item.date)} ${timeLabel(item.time)}, ${namesOf(item.services)} with ${firstName(findArtist(item.stylist)?.name) || 'your artist'}`,
      text: 'Please come 10 minutes early. Need to move it? Tap to reschedule.'
    });
  });

  const last = upcoming().find(item => item.id === load(keys.last, ''));
  if (last) {
    list.push({
      icon: 'check', when: 'Booking', go: 'bookings',
      title: `Booking confirmed, ${last.id}`,
      text: `${namesOf(last.services)} on ${dayLabel(last.date)} at ${timeLabel(last.time)}.`
    });
  }

  serviceList.filter(item => item.offer).forEach(item => {
    list.push({ icon: 'sparkle', when: '2h ago', quick: item.id, title: `Festive offer: ${item.name} ${item.offer}% off`, text: 'This month only. Tap to book a slot.' });
  });

  list.push({
    icon: 'gift', when: 'Yesterday', go: 'home',
    title: rewardReady() ? `Your next visit is ${rewardPercent}% off` : `${stamps()} of 5 stamps collected`,
    text: rewardReady() ? 'The discount is added at checkout automatically.' : `${5 - stamps()} more visits and your 6th one is ${rewardPercent}% off.`
  });

  const lastDone = past().find(item => stateOf(item) === 'done');
  if (lastDone) {
    list.push({
      icon: 'star', when: '3 days ago', rate: lastDone.id,
      title: `How was your ${findService(lastDone.services[0]).name}?`,
      text: `Rate your visit with ${firstName(findArtist(lastDone.stylist)?.name) || 'us'}. It takes 10 seconds.`
    });
  }
  return list;
}

/* ---------- screens ---------- */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function serviceIcon(service) {
  return `<span class="svc-ic ${service.cat}">${icon(catIcons[service.cat])}</span>`;
}

function homeScreen() {
  const next = upcoming()[0];
  const status = openStatus();
  const unread = !profile.notesSeen && notifications().length > 0;
  const lastDone = past().find(item => stateOf(item) === 'done');
  const popular = serviceList.filter(item => item.tag === 'Popular');
  const count = stamps();

  const nextCard = next ? `
    <article class="next-card">
      <div class="nc-top"><span>Next appointment</span><span>${next.id}</span></div>
      <h2>${namesOf(next.services)}</h2>
      <p class="nc-with">with ${findArtist(next.stylist)?.name || 'any available artist'}</p>
      <div class="nc-when">
        <span>${icon('calendar')} ${dayLabel(next.date)}, ${fromKey(next.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span>${icon('clock')} ${timeLabel(next.time)}</span>
      </div>
      <div class="nc-actions">
        <button class="btn btn-gold btn-sm" data-reschedule="${next.id}">Reschedule</button>
        <a class="btn btn-glass btn-sm" href="https://maps.google.com/?q=Aaina+Beauty+Studio" target="_blank" rel="noopener">${icon('pin')} Directions</a>
      </div>
      <svg class="nc-mandala" aria-hidden="true"><use href="#mandala"/></svg>
    </article>` : `
    <article class="next-card empty">
      <div class="nc-top"><span>No appointments yet</span></div>
      <h2>Treat yourself this week</h2>
      <p class="nc-with">Pick a service and a time that suits you.</p>
      <div class="nc-actions"><button class="btn btn-gold btn-sm" data-go="services">Book a service</button></div>
      <svg class="nc-mandala" aria-hidden="true"><use href="#mandala"/></svg>
    </article>`;

  const rebook = lastDone ? `
    <button class="quick rebook" data-rebook="${lastDone.id}">
      <span class="svc-ic">${icon('repeat')}</span>
      <b>Rebook</b><small>${findService(lastDone.services[0]).name}</small>
    </button>` : '';

  const quick = popular.map(item => `
    <button class="quick" data-quick="${item.id}">
      ${serviceIcon(item)}
      <b>${item.name}</b><small>${money(priceOf(item))} · ${durationText(item.mins)}</small>
    </button>`).join('');

  const offers = serviceList.filter(item => item.offer).map(item => `
    <article class="offer wine">
      <span class="offer-tag">${item.offer}% off</span>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="offer-foot">
        <span><del>${money(item.price)}</del> <b>${money(priceOf(item))}</b></span>
        <button class="btn btn-gold btn-xs" data-quick="${item.id}">Book</button>
      </div>
      <svg class="offer-mandala" aria-hidden="true"><use href="#mandala"/></svg>
    </article>`).join('') + comboList.map(combo => {
      const base = combo.ids.reduce((sum, id) => sum + findService(id).price, 0);
      return `
        <article class="offer">
          <span class="offer-tag">Save ${combo.percent}%</span>
          <h3>${combo.name}</h3>
          <p>${combo.blurb}</p>
          <div class="offer-foot">
            <span><del>${money(base)}</del> <b>${money(base - Math.round(base * combo.percent / 100))}</b></span>
            <button class="btn btn-wine btn-xs" data-combo="${combo.id}">Book</button>
          </div>
        </article>`;
    }).join('');

  const stampDots = Array.from({ length: 5 }, (_, i) => `<span class="stamp ${i < count ? 'on' : ''}">${i < count ? 'A' : i + 1}</span>`).join('');

  return `
    <header class="home-top">
      <div class="logo">
        <span class="logo-mark">A</span>
        <span class="logo-text"><span class="logo-name">AAINA</span><span class="logo-sub">Beauty Studio</span></span>
      </div>
      <button class="round-btn" data-go="notifications" aria-label="Notifications">${icon('bell')}${unread ? '<i class="dot"></i>' : ''}</button>
    </header>

    <section class="greet">
      <p class="open-line ${status.open ? '' : 'closed'}"><i></i>${status.text}</p>
      <h1>${greeting()},<br><em>${firstName(profile.name) || 'there'}</em></h1>
    </section>

    ${nextCard}

    <section class="block">
      <div class="block-head"><h3>Quick book</h3><button class="link" data-go="services">See all</button></div>
      <div class="h-scroll quick-row">${rebook}${quick}</div>
    </section>

    <section class="block">
      <div class="block-head"><h3>Festive offers</h3><span class="hint">this month</span></div>
      <div class="h-scroll offer-row">${offers}</div>
    </section>

    <section class="block">
      <article class="loyal">
        <div class="loyal-head">
          <div><span class="eyebrow">Aaina Rewards</span><h3>${count} of 5 visits</h3></div>
          <span class="loyal-gift">${icon('gift')}</span>
        </div>
        <div class="stamps">${stampDots}<span class="stamp gift ${count === 5 ? 'ready' : ''}"><b>${rewardPercent}%</b><small>off</small></span></div>
        <p>${count === 5 ? `Your 6th visit is ${rewardPercent}% off. It is added at checkout.` : `${5 - count} more visit${5 - count > 1 ? 's' : ''} and your 6th visit is ${rewardPercent}% off.`}</p>
      </article>
    </section>`;
}

function serviceRow(item) {
  const added = cart.services.includes(item.id);
  const saved = wishlist.includes(item.id);
  const tag = item.offer ? `<span class="mini-tag sale">${item.offer}% off</span>` : item.tag ? `<span class="mini-tag">${item.tag}</span>` : '';
  return `
    <article class="svc ${added ? 'added' : ''}">
      <button class="svc-main" data-details="${item.id}">
        ${serviceIcon(item)}
        <span class="svc-text">
          <b>${item.name}</b>
          <small>${durationText(item.mins)} ${tag}</small>
          <span class="price">${priceHtml(item)}</span>
        </span>
      </button>
      <div class="svc-side">
        <button class="heart ${saved ? 'saved' : ''}" data-heart="${item.id}" aria-pressed="${saved}" aria-label="Save ${item.name}">${icon('heart')}</button>
        ${item.bridal
          ? '<a class="add bridal" href="../bridal.html#mehendi" aria-label="See bridal packages">' + icon('arrow') + '</a>'
          : `<button class="add" data-add="${item.id}" aria-pressed="${added}" aria-label="${added ? 'Remove' : 'Add'} ${item.name}">${icon(added ? 'tick' : 'plus')}</button>`}
      </div>
    </article>`;
}

function serviceListHtml() {
  const query = svcQuery.trim().toLowerCase();
  const list = serviceList.filter(item => {
    if (svcCat === 'saved' && !wishlist.includes(item.id)) return false;
    if (svcCat !== 'all' && svcCat !== 'saved' && item.cat !== svcCat) return false;
    return !query || `${item.name} ${item.desc} ${catName(item.cat)}`.toLowerCase().includes(query);
  });

  if (list.length === 0) {
    return svcCat === 'saved' && !query
      ? '<div class="empty"><h3>Nothing saved yet</h3><p>Tap the heart on any service to keep it here.</p></div>'
      : `<div class="empty"><h3>No services found</h3><p>Try a different word, like "facial" or "wax".</p></div>`;
  }
  return list.map(serviceRow).join('');
}

function chipsHtml() {
  const chips = [{ id: 'all', name: 'All' }, ...serviceCategories, { id: 'saved', name: 'Saved' }];
  return chips.map(chip => `
    <button class="chip ${chip.id === svcCat ? 'active' : ''}" data-cat="${chip.id}">
      ${chip.id === 'saved' ? icon('heart') : ''}${chip.name}${chip.id === 'saved' && wishlist.length ? ` <span>${wishlist.length}</span>` : ''}
    </button>`).join('');
}

function cartBarHtml() {
  if (cart.services.length === 0) return '';
  const sum = bill(cart.services, cart.combo);
  return `
    <div class="cart-bar">
      <div><b>${cart.services.length} service${cart.services.length > 1 ? 's' : ''} · ${money(sum.total)}</b><span>about ${durationText(sum.mins)}</span></div>
      <button class="btn btn-gold btn-sm" data-book-cart>Book now ${icon('arrow')}</button>
    </div>`;
}

function servicesScreen() {
  return `
    <header class="page-head">
      <h1>Services</h1>
      <p><em>Hair, makeup, skin, nails and mehendi</em></p>
    </header>
    <label class="search">
      ${icon('search')}
      <input type="search" id="svcSearch" placeholder="Search facial, wax, balayage…" value="${svcQuery.replace(/"/g, '&quot;')}" autocomplete="off">
    </label>
    <div class="h-scroll chips" id="svcChips">${chipsHtml()}</div>
    <div class="svc-list" id="svcList">${serviceListHtml()}</div>
    <div class="cart-slot" id="cartSlot">${cartBarHtml()}</div>`;
}

function refreshServices() {
  if (screen !== 'services') return;
  document.querySelector('#svcList').innerHTML = serviceListHtml();
  document.querySelector('#svcChips').innerHTML = chipsHtml();
  document.querySelector('#cartSlot').innerHTML = cartBarHtml();
}

function bookingCard(item) {
  const date = fromKey(item.date);
  const artist = findArtist(item.stylist);
  const state = stateOf(item);
  const labels = { upcoming: item.rescheduled ? 'Rescheduled' : 'Confirmed', done: 'Completed', cancelled: 'Cancelled' };
  const actions = state === 'upcoming'
    ? `<button class="btn btn-line btn-xs" data-reschedule="${item.id}">Reschedule</button>
       <button class="btn btn-text btn-xs" data-cancel="${item.id}">Cancel</button>`
    : `<button class="btn btn-wine btn-xs" data-rebook="${item.id}">${icon('repeat')} Rebook</button>`;

  return `
    <article class="bk is-${state}">
      <div class="bk-date"><small>${date.toLocaleDateString('en-IN', { weekday: 'short' })}</small><b>${date.getDate()}</b><small>${date.toLocaleDateString('en-IN', { month: 'short' })}</small></div>
      <div class="bk-info">
        <span class="status is-${state}">${labels[state]}</span>
        <h3>${namesOf(item.services)}</h3>
        <p>${timeLabel(item.time)} · ${artist ? 'with ' + firstName(artist.name) : 'any artist'}</p>
        <p class="bk-meta">${item.id} · ${money(item.total)}</p>
        <div class="bk-actions">${actions}</div>
      </div>
    </article>`;
}

function bookingsScreen() {
  const list = bookingsTab === 'upcoming' ? upcoming() : past();
  const empty = bookingsTab === 'upcoming'
    ? '<div class="empty"><h3>No upcoming visits</h3><p>Your next appointment will show up here.</p><button class="btn btn-wine btn-sm" data-go="services">Book a service</button></div>'
    : '<div class="empty"><h3>No past visits yet</h3><p>Completed and cancelled visits show up here.</p></div>';

  return `
    <header class="page-head">
      <h1>Bookings</h1>
      <p><em>${visits()} visit${visits() === 1 ? '' : 's'} with Aaina so far</em></p>
    </header>
    <div class="seg">
      <button class="${bookingsTab === 'upcoming' ? 'active' : ''}" data-seg="upcoming">Upcoming <span>${upcoming().length}</span></button>
      <button class="${bookingsTab === 'past' ? 'active' : ''}" data-seg="past">Past <span>${past().length}</span></button>
    </div>
    <div class="bk-list">${list.length ? list.map(bookingCard).join('') : empty}</div>`;
}

const faqs = [
  ['How early should I come in?', 'Please arrive 10 minutes before your slot. If you are running late, message us on WhatsApp and we will try to adjust.'],
  ['Can I reschedule or cancel?', 'Yes, free of charge up to 3 hours before your appointment, right here in Bookings.'],
  ['Do you do a patch test for hair colour?', 'Yes. A free patch test is done 48 hours before any colour service, just walk in for 5 minutes.'],
  ['How do I pay?', 'Cash, UPI or card at the studio after your service. Online payment in this app is a demo.']
];

function referCode() {
  return 'AAINA-' + (firstName(profile.name) || 'FRIEND').toUpperCase() + '200';
}

function profileScreen() {
  const saved = wishlist.map(findService);
  const artistOptions = [{ id: 'any', name: 'No preference' }, ...stylistList]
    .map(artist => `<option value="${artist.id}" ${profile.artist === artist.id ? 'selected' : ''}>${artist.name}</option>`).join('');
  const shareText = `Hey! Book at Aaina Beauty Studio with my code ${referCode()} and get ₹200 off your first visit.`;

  return `
    <header class="profile-top">
      <span class="avatar">${initials(profile.name)}</span>
      <div>
        <h1>${profile.name}</h1>
        <p>${prettyPhone(profile.phone)}</p>
      </div>
      <button class="round-btn" data-edit-profile aria-label="Edit details">${icon('edit')}</button>
    </header>

    <div class="stats">
      <div><b>${visits()}</b><span>Visits</span></div>
      <div><b>${stamps()}/5</b><span>Stamps</span></div>
      <div><b>${wishlist.length}</b><span>Saved</span></div>
    </div>

    <section class="group">
      <div class="group-head"><h4>My details</h4><button class="link" data-edit-profile>Edit</button></div>
      <div class="rows">
        <div class="row"><span>Name</span><b>${profile.name}</b></div>
        <div class="row"><span>Mobile</span><b>${prettyPhone(profile.phone)}</b></div>
        <div class="row"><span>Email</span><b>${profile.email || 'Add email'}</b></div>
        <div class="row"><span>Birthday</span><b>${profile.birthday ? fromKey(profile.birthday).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) : 'Add for a birthday treat'}</b></div>
      </div>
    </section>

    <section class="group">
      <h4>Preferences</h4>
      <div class="rows">
        <label class="row toggle"><span>Appointment reminders<small>A day before and 2 hours before</small></span>
          <input type="checkbox" data-pref="reminders" ${profile.reminders ? 'checked' : ''}><i></i></label>
        <label class="row toggle"><span>Offers on WhatsApp<small>Festive offers, at most twice a month</small></span>
          <input type="checkbox" data-pref="offers" ${profile.offers ? 'checked' : ''}><i></i></label>
        <label class="row"><span>Favourite artist</span>
          <select data-pref="artist">${artistOptions}</select></label>
      </div>
    </section>

    <section class="group">
      <div class="group-head"><h4>Saved services</h4>${saved.length ? `<button class="link" data-go-saved>See all</button>` : ''}</div>
      ${saved.length ? `<div class="saved-list">${saved.map(item => `
        <div class="saved">
          ${serviceIcon(item)}
          <div><b>${item.name}</b><small>${money(priceOf(item))} · ${durationText(item.mins)}</small></div>
          ${item.bridal ? '' : `<button class="btn btn-line btn-xs" data-quick="${item.id}">Book</button>`}
          <button class="heart saved" data-heart="${item.id}" aria-label="Remove ${item.name}">${icon('heart')}</button>
        </div>`).join('')}</div>`
        : '<p class="muted-line">Tap the heart on any service to save it here.</p>'}
    </section>

    <section class="refer">
      <span class="eyebrow">Refer a friend</span>
      <h3>Give ₹200, get ₹200</h3>
      <p>Your friend gets ₹200 off their first visit. You get ₹200 off your next one.</p>
      <div class="code-box">
        <b>${referCode()}</b>
        <button class="btn btn-gold btn-xs" data-copy="${referCode()}">${icon('copy')} Copy</button>
      </div>
      <a class="btn btn-glass btn-sm wide" href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener">${icon('whatsapp')} Share on WhatsApp</a>
    </section>

    <section class="group">
      <h4>Help and support</h4>
      <div class="support">
        <a class="btn btn-wine btn-sm" href="https://wa.me/${studioPhone}?text=${encodeURIComponent('Hi Aaina Beauty Studio, I need help with my booking.')}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>
        <a class="btn btn-line btn-sm" href="tel:+${studioPhone}">${icon('phone')} Call us</a>
      </div>
      <div class="faqs">
        ${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
      </div>
    </section>

    <button class="logout" data-logout>${icon('logout')} Log out</button>
    <button class="reset" data-reset>Reset demo data</button>
    <p class="version">Aaina app · demo v1.0</p>`;
}

function notificationsScreen() {
  const list = notifications();
  return `
    <header class="bar-head">
      <button class="round-btn" data-go="home" aria-label="Back">${icon('chevron-left')}</button>
      <h2>Notifications</h2>
      <span class="spacer"></span>
    </header>
    <div class="notes">
      ${list.map((note, i) => `
        <button class="note ${i < 2 && freshNotes ? 'unread' : ''}" data-note="${i}">
          <span class="note-ic">${icon(note.icon)}</span>
          <span class="note-text"><b>${note.title}</b><span>${note.text}</span><small>${note.when}</small></span>
        </button>`).join('')}
    </div>`;
}

/* ---------- booking flow ---------- */

const steps = ['services', 'artist', 'time', 'details', 'payment'];
const stepTitles = {
  services: 'Your services',
  artist: 'Choose your artist',
  time: 'Pick a date and time',
  details: 'Your details',
  payment: 'Review and pay',
  done: 'Booked'
};

function startBooking(ids, options = {}) {
  const cats = ids.map(id => findService(id).cat);
  const fav = findArtist(profile.artist);
  const artist = options.artist || (fav && cats.some(cat => fav.cats.includes(cat)) ? fav.id : null);
  flow = {
    step: options.step || 'services',
    services: [...ids],
    combo: options.combo || null,
    artist,
    date: null,
    time: null,
    name: profile.name,
    phone: profile.phone,
    notes: '',
    pay: 'studio',
    addCat: cats[0] || 'hair',
    errors: {},
    from: screen
  };
  if (flow.services.length === 0) flow.step = 'services';
  go('book');
}

function artistsFor(ids) {
  const cats = ids.map(id => findService(id).cat);
  return stylistList.filter(artist => cats.some(cat => artist.cats.includes(cat)));
}

function stepReady() {
  if (flow.step === 'services') return flow.services.length > 0;
  if (flow.step === 'artist') return Boolean(flow.artist);
  if (flow.step === 'time') return Boolean(flow.time);
  return true;
}

function flowBody() {
  const sum = bill(flow.services, flow.combo);

  if (flow.step === 'services') {
    const picked = flow.services.map(findService);
    const others = serviceList.filter(item => item.cat === flow.addCat && !item.bridal);
    return `
      ${picked.length ? `<div class="picked">${picked.map(item => `
        <div class="picked-row">
          ${serviceIcon(item)}
          <div><b>${item.name}</b><small>${durationText(item.mins)} · ${money(priceOf(item))}</small></div>
          <button class="round-btn sm" data-flow-remove="${item.id}" aria-label="Remove ${item.name}">${icon('trash')}</button>
        </div>`).join('')}</div>` : '<p class="muted-line">Pick at least one service to continue.</p>'}
      <h4 class="sub-title">Add more</h4>
      <div class="h-scroll chips">${serviceCategories.map(cat => `<button class="chip ${cat.id === flow.addCat ? 'active' : ''}" data-flow-cat="${cat.id}">${cat.name}</button>`).join('')}</div>
      <div class="add-list">${others.map(item => {
        const on = flow.services.includes(item.id);
        return `<button class="add-row ${on ? 'on' : ''}" data-flow-toggle="${item.id}">
          <span><b>${item.name}</b><small>${durationText(item.mins)}</small></span>
          <span class="price">${priceHtml(item)}</span>
          <span class="tick">${icon(on ? 'tick' : 'plus')}</span>
        </button>`;
      }).join('')}</div>`;
  }

  if (flow.step === 'artist') {
    const list = artistsFor(flow.services);
    const card = (id, name, role, extra) => `
      <button class="artist ${flow.artist === id ? 'active' : ''}" data-artist="${id}">
        <span class="avatar ${id === 'any' ? 'any' : ''}">${id === 'any' ? icon('sparkle') : initials(name)}</span>
        <span class="artist-text"><b>${name}</b><small>${role}</small>${extra}</span>
        <span class="radio"></span>
      </button>`;
    return `
      <p class="step-note">For ${namesOf(flow.services)}</p>
      ${card('any', 'Any available artist', 'We pick whoever is free at your time', '<em>Most slots</em>')}
      ${list.map(artist => card(artist.id, artist.name, artist.role,
        `<span class="rating">${icon('star')} ${ratings[artist.id][0]} <span>(${ratings[artist.id][1]})</span>${profile.artist === artist.id ? ' · Your favourite' : ''}</span>`)).join('')}`;
  }

  if (flow.step === 'time') {
    flow.length = sum.mins;
    const free = flow.date && slotsFor(flow.date, flow.artist, flow.length).some(slot => !slot.taken);
    if (!free) flow.date = firstFreeDate(flow.artist, flow.length);
    return `<p class="step-note">About ${durationText(sum.mins)} with ${flow.artist === 'any' ? 'any available artist' : firstName(findArtist(flow.artist).name)}</p>${pickerHtml(flow)}`;
  }

  if (flow.step === 'details') {
    const err = flow.errors;
    return `
      <div class="form">
        <label class="field ${err.name ? 'invalid' : ''}"><span>Full name</span>
          <input data-field="name" value="${flow.name.replace(/"/g, '&quot;')}" autocomplete="name"><em>Please enter your name.</em></label>
        <label class="field ${err.phone ? 'invalid' : ''}"><span>Mobile number</span>
          <div class="phone-input"><i>+91</i><input data-field="phone" inputmode="numeric" maxlength="11" value="${flow.phone}" autocomplete="tel-national"></div>
          <em>Enter a valid 10-digit mobile number.</em></label>
        <label class="field"><span>Anything we should know? <small>(optional)</small></span>
          <textarea data-field="notes" rows="3" placeholder="Allergies, a reference look, hair length…">${flow.notes}</textarea></label>
      </div>
      <div class="when-card">
        ${icon('calendar')}
        <div><b>${longDate(flow.date)}, ${timeLabel(flow.time)}</b><small>${namesOf(flow.services)}</small></div>
        <button class="link" data-flow-step="time">Change</button>
      </div>`;
  }

  if (flow.step === 'payment') {
    const methods = [
      ['studio', 'store', 'Pay at the studio', 'Cash, UPI or card after your visit'],
      ['upi', 'upi', 'UPI', 'GPay, PhonePe, Paytm'],
      ['card', 'card', 'Debit or credit card', 'Visa, Mastercard, RuPay']
    ];
    return `
      <div class="bill">
        ${sum.items.map(item => `<div><span>${item.name}</span><span>${money(priceOf(item))}</span></div>`).join('')}
        ${sum.combo ? `<div class="minus"><span>${sum.combo.name} combo, ${sum.combo.percent}% off</span><span>-${money(sum.comboOff)}</span></div>` : ''}
        ${sum.reward ? `<div class="minus"><span>Rewards, 6th visit ${rewardPercent}% off</span><span>-${money(sum.reward)}</span></div>` : ''}
        <div class="grand"><span>Total</span><span>${money(sum.total)}</span></div>
      </div>
      <div class="when-card">
        ${icon('calendar')}
        <div><b>${longDate(flow.date)}, ${timeLabel(flow.time)}</b><small>${flow.artist === 'any' ? 'Any available artist' : findArtist(flow.artist).name} · ${flow.name}</small></div>
        <button class="link" data-flow-step="time">Change</button>
      </div>
      <h4 class="sub-title">Payment</h4>
      <div class="pay-list">${methods.map(([id, ic, title, text]) => `
        <button class="pay ${flow.pay === id ? 'active' : ''}" data-pay="${id}">
          <span class="pay-ic">${icon(ic)}</span>
          <span><b>${title}</b><small>${text}</small></span>
          <span class="radio"></span>
        </button>`).join('')}</div>
      <p class="demo-line">${icon('sparkle')} Demo app. No payment is taken and no OTP is sent.</p>`;
  }
  return '';
}

function doneScreen() {
  const item = flow.done;
  const artist = findArtist(item.stylist);
  const payText = { studio: 'Pay at the studio', upi: 'Paid by UPI (demo)', card: 'Paid by card (demo)' };
  return `
    <div class="done">
      <div class="done-badge"><svg class="done-mandala" aria-hidden="true"><use href="#mandala"/></svg>${icon('tick')}</div>
      <h1>You are booked,<br><em>${firstName(item.name)}</em></h1>
      <p>We have sent the details to <span class="nowrap">${prettyPhone(item.phone)}</span> on WhatsApp.</p>
      <div class="ticket">
        <div class="ticket-id"><span>Booking ID</span><b>${item.id}</b></div>
        <div class="ticket-rows">
          <div><span>Services</span><b>${namesOf(item.services)}</b></div>
          <div><span>Artist</span><b>${artist ? artist.name : 'Any available artist'}</b></div>
          <div><span>When</span><b>${longDate(item.date)}, ${timeLabel(item.time)}</b></div>
          <div><span>Total</span><b>${money(item.total)}</b></div>
          <div><span>Payment</span><b>${payText[item.pay]}</b></div>
        </div>
      </div>
      <button class="btn btn-wine wide" data-go="bookings">View my bookings</button>
      <button class="btn btn-line wide" data-calendar>${icon('calendar')} Add to calendar</button>
      <button class="link" data-go="home">Back to home</button>
    </div>`;
}

function bookScreen() {
  if (!flow) return homeScreen();
  if (flow.step === 'done') return doneScreen();

  const index = steps.indexOf(flow.step);
  const sum = bill(flow.services, flow.combo);
  const next = flow.step === 'payment' ? (flow.pay === 'studio' ? 'Confirm booking' : `Pay ${money(sum.total)}`) : 'Continue';

  return `
    <header class="bar-head">
      <button class="round-btn" data-flow-back aria-label="Back">${icon('chevron-left')}</button>
      <div class="bar-title"><small>Step ${index + 1} of ${steps.length}</small><h2>${stepTitles[flow.step]}</h2></div>
      <button class="round-btn" data-flow-close aria-label="Close">${icon('close')}</button>
    </header>
    <div class="progress"><i style="width:${(index + 1) / steps.length * 100}%"></i></div>
    <div class="flow-body">${flowBody()}</div>
    <footer class="flow-foot">
      <div><b>${money(sum.total)}</b><span>${flow.services.length} service${flow.services.length === 1 ? '' : 's'} · ${durationText(sum.mins)}</span></div>
      <button class="btn btn-wine" data-flow-next ${stepReady() ? '' : 'disabled'}>${next}</button>
    </footer>`;
}

function flowNext() {
  if (!stepReady()) return;

  if (flow.step === 'details') {
    flow.phone = cleanPhone(flow.phone);
    flow.errors = { name: flow.name.trim().length < 2, phone: !phoneOk(flow.phone) };
    if (flow.errors.name || flow.errors.phone) {
      render();
      return;
    }
  }

  if (flow.step === 'payment') {
    busy.querySelector('p').textContent = flow.pay === 'studio' ? 'Confirming your booking…' : 'Processing demo payment…';
    busy.hidden = false;
    setTimeout(() => {
      confirmBooking();
      busy.hidden = true;
      go('book');
    }, 1300);
    return;
  }

  flow.step = steps[steps.indexOf(flow.step) + 1];
  go('book');
}

function flowBack() {
  const index = steps.indexOf(flow.step);
  if (index <= 0) {
    go(tabs.includes(flow.from) ? flow.from : 'home');
    return;
  }
  flow.step = steps[index - 1];
  go('book');
}

function confirmBooking() {
  const sum = bill(flow.services, flow.combo);
  const item = {
    id: newBookingId(),
    name: flow.name.trim(),
    phone: flow.phone,
    notes: flow.notes.trim(),
    services: [...flow.services],
    combo: sum.combo ? sum.combo.id : null,
    stylist: flow.artist,
    date: flow.date,
    time: flow.time,
    mins: sum.mins,
    total: sum.total,
    discount: sum.comboOff + sum.reward,
    status: 'confirmed',
    rescheduled: false,
    pay: flow.pay
  };
  bookings.push(item);
  saveBookings();
  save(keys.last, item.id);

  cart = { services: [], combo: null };
  saveCart();

  profile.notesSeen = false;
  saveProfile();

  flow.done = item;
  flow.step = 'done';
}

/* ---------- login (demo) ---------- */

function loginScreen() {
  return `
    <div class="login">
      <div class="login-art">
        <svg class="login-mandala" aria-hidden="true"><use href="#mandala"/></svg>
        <span class="logo-mark big">A</span>
        <p class="login-brand">AAINA</p>
        <p class="login-sub">Beauty Studio</p>
      </div>
      <div class="login-card">
        <h1>See yourself <em>shine</em></h1>
        <p>Log in to book, reschedule and collect reward stamps.</p>
        <div class="form">
          <label class="field" id="loginNameField"><span>Your name</span>
            <input id="loginName" placeholder="Ananya Sharma" value="${loginInfo.name}" autocomplete="name"><em>Please enter your name.</em></label>
          <label class="field" id="loginPhoneField"><span>Mobile number</span>
            <div class="phone-input"><i>+91</i><input id="loginPhone" inputmode="numeric" maxlength="11" placeholder="98110 24680" value="${loginInfo.phone}" autocomplete="tel-national"></div>
            <em>Enter a valid 10-digit mobile number.</em></label>
        </div>
        <button class="btn btn-wine wide" data-send-otp>Send OTP</button>
        <button class="link" data-skip-login>Skip, explore the demo</button>
        <p class="demo-line">Demo login. No OTP is actually sent.</p>
      </div>
    </div>`;
}

function otpScreen() {
  return `
    <header class="bar-head">
      <button class="round-btn" data-go="login" aria-label="Back">${icon('chevron-left')}</button>
      <span class="spacer"></span>
    </header>
    <div class="otp-page">
      <h1>Enter the <em>code</em></h1>
      <p>We sent a 4-digit code to <b>${prettyPhone(loginInfo.phone)}</b></p>
      <div class="otp" id="otp">
        ${[0, 1, 2, 3].map(i => `<input inputmode="numeric" maxlength="1" aria-label="Digit ${i + 1}">`).join('')}
      </div>
      <p class="demo-line">${icon('sparkle')} Demo: type any 4 digits.</p>
      <button class="btn btn-wine wide" data-verify disabled>Verify and continue</button>
      <button class="link" data-resend>Resend code</button>
    </div>`;
}

/* ---------- sheets ---------- */

function openDetails(id) {
  const item = findService(id);
  const added = cart.services.includes(id);
  const saved = wishlist.includes(id);
  openSheet(`
    <div class="detail">
      <div class="detail-top">${serviceIcon(item)}<span class="eyebrow">${catName(item.cat)}</span></div>
      <h2>${item.name}</h2>
      <p class="lead">${item.desc}</p>
      <div class="meta-row">
        <span>${icon('clock')} ${durationText(item.mins)}</span>
        ${item.tag ? `<span class="mini-tag">${item.tag}</span>` : ''}
        ${item.offer ? `<span class="mini-tag sale">${item.offer}% off</span>` : ''}
      </div>
      <h4>What is included</h4>
      <ul class="inc">${item.includes.map(line => `<li>${icon('tick')} ${line}</li>`).join('')}</ul>
      ${item.note ? `<p class="note-box">${item.note}</p>` : ''}
      <div class="detail-foot">
        <div class="price big">${priceHtml(item)}</div>
        <button class="heart ${saved ? 'saved' : ''}" data-heart="${id}" data-in-sheet aria-label="Save">${icon('heart')}</button>
        ${item.bridal
          ? '<a class="btn btn-wine" href="../bridal.html#mehendi">See bridal</a>'
          : `<button class="btn ${added ? 'btn-line' : 'btn-wine'}" data-add="${id}" data-in-sheet>${icon(added ? 'tick' : 'plus')} ${added ? 'Added' : 'Add to booking'}</button>`}
      </div>
    </div>`);
  sheet.dataset.service = id;
}

function openReschedule(id) {
  const item = bookings.find(booking => booking.id === id);
  const length = bill(item.services).mins;
  resched = resched && resched.id === id ? resched : { id, artist: item.stylist, date: item.date, time: null, length };
  if (!slotsFor(resched.date, resched.artist, length).some(slot => !slot.taken)) resched.date = firstFreeDate(item.stylist, length);
  const keep = { ...resched };
  openSheet(`
    <div class="resched">
      <span class="eyebrow">Reschedule ${item.id}</span>
      <h2>${namesOf(item.services)}</h2>
      <p class="lead">Booked for ${dayLabel(item.date)}, ${timeLabel(item.time)}. Pick a new time.</p>
      ${pickerHtml(keep)}
      <button class="btn btn-wine wide" data-confirm-resched ${keep.time ? '' : 'disabled'}>${keep.time ? `Move to ${dayLabel(keep.date)}, ${timeLabel(keep.time)}` : 'Pick a time'}</button>
    </div>`);
  resched = keep;
}

function openCancel(id) {
  const item = bookings.find(booking => booking.id === id);
  openSheet(`
    <div class="confirm">
      <h2>Cancel this visit?</h2>
      <p class="lead">${namesOf(item.services)} on ${dayLabel(item.date)} at ${timeLabel(item.time)}. Free cancellation up to 3 hours before.</p>
      <button class="btn btn-wine wide" data-close-sheet>Keep my appointment</button>
      <button class="btn btn-text wide danger" data-confirm-cancel="${id}">Yes, cancel it</button>
    </div>`);
}

function openRate(id) {
  const item = bookings.find(booking => booking.id === id);
  openSheet(`
    <div class="confirm">
      <h2>How was it?</h2>
      <p class="lead">${namesOf(item.services)} with ${findArtist(item.stylist)?.name || 'us'}</p>
      <div class="stars">${[1, 2, 3, 4, 5].map(n => `<button data-rate="${n}" aria-label="${n} stars">${icon('star')}</button>`).join('')}</div>
    </div>`);
}

function openEditProfile() {
  openSheet(`
    <form class="form edit-form" id="editForm" novalidate>
      <h2>My details</h2>
      <label class="field"><span>Full name</span><input name="name" value="${profile.name.replace(/"/g, '&quot;')}"><em>Please enter your name.</em></label>
      <label class="field"><span>Mobile number</span><div class="phone-input"><i>+91</i><input name="phone" inputmode="numeric" maxlength="11" value="${profile.phone}"></div><em>Enter a valid 10-digit mobile number.</em></label>
      <label class="field"><span>Email</span><input name="email" type="email" value="${profile.email}"></label>
      <label class="field"><span>Birthday</span><input name="birthday" type="date" value="${profile.birthday}"></label>
      <button class="btn btn-wine wide" type="submit">Save details</button>
    </form>`);
}

function openReset() {
  openSheet(`
    <div class="confirm">
      <h2>Reset the demo?</h2>
      <p class="lead">This clears bookings, saved services, the cart and your login in this browser, then adds fresh demo bookings.</p>
      <button class="btn btn-wine wide" data-confirm-reset>Reset demo data</button>
      <button class="btn btn-text wide" data-close-sheet>Not now</button>
    </div>`);
}

/* ---------- actions ---------- */

function toggleHeart(id) {
  const index = wishlist.indexOf(id);
  if (index === -1) {
    wishlist.push(id);
    showToast(`${findService(id).name} saved.`);
  } else {
    wishlist.splice(index, 1);
  }
  save(keys.wishlist, wishlist);
}

function toggleCart(id) {
  const index = cart.services.indexOf(id);
  if (index === -1) {
    cart.services.push(id);
    showToast(`${findService(id).name} added to your booking.`);
  } else {
    cart.services.splice(index, 1);
    const combo = comboList.find(item => item.id === cart.combo);
    if (combo && !combo.ids.every(item => cart.services.includes(item))) cart.combo = null;
  }
  saveCart();
}

function rebook(id) {
  const item = bookings.find(booking => booking.id === id);
  const ids = item.services.filter(service => !findService(service).bridal);
  startBooking(ids, { artist: item.stylist, step: 'time' });
}

function quickBook(id) {
  startBooking([id], { step: 'artist' });
}

function bookCombo(id) {
  const combo = comboList.find(item => item.id === id);
  cart = { services: [...combo.ids], combo: id };
  saveCart();
  startBooking(combo.ids, { combo: id, step: 'services' });
  showToast(`${combo.name} combo, ${combo.percent}% off applied.`);
}

function finishLogin() {
  profile.loggedIn = true;
  if (loginInfo.name.trim()) profile.name = loginInfo.name.trim();
  if (phoneOk(loginInfo.phone)) profile.phone = loginInfo.phone;
  saveProfile();
  go('home');
  showToast(`Welcome, ${firstName(profile.name)}!`);
}

/* ---------- events ---------- */

phone.addEventListener('click', event => {
  const target = event.target.closest('button, a, [data-note]');
  if (!target || target.disabled) return;
  const data = target.dataset;

  if (data.go) {
    if (data.go === 'notifications') {
      freshNotes = !profile.notesSeen;
      profile.notesSeen = true;
      saveProfile();
    }
    go(data.go);
  }
  else if (data.closeSheet !== undefined) closeSheet();
  else if (data.cat) { svcCat = data.cat; refreshServices(); }
  else if (data.details) openDetails(data.details);
  else if (data.heart) {
    toggleHeart(data.heart);
    if (data.inSheet !== undefined) openDetails(data.heart);
    if (screen === 'services') refreshServices(); else render();
  }
  else if (data.add) {
    toggleCart(data.add);
    if (data.inSheet !== undefined) openDetails(data.add);
    refreshServices();
  }
  else if (data.bookCart !== undefined) { startBooking(cart.services, { combo: cart.combo }); }
  else if (data.quick) quickBook(data.quick);
  else if (data.combo) bookCombo(data.combo);
  else if (data.rebook) rebook(data.rebook);
  else if (data.reschedule) openReschedule(data.reschedule);
  else if (data.cancel) openCancel(data.cancel);
  else if (data.seg) { bookingsTab = data.seg; render(); }

  // date + time pickers (booking flow or reschedule sheet)
  else if (data.date) {
    if (sheet.contains(target)) { resched.date = data.date; resched.time = null; openReschedule(resched.id); }
    else { flow.date = data.date; flow.time = null; render(); }
  }
  else if (data.time) {
    if (sheet.contains(target)) { resched.time = data.time; openReschedule(resched.id); sheet.scrollTop = sheet.scrollHeight; }
    else { flow.time = data.time; render(); }
  }
  else if (data.confirmResched !== undefined) {
    const item = bookings.find(booking => booking.id === resched.id);
    item.date = resched.date;
    item.time = resched.time;
    item.rescheduled = true;
    saveBookings();
    closeSheet();
    render();
    showToast(`Moved to ${dayLabel(item.date)}, ${timeLabel(item.time)}.`);
  }
  else if (data.confirmCancel) {
    const item = bookings.find(booking => booking.id === data.confirmCancel);
    item.status = 'cancelled';
    saveBookings();
    closeSheet();
    render();
    showToast(`${item.id} cancelled.`);
  }

  // booking flow
  else if (data.flowNext !== undefined) flowNext();
  else if (data.flowBack !== undefined) flowBack();
  else if (data.flowClose !== undefined) go(tabs.includes(flow.from) ? flow.from : 'home');
  else if (data.flowStep) { flow.step = data.flowStep; go('book'); }
  else if (data.flowCat) { flow.addCat = data.flowCat; render(); }
  else if (data.flowToggle || data.flowRemove) {
    const id = data.flowToggle || data.flowRemove;
    const index = flow.services.indexOf(id);
    if (index === -1) flow.services.push(id); else flow.services.splice(index, 1);
    flow.time = null;
    if (flow.artist && flow.artist !== 'any' && !artistsFor(flow.services).some(artist => artist.id === flow.artist)) flow.artist = null;
    cart.services = [...flow.services];
    if (!bill(flow.services, flow.combo).combo) flow.combo = cart.combo = null;
    saveCart();
    render();
  }
  else if (data.artist) { flow.artist = data.artist; flow.time = null; render(); }
  else if (data.pay) { flow.pay = data.pay; render(); }
  else if (data.calendar !== undefined) showToast('Added to your calendar (demo).');

  // notifications
  else if (data.note) {
    const note = notifications()[Number(data.note)];
    if (note.quick) quickBook(note.quick);
    else if (note.rate) openRate(note.rate);
    else go(note.go);
  }
  else if (data.rate) {
    closeSheet();
    showToast(Number(data.rate) >= 4 ? 'Thank you! Your artist will love this.' : 'Thanks, we will call you to make it right.');
  }

  // profile
  else if (data.editProfile !== undefined) openEditProfile();
  else if (data.goSaved !== undefined) { svcCat = 'saved'; go('services'); }
  else if (data.copy) {
    if (navigator.clipboard) navigator.clipboard.writeText(data.copy).catch(() => {});
    showToast(`Code ${data.copy} copied.`);
  }
  else if (data.logout !== undefined) {
    profile.loggedIn = false;
    saveProfile();
    loginInfo = { name: '', phone: '' };
    go('login');
  }
  else if (data.reset !== undefined) openReset();
  else if (data.confirmReset !== undefined) {
    Object.values(keys).forEach(key => localStorage.removeItem(key));
    loadState();
    loginInfo = { name: '', phone: '' };
    flow = null;
    go('login');
    showToast('Demo data reset.');
  }

  // login
  else if (data.sendOtp !== undefined) {
    loginInfo.name = document.querySelector('#loginName').value.trim();
    loginInfo.phone = cleanPhone(document.querySelector('#loginPhone').value);
    const nameBad = loginInfo.name.length < 2;
    const phoneBad = !phoneOk(loginInfo.phone);
    document.querySelector('#loginNameField').classList.toggle('invalid', nameBad);
    document.querySelector('#loginPhoneField').classList.toggle('invalid', phoneBad);
    if (nameBad || phoneBad) return;
    go('otp');
    setTimeout(() => document.querySelector('#otp input').focus(), 250);
  }
  else if (data.skipLogin !== undefined) { loginInfo = { name: '', phone: '' }; finishLogin(); }
  else if (data.verify !== undefined) finishLogin();
  else if (data.resend !== undefined) showToast('Code sent again (demo).');
});

backdrop.addEventListener('click', closeSheet);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSheet();
});

phone.addEventListener('input', event => {
  const target = event.target;

  if (target.id === 'svcSearch') {
    svcQuery = target.value;
    document.querySelector('#svcList').innerHTML = serviceListHtml();
  }
  else if (target.dataset.field) {
    flow[target.dataset.field] = target.value;
  }
  else if (target.closest('#otp')) {
    target.value = target.value.replace(/\D/g, '').slice(-1);
    const boxes = [...document.querySelectorAll('#otp input')];
    if (target.value && target.nextElementSibling) target.nextElementSibling.focus();
    document.querySelector('[data-verify]').disabled = !boxes.every(box => box.value);
  }
});

phone.addEventListener('keydown', event => {
  const target = event.target;
  if (target.closest && target.closest('#otp') && event.key === 'Backspace' && !target.value && target.previousElementSibling) {
    target.previousElementSibling.focus();
  }
});

phone.addEventListener('change', event => {
  const pref = event.target.dataset.pref;
  if (!pref) return;
  profile[pref] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  saveProfile();
  showToast('Preferences saved.');
});

phone.addEventListener('submit', event => {
  if (event.target.id !== 'editForm') return;
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const digits = cleanPhone(form.phone.value);
  form.name.closest('.field').classList.toggle('invalid', name.length < 2);
  form.phone.closest('.field').classList.toggle('invalid', !phoneOk(digits));
  if (name.length < 2 || !phoneOk(digits)) return;

  Object.assign(profile, { name, phone: digits, email: form.email.value.trim(), birthday: form.birthday.value });
  saveProfile();
  closeSheet();
  render();
  showToast('Details saved.');
});

// keep in sync when the website changes the cart or saved list in another tab
window.addEventListener('storage', event => {
  if (!Object.values(keys).includes(event.key)) return;
  loadState();
  if (screen === 'book' && !flow) screen = 'home';
  render();
});

/* ---------- status bar clock ---------- */

function tick() {
  const now = new Date();
  document.querySelector('#sbTime').textContent = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;
}
tick();
setInterval(tick, 20000);

const screens = {
  home: homeScreen,
  services: servicesScreen,
  bookings: bookingsScreen,
  profile: profileScreen,
  notifications: notificationsScreen,
  book: bookScreen,
  login: loginScreen,
  otp: otpScreen
};

/* ---------- start ---------- */

loadState();
saveBookings();

const wanted = location.hash.slice(1);
if (!profile.loggedIn) screen = 'login';
else if (tabs.includes(wanted) || wanted === 'notifications') screen = wanted;
else screen = 'home';
go(screen);
