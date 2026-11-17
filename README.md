# RoboQuest

An interactive, static website introducing robotics, Arduino and IoT to students in Classes 6–8. It includes three class tracks, a six-stage project journey, nine illustrated builds, a live rover simulator, and a booking enquiry form.

The site has two connected areas: the original **family and kids** experience (`index.html`) and a six-page **RoboQuest for Schools** partnership section for school leaders. The family site is available in English and Hindi; the school section is English-only for now.

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
- **English / हिंदी switch** — the family site opens in English by default; the header button changes the entire interface, including project popups, the journey, the simulator, form messages and the credits page.
- **RoboQuest for Schools** — a separate six-page partnership section with its own navigation:
  - `schools.html` — overview, six lab formats, the programme ecosystem, student work, impact and a demo form.
  - `innovation-labs.html` — six lab formats in detail, plus the campus setup sequence.
  - `programs.html` — three grade tracks, whole-school formats, a term timeline and rollout steps.
  - `gallery.html` — filterable 18-photo gallery with a keyboard-accessible lightbox.
  - `impact.html` — impact framework, first-cohort targets, reporting and term checkpoints.
  - `contact.html` — school enquiry form, contact routes and next steps.
- **School enquiry forms** — client-side validation, error messages, a success state and a local-storage copy of submissions. Nothing is sent to a server.

## Language

The site opens in English by default on every page load. The language button in the header switches the whole site between English and Hindi at any time. The page also updates its `<html lang>` attribute, title and meta description.

Technical names, code, email addresses and brand names such as Arduino, ESP32, LED, IoT and Wi-Fi stay in English inside the Hindi copy. Hindi text uses Noto Sans Devanagari as a fallback behind the site’s Latin display and body fonts.

The six school-partnership pages are written in English only and do not load the language system. This keeps the school-facing proposition, forms and reporting language consistent for now. Adding Hindi later means reusing the existing `i18n.js` pattern and translating the school page copy.

## Project photographs

Each project popup now shows:

1. **In the lab** — a real photograph of students making a robotics project.
2. **The build** — a real reference photograph of that project or technology.

These are representative stock photographs from Pexels and Wikimedia Commons, not photographs of RoboQuest students. The popup and credits page say so explicitly. Replace them with your own lab photos when available. The school pages — including the gallery, impact evidence strip and contact card — reuse the same 18-photo library and repeat the representative-photo note where photos are shown.

## Files

```text
index.html                 Family & kids homepage (English + Hindi)
schools.html               School partnerships overview and demo form
innovation-labs.html       Six lab formats and setup sequence
programs.html              Grade tracks, term timeline and rollout
gallery.html               Filterable photo gallery and lightbox
impact.html                Impact framework, targets and reporting
contact.html               School enquiry form and contact details
credits.html               Photo sources, creators and licences
assets/
  css/
    styles.css             Design tokens, header, hero, buttons
    sections.css           Journey, class tracks, projects
    extras.css             Lab, kit, recognition, enrolment, footer, modal gallery, credits
    responsive.css         Breakpoints and reduced-motion rules
    schools.css            School pages: header, heroes, labs, programmes, gallery, forms
  js/
    data.js                Journey, project, photo and mascot content
    data-hi.js             Hindi project, journey and mascot content
    i18n.js                Language state, static copy, metadata and toggle
    main.js                Navigation, filters, modal and journey tabs
    widgets.js             Rover simulator and form validation
    schools.js             School nav, reveals, FAQ, gallery lightbox and enquiry forms
  img/
    project-*.svg          Original project illustrations
    photos/                Real student and project reference photos
    favicon.svg
```

## Notes

- The email address is a placeholder; update it before publishing. The phone and WhatsApp links use +91 95694 77034.
- The family enquiry form and the school demo forms are deliberately front-end only. The school forms save submissions to `localStorage` under `rqSchoolEnquiries` for local testing. Connect both to a real endpoint before collecting submissions.
- All project illustrations and the mascot are original SVG artwork made for this site.
- The school-partnership copy, structure and page design are original RoboQuest work. They are not copied from another school website; the stock photo library is documented on `credits.html`.
