# Soumya Balamaala — Portfolio

A personal portfolio and referral site for Soumya Balamaala, a Frontend Developer
(React.js / Full Stack). Built with Next.js (App Router) and Tailwind CSS, it
combines a one-page portfolio with a small set of interactive subpages —
resume downloads, a referral job board with application forms, a
recommendations wall, and a shareable "recommend me" form.

Live site: https://soumyabalamaala.vercel.app



### v2.17.0 — Fixed cropped social share preview (2026-08-31)

- Link previews on WhatsApp, LinkedIn, Slack, etc. were cropping the
  profile photo (cutting off the top of the head) — the metadata
  declared it as `1200x1200` when the actual file is a `1254x1354`
  portrait, so platforms miscalculated the crop for their standard
  `1200x630` landscape preview box.
- Added a generated `1200x630` branded OG image (navy gradient
  background, name/title/summary, full photo shown as a circular
  avatar) so the whole thing renders correctly everywhere instead of
  being cropped.
- Also fixed `buildMetadata()`, used by every subpage: it no longer
  forces fake `1200x1200` dimensions onto custom images either (e.g. a
  job posting's company logo, whose real size isn't known) and now
  defaults to the new generated image instead of the raw photo.

### v2.16.0 — Title rebrand & updated bio (2026-08-31)

- Retitled "Frontend Developer" to "Frontend Engineer" site-wide (page
  title/meta, Hero tagline, image alt text, About summary) — left the
  two historical job titles in the work timeline unchanged, since
  those reflect the actual title held at each company.
- Rewrote the About section bio into two paragraphs covering current
  stack (React.js ecosystem, Next.js, TypeScript, Redux Toolkit,
  PostgreSQL/MongoDB/Prisma) and recent highlights (M2P Fintech,
  Solaiera.ai, Kapil Technologies, VMax), updated to 4.9 years of
  experience; also refreshed the page meta description to match.
- Updated the profile photo.

### v2.15.0 — Public vulnerability report form (2026-08-27)

- Added `/report-vulnerability`, a public form for responsibly
  disclosing security issues (reporter details, title, vulnerability
  type, severity, affected URL, description, steps to reproduce,
  impact), submitting to the backend's `/api/vulnerability-reports`
  endpoint. Severity options are fetched live from
  `/api/master-options?category=vulnerability_severity` rather than
  hardcoded.
- Linked from the footer's Quick Links, and added to the sitemap.

### v2.14.0 — Backend-driven filenames, shared & persisted data stores (2026-08-27)

- Removed the same-origin résumé proxy added in v2.13.0: the backend
  now sends the correct filename itself, via a new `downloadFileName`
  field on each résumé record whose value matches the file's own
  `Content-Disposition` header exactly (and now sends proper CORS
  headers too) — so the frontend just links to the backend file
  directly again and trusts `downloadFileName` for the `download`
  attribute, no proxy needed.
- Résumé downloads are now triggered from a button (no `href` exposed
  in markup) via a temporary, programmatically-created link, so the
  download starts immediately without waiting on the visit-tracking
  calls that fire right alongside it.
- Added a shared, `sessionStorage`-persisted Zustand store per
  GET-based API (résumés, testimonials, job postings, tenant config).
  Previously every component fetched independently — e.g. three
  separate `<ResumeDialog>` instances (Hero, desktop Navbar, mobile
  Navbar) each called `/api/public/resumes` on mount. Now the first
  component to mount fetches once and every consumer shares the same
  cached result, which also survives page reloads/back-forward
  navigation within a tab.

### v2.13.0 — Reliable résumé filename via a same-origin proxy (2026-08-27)

- Both résumé downloads were coming through with the same wrong
  filename — the browser's cross-origin `download` attribute isn't
  reliably honored, so the server's own `Content-Disposition` filename
  won out instead (both files are correctly named differently on the
  backend; this was purely a browser cross-origin quirk).
- Removed the View action and the blob-`fetch()` download attempt from
  the previous release, since the backend's file endpoint sends no
  CORS headers at all, silently breaking that approach.
- Added a same-origin proxy route (`/api/resume/{id}`) that fetches
  the file server-side (no CORS involved) and re-serves it from this
  app's own domain with the exact filename set —
  `SoumyaB_React_4.8YOE.pdf` for both résumé variants, guaranteed
  regardless of browser behavior.

### v2.12.0 — Fixed résumé downloads, added View, custom filename (2026-08-27)

