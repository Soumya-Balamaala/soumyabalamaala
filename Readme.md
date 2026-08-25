# Soumya Balamaala — Portfolio

A personal portfolio and referral site for Soumya Balamaala, a Frontend Developer
(React.js / Full Stack). Built with Next.js (App Router) and Tailwind CSS, it
combines a one-page portfolio with a small set of interactive subpages —
resume downloads, a referral job board with application forms, a
recommendations wall, and a shareable "recommend me" form.

Live site: https://soumyabalamaala.vercel.app



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
