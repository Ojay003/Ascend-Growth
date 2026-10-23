# Ascend Growth International (AGI)

> **Stop Waiting. Start Earning.**  
> A high-performance, dark-incubator web platform, dynamic content management system (CMS), and mentorship operations hub built for graduates and ambitious individuals transitioning into independent commercial income.

---

## ✨ Overview

**Ascend Growth International** delivers a structured 12-week intensive mentorship program guided by founder **Purity Gaiti**. Built with a dark obsidian aesthetic (`#070A12` / `#030509`), the platform eliminates the "degree trap" by guiding graduates step-by-step through Mindset, Skills, Monetization, and Scale.

Beyond a high-conversion public landing page and native booking engine, the platform includes a **complete Supabase-backed Admin Dashboard & CMS** that allows the team to manage clarity calls, waitlist leads, program curricula, testimonials, and live landing page copy in real time.

---

## 🚀 Key Features

### 1. 🌌 Unified Ambient Canvas & Floating Shapes
- Powered by **Kokonut UI** geometric glass shapes drifting across an obsidian incubator background.
- Fluid ambient gold/indigo horizon lighting with zero visual seams or hard divider lines.
- High-fidelity typography, Lucide React & Hugeicons integration, and responsive glassmorphism.

### 2. ⚡ The 4-Phase Ascend Methodology & Program Bar
- **Cohort Overview Bar**: Live cohort start dates, duration badges, and format indicators right beneath the hero.
- **Dynamic 12-Week Curriculum Tabs**:
  - **Phase 1: Mindset Calibration** (Weeks 1–3) — Rewire academic passivity into independent market operation.
  - **Phase 2: High-Value Market Skills** (Weeks 4–6) — Outreach, sales mastery, and high-ticket offer creation.
  - **Phase 3: Real-World Monetisation** (Weeks 7–9) — Live discovery calls, proposal closing, and client invoicing.
  - **Phase 4: Scaling & Independence** (Weeks 10–12) — Monthly retainer structures and repeatable client acquisition.
- Curriculum content is dynamically synchronized with Supabase and editable from the admin portal.

### 3. 📅 Native 1-on-1 Clarity Call Booking (`/book`)
- **Zero Iframe Bloat**: Custom native 2-step interactive schedule picker replacing slow Calendly embeds (with Calendly retained as optional fallback).
- Dynamic date carousel, categorized EAT (GMT+3) time slots, and attendee qualification inputs (degree, background, goals).
- **Dual Persistence Architecture**: Direct write to Supabase `bookings` table with mirrored webhook dispatch to Google Sheets and instant WhatsApp confirmation.

### 4. 💬 Dual-Velocity Infinite Marquee Rails
- Graduate and parent testimonials flowing across opposing infinite conveyor rails with hover-pause interaction.
- Powered dynamically by Supabase with live category tags (`Graduate Alum` & `Parent Perspective`).

### 5. 🛡️ Secure Admin Operations Portal & CMS (`/admin`)
A private administrative suite protected by **Supabase Auth** and Next.js Edge Middleware route guards:
- **Executive Overview (`/admin`)**: Real-time KPI cards for pending & total bookings, waitlist volume, recent activity stream, and database connection status.
- **Bookings Management (`/admin/bookings`)**: Manage clarity call schedules, review applicant degrees/backgrounds, and transition statuses (`pending` → `confirmed` → `completed` → `cancelled`).
- **Waitlist CRM (`/admin/waitlist`)**: Comprehensive lead pipeline with status workflows (`new` → `contacted` → `converted` → `archived`) and internal triage notes.
- **Site Content CMS (`/admin/content`)**: Real-time editor to update Hero copy, cohort launch dates, CTA session agendas, and founder notes without redeploying code.
- **Curriculum Manager (`/admin/content/program`)**: Full visual editor for the 4-phase methodology, phase descriptions, milestones, deliverables, and timeline tags.
- **Media & Images Hub (`/admin/media`)**: Management dashboard for founder portraits, background graphics, and brand assets.
- **Testimonials Manager (`/admin/testimonials`)**: Create, edit, toggle visibility, reorder, and tag graduate and parent reviews displayed on the main page.
- **Team & Access Control (`/admin/team`)**: Team roster management with automated invite dispatch via the Supabase Admin Auth API (`/api/admin/invite`).

