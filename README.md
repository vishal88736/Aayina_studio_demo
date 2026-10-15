# Aaina Beauty Studio

Website for **Aaina Beauty Studio**, a women's salon offering hair, makeup, skin, nails, mehendi and bridal services.

It is a static site built with plain HTML, CSS and JavaScript. There is no backend: bookings and enquiries are sent to the studio as a ready-made WhatsApp message, and the visitor's choices are remembered in their own browser (`localStorage`).

## Pages

| Page | What it has |
|---|---|
| `index.html` | Home: hero, services, signature looks, before and after slider, team, reviews, gallery, FAQ, visit and enquiry form |
| `services.html` | Full price menu, combos, and a picker that sends the chosen services on WhatsApp |
| `bridal.html` | Bridal services, packages, mehendi and nails, family packages, date check, makeup trial, bridal gallery with filters, terms |
| `booking.html` | Step-by-step appointment booking that ends in a WhatsApp message |
| `app/index.html` | App-style mobile view with a demo profile and bookings |

## Features

- Responsive layout, tested at 1440px (desktop) and 390px (phone), with no sideways scrolling
- Before and after slider (drag or keyboard)
- Gallery lightbox and bridal gallery filters
- Click-to-call and WhatsApp links on every page
- Form checks for name and 10-digit Indian mobile numbers
- Respects "reduced motion" settings

## Folder structure

```
index.html  services.html  bridal.html  booking.html
style.css   services.css   bridal.css   booking.css
script.js   services.js    booking.js   data.js     (data.js = services and prices)
favicon.svg
app/        app-style page (index.html, app.css, app.js)
images/     final photos (.jpg); images/README.txt lists every file name the pages expect
```

## Run it locally

No install or build step is needed. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Publish

Any static host works, as long as the whole folder is uploaded as it is:

- **GitHub Pages:** Settings → Pages → Branch `main`, folder `/ (root)` → Save
- **Netlify:** drag the folder onto https://app.netlify.com/drop

## Editing content

- Prices and services: `data.js`
- Studio WhatsApp number used by the scripts: `studioContact` at the top of `script.js` (the HTML files also have the number in their `tel:` and `wa.me` links)
- Photos: replace the file in `images/` with a new `.jpg` of the same name and a similar shape (see `images/README.txt`)

## Photos

The photos are AI-generated demo images, cropped for each slot. The original full-size PNGs are kept out of this repository.
