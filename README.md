# RoboQuest

An interactive, static website introducing robotics, Arduino and IoT to students in Classes 6–8. It includes three class tracks, a six-stage project journey, nine illustrated builds, a live rover simulator, and a booking enquiry form. The whole experience is available in English and Hindi.

## Run it

No install or build step is needed.

1. Open `index.html` in a browser, **or**
2. From this folder, run `python -m http.server 8000` and visit <http://127.0.0.1:8000/>.

The second option is useful if your browser restricts local scripts. The Google Fonts load from the web; the illustrations and photographs are stored locally, so the site still looks complete offline.

## What is on the site

- **Three class tracks** — Class 6 Spark Starters, Class 7 Circuit Coders and Class 8 IoT Inventors.
- **Project journey** — Discover, Sketch, Build, Code, Test and tune, Showcase.
- **Nine projects** — every card opens a build plan with materials, steps, skills, and two real photographs.
- **Rover lab** — an interactive distance sensor / motor / LED simulator.
- **Enrolment form** — client-side validation and a success state. It does not send data anywhere.
- **Recognition** — every learner receives a certificate of joining; after the final project, learners receive a completion certificate and project winners receive medals.
- **Photo credits** — full sources and licences are listed on `credits.html`.
- **English / हिंदी switch** — the site opens in English by default; the header button changes the entire interface, including project popups, the journey, the simulator, form messages and the credits page.

## Language

The site opens in English by default on every page load. The language button in the header switches the whole site between English and Hindi at any time. The page also updates its `<html lang>` attribute, title and meta description.

Technical names, code, email addresses and brand names such as Arduino, ESP32, LED, IoT and Wi-Fi stay in English inside the Hindi copy. Hindi text uses Noto Sans Devanagari as a fallback behind the site’s Latin display and body fonts.

## Project photographs

Each project popup now shows:

1. **In the lab** — a real photograph of students making a robotics project.
2. **The build** — a real reference photograph of that project or technology.

These are representative stock photographs from Pexels and Wikimedia Commons, not photographs of RoboQuest students. The popup and credits page say so explicitly. Replace them with your own lab photos when available.

## Files

```text
index.html                 Main page
credits.html               Photo sources, creators and licences
assets/
  css/
    styles.css             Design tokens, header, hero, buttons
    sections.css           Journey, class tracks, projects
    extras.css             Lab, kit, recognition, enrolment, footer, modal gallery, credits
    responsive.css         Breakpoints and reduced-motion rules
  js/
    data.js                Journey, project, photo and mascot content
    data-hi.js             Hindi project, journey and mascot content
    i18n.js                Language state, static copy, metadata and toggle
    main.js                Navigation, filters, modal and journey tabs
    widgets.js             Rover simulator and form validation
  img/
    project-*.svg          Original project illustrations
    photos/                Real student and project reference photos
    favicon.svg
```

## Notes

- The email address is a placeholder; update it before publishing. The phone and WhatsApp links use +91 95694 77034.
- The enquiry form is deliberately front-end only. Connect it to a real endpoint before collecting submissions.
- All project illustrations and the mascot are original SVG artwork made for this site.