### 6. 🟢 Universal WhatsApp Fast-Tracks
- Persistent WhatsApp touchpoints across floating navigation, hero CTAs, booking fallback banners, and sticky bottom launcher (`#25D366`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Edge Middleware)
- **Runtime**: [React 19](https://react.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`, Postgres, Row Level Security)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer-motion.com/) & CSS Keyframes
- **UI Components & Primitives**: [Radix UI](https://www.radix-ui.com/), Base UI, Class Variance Authority
- **Icons**: [Lucide React](https://lucide.dev/) & [Hugeicons](https://hugeicons.com/)
- **Fallbacks & Webhooks**: Google Apps Script Webhooks (Google Sheets mirroring)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Ojay003/Ascend-Growth.git
cd Ascend-Growth
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# External Integrations (Optional / Fallback)
WAITLIST_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec"
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-org/clarity-call"
```

### 3. Initialize Supabase Database
Run the schema script located at [supabase/schema.sql](file:///c:/webdesign/supabase/schema.sql) inside your Supabase project's SQL Editor:
- Creates `bookings`, `waitlist`, `site_settings`, and `testimonials` tables.
- Pre-seeds initial cohort schedules, founder copy, 4-phase curriculum, and default testimonials.
- Configures Row Level Security (RLS) policies allowing public submission and restricting administration to authenticated staff.

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the admin suite.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── public/
│   ├── images/               # Brand photography, portraits, logos, and favicons
│   ├── apple-icon.png        # iOS home screen touch icon
│   └── icon.png              # Vector chevron favicon mark
├── src/
│   ├── app/
│   │   ├── admin/            # 🛡️ Protected Operations & CMS Suite
│   │   │   ├── bookings/     # Clarity call applicant tracker & statuses
│   │   │   ├── content/      # Live landing page copy CMS
│   │   │   │   └── program/  # 4-Phase curriculum & deliverables editor
│   │   │   ├── login/        # Admin authentication portal
│   │   │   ├── media/        # Asset reference & image manager
│   │   │   ├── team/         # Staff directory & team invite panel
│   │   │   ├── testimonials/ # Testimonial CRUD & badge manager
│   │   │   ├── waitlist/     # Waitlist CRM & lead triage
│   │   │   ├── layout.tsx    # Admin sidebar layout & auth session handler
│   │   │   └── page.tsx      # Admin executive KPI dashboard
│   │   ├── api/
│   │   │   ├── admin/invite/ # Supabase Admin Auth invite endpoint
│   │   │   ├── book/         # Dual-save booking endpoint (Supabase + Webhook)
│   │   │   └── waitlist/     # Dual-save waitlist endpoint
│   │   ├── book/             # Native 1-on-1 Clarity Call Booking page
│   │   ├── globals.css       # Obsidian styling, marquee animations, typography
│   │   ├── layout.tsx        # Root layout, meta tags, font configuration
│   │   └── page.tsx          # Dynamic landing page with Supabase hydration
│   ├── components/
│   │   ├── sections/         # Header, Hero, ProgramOverviewBar, Problem,
│   │   │                     # Service, FounderMessage, Testimonials, CTA, Footer
│   │   └── ui/               # Shape background, native schedule picker, buttons, modals
│   ├── hooks/                # Framer Motion scroll and reveal hooks
│   ├── lib/
│   │   ├── supabase/         # Supabase client, server, and admin service instances
│   │   └── utils.ts          # Class merging (cn) helpers
│   └── middleware.ts         # Edge route protection guarding /admin routes
├── supabase/
│   └── schema.sql            # Postgres database migrations, RLS, and seed data
└── next.config.ts            # Next.js compiler & remote image patterns
```

---

## 📄 License & Credits

- **Founder & Program Lead**: Purity Gaiti &middot; [Ascend Growth International](https://agi.co.ke)
- **Website Design & Engineering**: Jackson Ojwang
- &copy; 2026 Ascend Growth International. All rights reserved.
