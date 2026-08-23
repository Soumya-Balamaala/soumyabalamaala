# Soumya Balamaala — Portfolio

A personal portfolio and referral site for Soumya Balamaala, a Frontend Developer
(React.js / Full Stack). Built with Next.js (App Router) and Tailwind CSS, it
combines a one-page portfolio with a small set of interactive subpages —
resume downloads, a referral job board with application forms, a
recommendations wall, and a shareable "recommend me" form.

Live site: https://soumyabalamaala.vercel.app

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + a small custom design system (`navy` / `gold` / `sage` palette, `rounded-card`, `rounded-pill` utilities) |
| Animation | [Framer Motion](https://www.framer.com/motion/) (scroll reveals, stagger lists, page transitions) |
| Forms | [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) validation |
| UI primitives | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)-style components in `components/ui/` |
| Icons | [lucide-react](https://lucide.dev/) |
| HTTP | [axios](https://axios-http.com/) (`lib/axios.ts`) |
| Hosting | Vercel (primary) / Netlify (`netlify.toml` included) |

---

## Application Overview

### 1. Home page (`app/page.tsx`)

A single-page portfolio composed of these sections, in order:

- **Navbar** — sticky/blurred on scroll, in-page anchor links + route links, mobile hamburger menu, "Hire Me" CTA that opens the résumé dialog.
- **Hero** — name, title, summary, download-résumé + contact CTAs, social links, profile photo.
- **About** — bio summary and quick facts (nationality, relocation, visa status, notice period).
- **Skills** — categorized skill groups (frontend, backend, mobile, state management, UI frameworks, databases, hosting, version control).
- **Experience ("My Story")** — an animated vertical timeline of work history and education, alternating left/right on desktop.
- **Projects** — a card grid of notable projects with tech-stack tags and external links.
- **Recommendations** — a preview grid of the 3 most recent testimonials with a "View More" link to the full `/recommendations` page.
- **Contact** — a validated contact form (name, service needed, phone, country/location, message).
- **Footer** — links and closing info.

### 2. `/recommendations` — Recommendations page

Lists every testimonial in `recommendationsData` as cards, plus a
"Recommend Soumya" button that links out to `/recommend`.

### 3. `/recommend` — Recommend Soumya (shareable)

A standalone page containing just the recommendation form (name, role,
company, relationship, testimonial text). Kept on its own route/URL so it
can be shared directly with former managers/teammates without sending them
to the full portfolio.

### 4. `/referral-hub` — Referral Hub

- Lists open roles Soumya can refer candidates for (`referralJobsData`).
- A "join my network" signup form (name, email, role of interest) for people
  who want to be referred when a matching opening appears.

### 5. `/referral-hub/jobs/[jobId]` — Job detail + application

A dynamically generated page per job (via `generateStaticParams`) showing
the full description, responsibilities, and requirements, followed by a
job application form (name, email, phone, resume link, relevant experience).

### Shared building blocks

- `components/portfolio/motion.tsx` — `Reveal`, `StaggerContainer`,
  `StaggerItem`, `ScalePop`: reusable scroll-triggered animation wrappers
  built on Framer Motion's `useInView`.
- `components/portfolio/ResumeDialog.tsx` — a Radix dialog offering
  region-specific résumé downloads (Indian / UAE versions).
- `components/portfolio/SubpageHeader.tsx` — the shared header for every
  non-home route, with a "Back to Portfolio" link.
- `components/ui/*` — a full shadcn/ui-derived primitive library
  (dialog, dropdown, tabs, toast, etc.) available for future features,
  even where not all of it is currently used.
- `lib/portfolio-data.ts` — the single source of truth for all portfolio
  content: skills, timeline, projects, contact info, about facts,
  recommendations, and referral jobs. Editing site content mostly means
  editing this file.

### Forms & data

All forms (`Contact`, `RecommendSoumya`, `ReferralHub`, `JobApplicationForm`)
follow the same pattern: `react-hook-form` + a `zod` schema for validation,
a shared `Field` wrapper for label/error display, and an animated
submit → success state. **Submissions are currently only logged to the
console** (`console.log(...)`) — there is no backend persistence or email
delivery wired up yet; `lib/axios.ts` is in place for when a real API
endpoint is ready.

---

## Project Structure

```
app/
  page.tsx                        Home page (all one-page sections)
  layout.tsx                      Root layout, fonts, metadata
  globals.css                     Tailwind base + design tokens
  recommendations/page.tsx        Recommendations list
  recommend/page.tsx               Shareable "Recommend Soumya" form page
  referral-hub/page.tsx           Referral Hub (jobs + join-network form)
  referral-hub/jobs/[jobId]/page.tsx   Job detail + application form
components/
  portfolio/                      Site-specific sections & forms
  ui/                              Reusable shadcn/ui-style primitives
lib/
  portfolio-data.ts               All portfolio content (single source of truth)
  axios.ts                        Configured axios instance
  utils.ts                        Class-merging helpers (cn, etc.)
hooks/
  use-toast.ts                    Toast notification hook
public/                           Images, logo, résumé PDFs
```

---

## Getting Started

```bash
npm install
npm run dev        # start the dev server (http://localhost:3000)
npm run build       # production build
npm run start        # serve the production build
npm run lint          # ESLint
npm run typecheck      # tsc --noEmit
```

### Environment variables

| Variable | Used by | Required |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `lib/axios.ts` base URL | Optional — only needed once form submissions are wired to a real API |

---

## Deployment

- **Vercel** (primary): zero-config for Next.js.
- **Netlify**: `netlify.toml` runs `npx next build` via `@netlify/plugin-nextjs`.

---

## Release Notes

### Unreleased — UI/UX polish pass

- **Story & Projects**: card containers stay centered on mobile, but all
  text inside cards (headings, body copy, tags, meta rows) is now
  left-aligned instead of centered, for readability.
- **Project cards**: fixed inconsistent card heights — cards no longer
  stretch to match the tallest card in the row, removing large empty gaps
  under short descriptions. Improved title line-height and spacing between
  title/company/description/tags.
- **Forms**: removed placeholder text from every input across the Contact,
  Referral Hub, Job Application, and Recommend Soumya forms.
- **Recommendations page**: replaced the generic subtitle with new copy,
  and added a "Recommend Soumya" call-to-action button in the page header.
- **New page — `/recommend`**: the recommendation form was split out of
  `/recommendations` into its own standalone, shareable route so it can be
  sent directly to former colleagues.

### v1.0.0 — Initial release (2026-07-26)

- Full one-page portfolio: Navbar, Hero, About, Skills, Experience
  ("My Story" timeline), Projects, Recommendations preview, Contact, Footer.
- Résumé download dialog with region-specific PDF options.
- Referral Hub: open-roles listing, per-job detail + application pages,
  and a "join my network" signup form.
- Recommendations wall backed by static testimonial data.
