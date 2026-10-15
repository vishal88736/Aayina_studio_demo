# Aaina Beauty Studio

**Live website: https://strong-cucurucho-858239.netlify.app**

Website for **Aaina Beauty Studio**, a women's salon offering hair, makeup, skin, nails, mehendi and bridal services.

It is a static site built with plain HTML, CSS and JavaScript. There is no backend: bookings and enquiries are sent to the studio as a ready-made WhatsApp message, and the visitor's choices are remembered in their own browser (`localStorage`).

## Pages

| Page | What it has |
|---|---|
| [Home](https://strong-cucurucho-858239.netlify.app/) | Hero, services, signature looks, before and after slider, team, reviews, gallery, FAQ, visit and enquiry form |
| [Services](https://strong-cucurucho-858239.netlify.app/services.html) | Full price menu, combos, and a picker that sends the chosen services on WhatsApp |
| [Bridal](https://strong-cucurucho-858239.netlify.app/bridal.html) | Bridal services, packages, mehendi and nails, family packages, date check, makeup trial, bridal gallery with filters, terms |
| [Booking](https://strong-cucurucho-858239.netlify.app/booking.html) | Step-by-step appointment booking that ends in a WhatsApp message |
| [App](https://strong-cucurucho-858239.netlify.app/app/) | App-style mobile view with a demo profile and bookings |

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
images/     final photos (.jpg)
```

## Photos

The photos are AI-generated demo images, cropped for each slot.
