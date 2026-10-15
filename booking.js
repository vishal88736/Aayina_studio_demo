/* Aaina Beauty Studio - booking page
   Needs script.js and data.js loaded before it.
   Bookings are kept in localStorage (this browser only). Nothing is sent anywhere. */

(function () {
  const stepper = document.querySelector('#stepper');
  if (!stepper) return;

  const flow = document.querySelector('#flow');
  const stepBody = document.querySelector('#stepBody');
  const stepNav = document.querySelector('#stepNav');
  const stepError = document.querySelector('#stepError');
  const editBanner = document.querySelector('#editBanner');
  const summaryBox = document.querySelector('#summary');
  const summaryBody = document.querySelector('#summaryBody');
  const summaryMini = document.querySelector('#summaryMini');
  const confirmView = document.querySelector('#confirmView');
  const manageModal = document.querySelector('#manageModal');
  const manageBody = document.querySelector('#manageBody');

  const keys = { cart: 'aainaBooking', list: 'aainaBookings', last: 'aainaLastBooking' };
  const stepNames = ['Services', 'Artist', 'Date &amp; time', 'Details'];
  const openHours = { 0: [11, 18], 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 20] };

  /* ---------- storage + small helpers ---------- */

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* ignore */ }
  }

  const findService = id => serviceList.find(item => item.id === id);
  const findCategory = id => serviceCategories.find(item => item.id === id);
  const findStylist = id => stylistList.find(item => item.id === id);
  const icon = name => `<svg class="icon"><use href="#${name}"/></svg>`;
  const money = amount => '₹' + amount.toLocaleString('en-IN');
  const esc = text => String(text).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  function durationText(mins) {
    const hours = Math.floor(mins / 60);
    const rest = mins % 60;
    if (hours === 0) return `${mins} min`;
    return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
  }

  function timeText(minutes) {
    const hour = Math.floor(minutes / 60);
    const rest = String(minutes % 60).padStart(2, '0');
    return `${hour % 12 || 12}:${rest} ${hour >= 12 ? 'PM' : 'AM'}`;
  }

  const toMinutes = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
  const toTime = minutes => String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');

  function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function fromKey(key) {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  const longDate = key => fromKey(key).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const priceOf = item => (item.offer ? Math.round(item.price * (1 - item.offer / 100)) : item.price);

  /* ---------- state ---------- */

  const saved = readStore(keys.cart, { services: [], combo: null });
  const state = {
    step: 1,
    services: (saved.services || []).filter(id => findService(id) && !findService(id).bridal),
    combo: saved.combo || null,
    stylist: 'any',
    date: null,
    time: null,
    name: '',
    phone: '',
    notes: '',
    cat: 'all',
    editing: null
  };

  // links like booking.html?look=butterfly-cut preselect that service
  const lookId = new URLSearchParams(location.search).get('look');
  if (lookId && findService(lookId) && !state.services.includes(lookId)) state.services.push(lookId);

  function comboIsActive() {
    const combo = comboList.find(item => item.id === state.combo);
    return combo && combo.ids.every(id => state.services.includes(id)) ? combo : null;
  }

  function totals(ids, comboId) {
    const picked = ids.map(findService);
    const subtotal = picked.reduce((sum, item) => sum + priceOf(item), 0);
    const minutes = picked.reduce((sum, item) => sum + item.mins, 0);
    const combo = comboList.find(item => item.id === comboId);
    const active = combo && combo.ids.every(id => ids.includes(id)) ? combo : null;
    const discount = active ? Math.round(active.ids.reduce((sum, id) => sum + findService(id).price, 0) * active.percent / 100) : 0;
    return { picked, subtotal, minutes, combo: active, discount, total: subtotal - discount };
  }

  const current = () => totals(state.services, comboIsActive() ? state.combo : null);

  function saveCart() {
    writeStore(keys.cart, { services: state.services, combo: state.combo });
  }

  /* ---------- slots ---------- */

  function bookings() { return readStore(keys.list, []); }

  function slotTaken(key, time, stylistId) {
    const takenByYou = bookings().some(b => b.status === 'confirmed' && b.date === key && b.time === time &&
      (!state.editing || b.id !== state.editing.id) && (b.stylist === stylistId || b.stylist === 'any' || stylistId === 'any'));
    if (takenByYou) return true;

    // a steady pattern of "already booked" slots, so the day looks real
    let sum = 0;
    for (const ch of key + time + stylistId) sum = (sum * 31 + ch.charCodeAt(0)) % 997;
    return sum % 10 < (stylistId === 'any' ? 2 : 3);
  }

  function slotsFor(key, mins) {
    const date = fromKey(key);
    const [open, close] = openHours[date.getDay()];
    const now = new Date();
    const isToday = key === dateKey(now);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const list = [];
    for (let t = open * 60; t <= close * 60 - mins; t += 30) {
      if (isToday && t < nowMinutes + 60) continue;
      list.push(t);
    }
    return list;
  }

  /* ---------- WhatsApp message (goes to the studio number) ---------- */

  function liveMessage() {
    const t = current();
    const lines = [siteIntro];
    if (t.picked.length) lines.push('Services: ' + t.picked.map(item => item.name).join(', '));
    if (state.stylist !== 'any') lines.push('Artist: ' + findStylist(state.stylist).name);
    if (state.date) lines.push('Preferred date and time: ' + longDate(state.date) + (state.time ? ', ' + timeText(toMinutes(state.time)) : ''));
    if (t.picked.length) lines.push('Estimated total: ' + money(t.total));
    if (state.name) lines.push('Name: ' + state.name);
    if (state.phone) lines.push('Phone: ' + state.phone);
    if (state.notes) lines.push('Notes: ' + state.notes);
    lines.push(t.picked.length ? 'Please confirm if this slot is available.' : 'I would like to book an appointment. Please share the available slots.');
    return lines.join('\n');
  }

  function updateWaLinks() {
    const url = whatsappUrl(liveMessage());
    document.querySelectorAll('[data-wa-live]').forEach(link => { link.href = url; });
  }

  /* ---------- stepper + summary ---------- */

  function renderStepper() {
    stepper.hidden = Boolean(state.editing);
    stepper.innerHTML = stepNames.map((name, i) => {
      const n = i + 1;
      const cls = n < state.step ? 'done' : n === state.step ? 'active' : '';
      return `<li class="${cls}"><button type="button" data-step="${n}" ${n > state.step ? 'disabled' : ''} aria-current="${n === state.step ? 'step' : 'false'}">
        <span class="num">${n < state.step ? icon('tick') : n}</span><span>${name}</span></button></li>`;
    }).join('');
  }

  function renderSummary() {
    const t = current();
    const stylist = state.stylist === 'any' ? 'Any available artist' : findStylist(state.stylist).name;

    let html = '<h3>Your booking</h3>';
    html += t.picked.length
      ? t.picked.map(item => `<div class="s-line"><div>${item.name}<span>${durationText(item.mins)}</span></div><b>${money(priceOf(item))}</b></div>`).join('')
      : '<div class="s-line empty">No services chosen yet.</div>';

    if (t.picked.length) {
      html += '<div class="s-sum">';
      if (t.combo) html += `<div class="discount"><span>${t.combo.name} combo, ${t.combo.percent}% off</span><span>-${money(t.discount)}</span></div>`;
      html += `<div><span>Time needed</span><span>about ${durationText(t.minutes)}</span></div>`;
      html += `<div class="grand"><span>Total</span><span>${money(t.total)}</span></div></div>`;
    }

    if (state.step >= 2 || state.editing) html += `<div class="s-when"><div><span>Artist</span><b>${esc(stylist)}</b></div>`;
    if (state.date && state.time) html += `<div><span>When</span><b>${longDate(state.date)}, ${timeText(toMinutes(state.time))}</b></div>`;
    if (state.step >= 2 || state.editing) html += '</div>';

    html += `<a class="btn btn-line btn-sm s-wa" data-wa-live href="#" target="_blank" rel="noopener">${icon('whatsapp')} Book on WhatsApp</a>`;
    html += `<p class="s-note">WhatsApp: ${studioContact.phoneText}. Pay at the studio, no advance needed for salon services. Free reschedule or cancel up to 4 hours before your slot.</p>`;
    summaryBody.innerHTML = html;
    updateWaLinks();
    summaryMini.textContent = t.picked.length ? `Your booking, ${money(t.total)}` : 'Your booking';
  }

  /* ---------- steps ---------- */

  function renderStep1() {
    const cats = [{ id: 'all', name: 'All' }, ...serviceCategories];
    const list = serviceList.filter(item => !item.bridal && (state.cat === 'all' || item.cat === state.cat));

    stepBody.innerHTML = `
      <h2 class="step-title">Choose your services</h2>
      <p class="step-sub">Pick one or more. Your total updates as you go.</p>
      <div class="cat-chips">${cats.map(c => `<button type="button" data-cat="${c.id}" class="${c.id === state.cat ? 'active' : ''}">${c.name}</button>`).join('')}</div>
      <div class="pick-list">${list.map(item => {
        const on = state.services.includes(item.id);
        return `<button type="button" class="pick ${on ? 'on' : ''}" data-pick="${item.id}" aria-pressed="${on}">
          <span class="box">${icon('tick')}</span>
          <span><b>${item.name}</b><small>${findCategory(item.cat).name}, ${durationText(item.mins)}</small></span>
          <span class="p-price">${item.from ? '<small>from</small>' : ''}${money(priceOf(item))}</span>
        </button>`;
      }).join('')}</div>
      <p class="bridal-hint">Getting married? <a href="bridal.html#trial">Request a bridal trial</a> instead.</p>`;
  }

  function renderStep2() {
    const cats = [...new Set(state.services.map(id => findService(id).cat))];
    const names = cats.map(id => findCategory(id).name);

    const card = (id, initial, name, role, matchHtml) => `
      <button type="button" class="artist-pick ${state.stylist === id ? 'on' : ''}" data-stylist="${id}" aria-pressed="${state.stylist === id}">
        <span class="av">${initial}</span><b>${name}</b><small>${role}</small>${matchHtml}
      </button>`;

    let html = '<h2 class="step-title">Choose your artist</h2><p class="step-sub">Pick a favourite, or let us assign whoever is free. "Any" shows the most time slots.</p><div class="artist-grid">';
    html += card('any', '✦', 'Any available artist', 'Fastest option, most slots', '<em class="match">Recommended</em>');
    stylistList.forEach(s => {
      const covers = s.cats.filter(c => cats.includes(c));
      const match = covers.length
        ? `<em class="match">Does your ${covers.map(c => findCategory(c).name.toLowerCase()).join(' and ')}</em>`
        : '<em class="match no">Not for your selected services</em>';
      html += card(s.id, s.name[0], s.name, s.role, match);
    });
    html += '</div>';

    const chosen = findStylist(state.stylist);
    if (chosen && cats.some(c => !chosen.cats.includes(c))) {
      html += `<p class="artist-note">${chosen.name.split(' ')[0]} will not do all of your services (${esc(names.join(', '))}). We will assign another artist for the rest, at the same time.</p>`;
    }
    stepBody.innerHTML = html;
  }

  function renderStep3() {
    const t = current();
    const today = new Date();
    let strip = '';
    for (let i = 0; i < 14; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const key = dateKey(d);
      strip += `<button type="button" class="date-btn ${state.date === key ? 'on' : ''}" data-date="${key}" aria-pressed="${state.date === key}">
        <small>${i === 0 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short' })}</small><b>${d.getDate()}</b>
        <small>${d.toLocaleDateString('en-IN', { month: 'short' })}</small></button>`;
    }

    let slotsHtml = '<div class="no-slots">Choose a date to see available times.</div>';
    if (state.date) {
      const all = slotsFor(state.date, t.minutes || 30);
      if (all.length === 0) {
        slotsHtml = '<div class="no-slots">No time left on this day for your services. Please pick another date.</div>';
      } else {
        const groups = [['Morning', all.filter(m => m < 720)], ['Afternoon', all.filter(m => m >= 720 && m < 1020)], ['Evening', all.filter(m => m >= 1020)]];
        slotsHtml = groups.filter(g => g[1].length).map(([label, times]) => `
          <div class="slot-group"><h4>${label}</h4><div class="slots">${times.map(m => {
            const time = toTime(m);
            const taken = slotTaken(state.date, time, state.stylist);
            return `<button type="button" class="slot ${state.time === time ? 'on' : ''}" data-time="${time}" ${taken ? 'disabled' : ''} aria-pressed="${state.time === time}">${timeText(m)}</button>`;
          }).join('')}</div></div>`).join('');
      }
    }

    stepBody.innerHTML = `
      <h2 class="step-title">Pick a date and time</h2>
      <p class="step-sub">The next 14 days are open for booking.</p>
      <div class="date-strip">${strip}</div>
      <div class="slot-head"><h3>Available times</h3><span>Your services take about ${durationText(t.minutes || 30)}</span></div>
      ${slotsHtml}`;
  }

  function renderStep4() {
    const t = current();
    const stylist = state.stylist === 'any' ? 'Any available artist' : findStylist(state.stylist).name;
    stepBody.innerHTML = `
      <h2 class="step-title">Your details</h2>
      <p class="step-sub">We will send a reminder to this number.</p>
      <div class="recap">
        <div><span>Services</span><b>${t.picked.map(item => item.name).join(', ')}</b></div>
        <div><span>Artist</span><b>${esc(stylist)}</b></div>
        <div><span>When</span><b>${longDate(state.date)}, ${timeText(toMinutes(state.time))}</b></div>
        <div><span>Total</span><b>${money(t.total)}</b></div>
      </div>
      <div class="two">
        <div class="field"><label for="bkName">Your name</label>
          <input id="bkName" type="text" autocomplete="name" placeholder="e.g. Priya Sharma" value="${esc(state.name)}">
          <span class="field-error">Please enter your name.</span></div>
        <div class="field"><label for="bkPhone">Phone number</label>
          <input id="bkPhone" type="tel" autocomplete="tel" placeholder="10-digit mobile number" value="${esc(state.phone)}">
          <span class="field-error">Enter a valid 10-digit mobile number.</span></div>
      </div>
      <div class="field"><label for="bkNotes">Special requests (optional)</label>
        <textarea id="bkNotes" placeholder="Reference photo, allergies, anything we should know">${esc(state.notes)}</textarea></div>
      <p class="policy">By confirming, you agree that you can reschedule or cancel free of charge up to 4 hours before your slot.</p>
      <p class="wa-alt">Prefer WhatsApp? <a data-wa-live href="#" target="_blank" rel="noopener">Send these details on WhatsApp</a> (${studioContact.phoneText}).</p>`;
    updateWaLinks();
  }

  function renderNav() {
    if (state.editing) {
      stepNav.innerHTML = '<button class="btn btn-line" type="button" data-nav="stop">Keep old time</button><button class="btn btn-wine" type="button" data-nav="next">Confirm new time</button>';
      return;
    }
    const last = state.step === 4;
    stepNav.innerHTML = `${state.step > 1 ? '<button class="btn btn-line" type="button" data-nav="back">Back</button>' : '<span></span>'}
      <button class="btn btn-wine" type="button" data-nav="next">${last ? 'Confirm booking' : 'Continue'}</button>`;
  }

  function render() {
    renderStepper();
    if (state.step === 1) renderStep1();
    else if (state.step === 2) renderStep2();
    else if (state.step === 3) renderStep3();
    else renderStep4();
    renderNav();
    renderSummary();
    stepError.hidden = true;
  }

  function showError(message) {
    stepError.textContent = message;
    stepError.hidden = false;
  }

  /* ---------- moving between steps ---------- */

  function canLeave(step) {
    if (step === 1 && state.services.length === 0) { showError('Choose at least one service to continue.'); return false; }
    if (step === 3 && (!state.date || !state.time)) { showError('Pick a date and a time slot to continue.'); return false; }
    if (step === 4) {
      state.name = document.querySelector('#bkName').value.trim();
      state.phone = document.querySelector('#bkPhone').value;
      state.notes = document.querySelector('#bkNotes').value.trim();
      let digits = state.phone.replace(/\D/g, '');
      if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
      setError(document.querySelector('#bkName'), state.name.length < 2 ? 'Please enter your name.' : '');
      setError(document.querySelector('#bkPhone'), /^[6-9]\d{9}$/.test(digits) ? '' : 'Enter a valid 10-digit mobile number.');
      if (stepBody.querySelector('.invalid')) return false;
      state.phone = digits;
    }
    return true;
  }

  function go(step) {
    state.step = step;
    render();
    document.querySelector('.book-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- confirming ---------- */

  function newId() {
    const used = bookings().map(b => b.id);
    let id;
    do { id = 'AAI-' + Math.floor(1000 + Math.random() * 9000); } while (used.includes(id));
    return id;
  }

  function saveBooking(booking) {
    const list = bookings().filter(b => b.id !== booking.id);
    list.push(booking);
    writeStore(keys.list, list);
    writeStore(keys.last, booking.id);
  }

  function confirmBooking() {
    const t = current();
    let booking;

    if (state.editing) {
      booking = { ...state.editing, date: state.date, time: state.time, stylist: state.stylist, status: 'confirmed', rescheduled: true };
    } else {
      booking = {
        id: newId(), name: state.name, phone: state.phone, notes: state.notes,
        services: [...state.services], combo: t.combo ? t.combo.id : null,
        stylist: state.stylist, date: state.date, time: state.time,
        mins: t.minutes, total: t.total, discount: t.discount, status: 'confirmed', rescheduled: false
      };
      writeStore(keys.cart, { services: [], combo: null });   // the services page tray starts fresh
    }

    saveBooking(booking);
    state.editing = null;
    showConfirmation(booking);
  }

  function showConfirmation(booking) {
    const t = totals(booking.services, booking.combo);
    const cancelled = booking.status === 'cancelled';
    const stylist = booking.stylist === 'any' ? 'Any available artist' : findStylist(booking.stylist).name;
    const when = `${longDate(booking.date)}, ${timeText(toMinutes(booking.time))}`;

    let heading = `You are booked, ${esc(booking.name.split(' ')[0])}!`;
    let line = `We will see you on ${when}.`;
    if (booking.rescheduled) { heading = 'Booking rescheduled'; line = `Your new time is ${when}.`; }
    if (cancelled) { heading = 'Booking cancelled'; line = 'This booking has been cancelled. You can book a new time any time.'; }

    confirmView.innerHTML = `
      <div class="confirm">
        <div class="done-icon ${cancelled ? 'cancelled' : ''}">${icon(cancelled ? 'close' : 'tick')}</div>
        <h2>${heading}</h2>
        <p>${line}</p>
        <span class="id">${booking.id}</span>
        <ul class="done-list">
          <li><span>Date and time</span><b>${when}</b></li>
          <li><span>Artist</span><b>${esc(stylist)}</b></li>
          <li><span>Services</span><b>${t.picked.map(item => item.name).join(', ')}</b></li>
          <li><span>Time needed</span><b>about ${durationText(t.minutes)}</b></li>
          <li><span>Estimated total</span><b>${money(t.total)}</b></li>
        </ul>
        <div class="confirm-actions">
          ${cancelled
            ? '<button class="btn btn-wine" data-act="again" type="button">Book a new time</button>'
            : `<button class="btn btn-wine" data-act="calendar" data-id="${booking.id}" type="button">${icon('calendar')} Add to calendar</button>
               <a class="btn btn-line" target="_blank" rel="noopener" href="${whatsappLink(booking, when)}">${icon('whatsapp')} Send details on WhatsApp</a>`}
        </div>
        ${cancelled ? '' : `<div class="links"><button type="button" data-act="manage" data-id="${booking.id}">Reschedule or cancel</button><button type="button" data-act="again">Book another</button></div>`}
        <p class="demo-line">Demo confirmation. No real appointment was made and nothing was sent.</p>
      </div>`;

    flow.hidden = true;
    confirmView.hidden = false;
    document.querySelector('.book-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function whatsappLink(booking, when) {
    const t = totals(booking.services, booking.combo);
    const stylist = booking.stylist === 'any' ? 'Any available artist' : findStylist(booking.stylist).name;
    const lines = [
      `Hi! I just booked an appointment through the Aaina Beauty Studio demo website. Booking ID: ${booking.id}`,
      `Name: ${booking.name}`, `Phone: ${booking.phone}`,
      `Services: ${t.picked.map(item => item.name).join(', ')}`,
      `Artist: ${stylist}`, `Date and time: ${when}`, `Estimated total: ${money(t.total)}`
    ];
    if (booking.notes) lines.push(`Notes: ${booking.notes}`);
    lines.push('Please confirm my appointment. Thank you!');
    return whatsappUrl(lines.join('\n'));
  }

  // a real .ics file, so it opens in any calendar app
  function downloadCalendar(booking) {
    const start = fromKey(booking.date);
    const startMinutes = toMinutes(booking.time);
    const stamp = date => `${dateKey(date).replace(/-/g, '')}T${String(Math.floor(date.getHours())).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00`;
    start.setHours(Math.floor(startMinutes / 60), startMinutes % 60, 0);
    const end = new Date(start.getTime() + booking.mins * 60000);
    const names = booking.services.map(id => findService(id).name).join(', ');

    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aaina Beauty Studio//Demo//EN', 'BEGIN:VEVENT',
      `UID:${booking.id}@aaina-demo`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
      `SUMMARY:Aaina Beauty Studio (${booking.id})`, `DESCRIPTION:${names}`, 'LOCATION:Shop 14\\, Rose Court\\, Civil Lines\\, Lucknow',
      'END:VEVENT', 'END:VCALENDAR'];

    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
    link.download = `aaina-${booking.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Calendar file downloaded.');
  }

  /* ---------- reschedule + cancel ---------- */

  function startReschedule(booking) {
    manageModal.close();
    state.editing = booking;
    state.services = [...booking.services];
    state.combo = booking.combo;
    state.stylist = booking.stylist;
    state.date = null;
    state.time = null;
    state.step = 3;
    confirmView.hidden = true;
    flow.hidden = false;
    editBanner.hidden = false;
    editBanner.innerHTML = `Rescheduling <b>${booking.id}</b>. Your current slot is ${longDate(booking.date)}, ${timeText(toMinutes(booking.time))}. Pick a new date and time.`;
    render();
    document.querySelector('.book-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function foundHtml(booking) {
    const t = totals(booking.services, booking.combo);
    return `<div class="found">
      <div><span>Booking</span><b>${booking.id} <span class="status ${booking.status === 'cancelled' ? 'cancelled' : ''}">${booking.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}</span></b></div>
      <div><span>When</span><b>${longDate(booking.date)}, ${timeText(toMinutes(booking.time))}</b></div>
      <div><span>Services</span><b>${t.picked.map(item => item.name).join(', ')}</b></div></div>`;
  }

  function renderManage(view, booking, message) {
    if (view === 'find') {
      const last = readStore(keys.last, '');
      manageBody.innerHTML = `
        <h2>Manage your booking</h2>
        <p>Enter your booking ID to reschedule or cancel. Demo bookings made in this browser can be found here.</p>
        <div class="field"><label for="manageId">Booking ID</label>
          <input id="manageId" type="text" placeholder="e.g. AAI-1234" value="${esc(last)}" autocomplete="off">
          <span class="field-error" id="manageError">${esc(message || '')}</span></div>
        <div class="modal-actions"><button class="btn btn-wine" type="button" data-manage="find">Find booking</button></div>`;
      if (message) manageBody.querySelector('.field').classList.add('invalid');
    } else if (view === 'found') {
      manageBody.innerHTML = `<h2>Your booking</h2>${foundHtml(booking)}
        <div class="modal-actions">
          ${booking.status === 'cancelled'
            ? '<button class="btn btn-wine" type="button" data-manage="new">Book a new time</button>'
            : `<button class="btn btn-wine" type="button" data-manage="reschedule" data-id="${booking.id}">Reschedule</button>
               <button class="btn btn-line" type="button" data-manage="ask-cancel" data-id="${booking.id}">Cancel booking</button>`}
        </div>`;
    } else if (view === 'ask-cancel') {
      manageBody.innerHTML = `<h2>Cancel this booking?</h2><p>You can cancel free of charge up to 4 hours before your slot. You can always book again.</p>${foundHtml(booking)}
        <div class="modal-actions"><button class="btn btn-wine" type="button" data-manage="cancel" data-id="${booking.id}">Yes, cancel it</button>
        <button class="btn btn-line" type="button" data-manage="found" data-id="${booking.id}">Keep booking</button></div>`;
    }
  }

  function openManage(id) {
    const booking = bookings().find(b => b.id === id);
    if (booking) renderManage('found', booking);
    else renderManage('find');
    if (!manageModal.open) manageModal.showModal();
  }

  /* ---------- events ---------- */

  stepBody.addEventListener('click', event => {
    const pick = event.target.closest('[data-pick]');
    const cat = event.target.closest('[data-cat]');
    const stylist = event.target.closest('[data-stylist]');
    const date = event.target.closest('[data-date]');
    const slot = event.target.closest('[data-time]');

    if (pick) {
      const id = pick.dataset.pick;
      const index = state.services.indexOf(id);
      if (index === -1) state.services.push(id);
      else state.services.splice(index, 1);
      if (!comboIsActive()) state.combo = null;
      saveCart();
      renderStep1();
      renderSummary();
      stepError.hidden = true;
    } else if (cat) {
      state.cat = cat.dataset.cat;
      renderStep1();
    } else if (stylist) {
      state.stylist = stylist.dataset.stylist;
      state.time = null;
      renderStep2();
      renderSummary();
    } else if (date) {
      state.date = date.dataset.date;
      state.time = null;
      renderStep3();
      renderSummary();
      stepError.hidden = true;
    } else if (slot) {
      state.time = slot.dataset.time;
      renderStep3();
      renderSummary();
      stepError.hidden = true;
    }
  });

  stepBody.addEventListener('input', event => {
    if (event.target.id === 'bkName') state.name = event.target.value.trim();
    else if (event.target.id === 'bkPhone') state.phone = event.target.value.trim();
    else if (event.target.id === 'bkNotes') state.notes = event.target.value.trim();
    else return;
    updateWaLinks();
  });

  stepper.addEventListener('click', event => {
    const button = event.target.closest('[data-step]');
    if (button && Number(button.dataset.step) < state.step) go(Number(button.dataset.step));
  });

  stepNav.addEventListener('click', event => {
    const button = event.target.closest('[data-nav]');
    if (!button) return;

    if (button.dataset.nav === 'back') go(state.step - 1);
    else if (button.dataset.nav === 'stop') {
      const original = state.editing;
      state.editing = null;
      editBanner.hidden = true;
      showConfirmation(original);
    } else if (canLeave(state.step)) {
      if (state.editing) {
        editBanner.hidden = true;
        confirmBooking();
      } else if (state.step === 4) confirmBooking();
      else go(state.step + 1);
    }
  });

  confirmView.addEventListener('click', event => {
    const button = event.target.closest('[data-act]');
    if (!button) return;
    const booking = bookings().find(b => b.id === button.dataset.id);

    if (button.dataset.act === 'calendar' && booking) downloadCalendar(booking);
    else if (button.dataset.act === 'manage') openManage(button.dataset.id);
    else if (button.dataset.act === 'again') {
      Object.assign(state, { step: 1, services: [], combo: null, stylist: 'any', date: null, time: null, notes: '', editing: null });
      confirmView.hidden = true;
      flow.hidden = false;
      render();
      document.querySelector('.book-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.querySelector('#manageOpen').addEventListener('click', () => {
    const last = readStore(keys.last, '');
    renderManage('find');
    if (!manageModal.open) manageModal.showModal();
    if (last) manageBody.querySelector('#manageId').select();
  });

  manageBody.addEventListener('click', event => {
    const button = event.target.closest('[data-manage]');
    if (!button) return;
    const action = button.dataset.manage;
    const booking = bookings().find(b => b.id === button.dataset.id);

    if (action === 'find') {
      let typed = manageBody.querySelector('#manageId').value.trim().toUpperCase().replace(/\s/g, '');
      if (/^\d{4}$/.test(typed)) typed = 'AAI-' + typed;
      const match = bookings().find(b => b.id === typed);
      if (match) renderManage('found', match);
      else renderManage('find', null, 'No booking found with that ID. Check the ID on your confirmation screen.');
    } else if (action === 'reschedule' && booking) startReschedule(booking);
    else if (action === 'ask-cancel' && booking) renderManage('ask-cancel', booking);
    else if (action === 'found' && booking) renderManage('found', booking);
    else if (action === 'cancel' && booking) {
      booking.status = 'cancelled';
      saveBooking(booking);
      manageModal.close();
      showConfirmation(booking);
      showToast(`Booking ${booking.id} cancelled.`);
    } else if (action === 'new') {
      manageModal.close();
      confirmView.hidden = true;
      flow.hidden = false;
      state.step = 1;
      render();
    }
  });

  manageModal.addEventListener('click', event => {
    if (event.target === manageModal || event.target.closest('[data-close-modal]')) manageModal.close();
  });

  document.querySelector('#summaryToggle').addEventListener('click', () => {
    const open = summaryBox.classList.toggle('open');
    document.querySelector('#summaryToggle').setAttribute('aria-expanded', String(open));
  });

  /* ---------- start ---------- */

  render();
})();