- Fixed résumé downloads doing nothing: the code read `r.fileUrl`, a
  field the API has never actually returned (it's `resume`) — so the
  download links had no destination at all.
- Downloads now fetch the file as a blob and save it through a
  same-origin `blob:` URL instead of linking directly to the
  cross-origin backend file, since the `download` attribute isn't
  reliably honored across origins; both résumé variants now save as
  `SoumyaB_React_4.8YOE.pdf`.
- Added a separate "View" action (eye icon) that opens the résumé in a
  new tab without downloading, tracked as its own visitor event
  (`resume-view-indian` / `resume-view-uae`) alongside the existing
  download tracking.

### v2.11.0 — Fixed Recommend Soumya's dropdown options (2026-08-27)

- The "How We Worked Together" and "You Are A" dropdowns on the
  Recommend Soumya form were stuck on "Loading..." forever — the
  endpoint they called (`/api/public/options/testimonials`) has been
  removed from the backend. Switched them to
  `/api/master-options?category=testimonials`, which also now returns
  proper display labels directly, so the local guess-the-label
  fallback (`labelize()`) was removed in favor of the API's own text.

### v2.10.0 — Custom file-upload fields for job applications (2026-08-27)

- Job application custom fields of type `file` (e.g. an uploaded
  certification) now actually render as a file picker instead of a
  plain text box, and submit as their own multipart part named
  `customField_{id}` — the contract the backend expects; a bare field
  id is silently ignored server-side, which would have looked like a
  successful submission while the file never arrived.
- Fixed dependent-field visibility for postings that leave
  `dependsOnValue` blank: it's now treated as "show once the
  controlling field has any answer" instead of an impossible exact
  match against `""`, which had kept a required upload field from ever
  appearing regardless of the user's answer.
- Custom file uploads are restricted to PDF only, capped at 1.5MB
  (validated on selection, not just on submit), with the limit shown
  upfront next to the upload button.

### v2.9.0 — Dependent job application fields, tracking & alignment fixes (2026-08-27)

- Job application custom fields now support conditional visibility: a
  field with `dependsOnFieldId`/`dependsOnValue` only appears (and is
  only actually required) once its controlling field matches that
  value, e.g. a funding-amount question that only shows up after
  answering "yes" to a self-funding checkbox.
- Fixed the submitted `customFieldResponses` payload to send every
  value as a string (matching the API's contract) instead of a JSON
  boolean for checkbox fields — this also matters for dependsOnValue
  matching server-side, which compares as a string.
- Recommendation cards are now left-aligned at every width instead of
  centered on mobile.
- Job apply page visits are now tracked by posting code instead of the
  internal numeric job id.

### v2.8.0 — Card centering, responsive timeline animation & subpage reveals (2026-08-27)

- Fixed a layout bug where a leftover card in the last row of the
  Skills and Recommendations grids (both the homepage preview and the
  full peer-recommendations wall) sat flush left instead of centered
  whenever the item count didn't evenly divide the column count —
  switched those grids from CSS Grid to a wrapping flexbox layout,
  which centers an incomplete row regardless of how many cards there
  are.
- My Story timeline: entries now animate in from the side only on
  desktop (where they alternate left/right); on mobile, where the
  layout collapses to a single left-aligned stack, they now rise from
  the bottom instead so the slide-in animation no longer shifts them
  out of alignment.
- Applied the same whole-section scroll-reveal animation used on the
  home page to the Recommend Soumya form and the Peer Recommendations
  wall page. (The crop-photo modal in Recommend Soumya was moved
  outside the animated wrapper — a CSS transform on an ancestor breaks
  `position: fixed` children, which would have broken the modal's
  full-viewport overlay.)

### v2.7.0 — Reliable hash-scroll on back navigation (2026-08-26)

- Recommend Soumya's "Go Back" now returns to `/peer-recommendations`'s
  recommendations section (`/#recommendations`) instead of just the
  page root.
- Added `HashScrollHandler` to the home page: scrolls to the section
  matching the URL hash on load and on browser back/forward
  (`popstate`), fixing cases where Next.js keeps the home page's
  component instance cached across a back navigation and a mount-only
  scroll effect would otherwise never re-fire — e.g. navigating
  `/#contact` → Referral Hub → Go Back now lands back on the Contact
  section instead of the page top.
- Recommendations section gained its own retry effect for the same
  issue, since it only mounts once its testimonials finish loading.

### v2.6.0 — Page-specific Go Back targets (2026-08-26)

- `SubpageHeader` now accepts a `backHref` to send "Go Back" to a fixed
  route instead of browser history: the Recommend Soumya form goes
  back to `/peer-recommendations`, and a job's apply page goes back to
  `/referral-hub`. Other subpages keep the default `router.back()`.

### v2.5.0 — Recommendations route rename (2026-08-26)

- Renamed the full recommendations wall route from `/recommendations`
  to `/peer-recommendations` (updated the "View More" link, sitemap
  entry, and page metadata); its visitor-tracking record now logs as
  `peer-recommendations` instead of `recommendations`.

### v2.4.0 — Scroll animations, nav & resume-download tracking (2026-08-26)

- Each home page section (About, Skills, My Story, Projects,
  Recommendations, Contact) now fades/slides in as a whole block when
  scrolled into view, on top of the existing per-card/per-field
  animations.
- Navbar: added a "Recommendations" link, and fixed anchor-link
  scrolling so a section's heading no longer lands hidden behind the
  fixed navbar after a nav click.
- Résumé downloads now also record a visitor entry per region
  (`resume-download-indian` / `resume-download-uae`) alongside the
  existing download-tracking call.

### v2.3.0 — Testimonial layout, geolocated download tracking & nav fixes (2026-08-26)

- Testimonial cards: LinkedIn icon moved to the top-right corner of the
  card, and the author's company now renders on its own line beneath
  their role instead of joined inline with a "·" separator.
- Résumé downloads now capture the visitor's city/state/country via the
  browser's Geolocation API (reverse-geocoded client-side) and send it
  along with the download-tracking event.
- Job-posting visitor tracking now records which specific job was
  viewed (`job-{id}`) instead of a single generic "job-apply" page
  value.
- Subpage header's "Go Back" control now navigates browser history
  (`router.back()`) instead of always returning to the homepage.

### v2.2.0 — Recommendation form & testimonial ordering (2026-08-25)

- Recommend Soumya form: the "Company" field is now a dropdown of the
  companies Soumya has actually worked at (sourced from the experience
  timeline) instead of free text, and its label was changed to "During
  our collaboration, your role was..." for the role field / "Company We
  Worked At" for the company field to better guide recommenders.
- Recommendations now render in the backend-defined `displayOrder`
  (both the homepage preview and the full `/recommendations` wall)
  instead of raw API fetch order; entries missing an order value sort
  to the end.
- Fixed garbled en-dash characters and a company-name typo
  ("VMax e-Solution" → "VMax e-Solutions") across the experience
  timeline and projects data, and updated the M2P Fintech project name
  to "VKYC, DKYC & OCAC Modules".

### v2.1.0 — Recommendation form field fixes (2026-08-24)

- Corrected the testimonial submission payload to match the live API's
  actual field names (`authorTitle`, `authorCompany`, `relationshipType`)
  after they drifted from what was originally wired up.
- Added a new required "Project We Worked On" field (`subjectLabel`) to
  the Recommend Soumya form, capturing what specifically the
  recommendation is about.

### v2.0.0 — Live API integration & SEO overhaul (2026-08-24)

- Replaced static placeholder content with live data across the site:
  job postings, testimonials/recommendations, resumes, and tenant
  profile info (photo, logo) are now fetched from the backend API.
- Referral Hub: jobs are now backed by real postings, each with a
  dynamic application form built from the posting's own custom
  questions; added a résumé-download-tracking and a direct
  résumé-submission flow. Route restructured to
  `/referral-hub/{postingCode}/apply`. Removed the old static
  "join my network" signup form.
- Recommend Soumya form now submits real testimonials (with photo
  upload/crop) instead of a placeholder submission; the Recommendations
  wall only renders once there's at least one live testimonial.
- Contact form now submits real leads to the backend and collects a
  proper international phone number (flag + country code + formatted
  number), reused across every form that collects a phone number.
- Added site-wide visitor-page-view tracking.
- SEO: per-page Open Graph and Twitter Card metadata, plus a dynamic
  `sitemap.xml` and `robots.txt` that include live job-posting routes.
- Performance/cleanup: removed an unused shadcn/ui component scaffold
  (45 files) and ~26 orphaned dependencies that were never imported.
- Various mobile-layout and alignment fixes across forms and sections.

### v1.0.0 — Initial release (2026-07-26)

- Full one-page portfolio: Navbar, Hero, About, Skills, Experience
  ("My Story" timeline), Projects, Recommendations preview, Contact, Footer.
- Résumé download dialog with region-specific PDF options.
- Referral Hub: open-roles listing, per-job detail + application pages,
  and a "join my network" signup form.
- Recommendations wall backed by static testimonial data.
