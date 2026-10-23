-- Ascend Growth International - Supabase Schema

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    degree TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'Website Footer Waitlist',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
    notes TEXT DEFAULT '',
    user_agent TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Create Site Settings Table (Key/Value JSON for dynamic site text)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    quote TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT 'Graduate Alum' CHECK (tag IN ('Graduate Alum', 'Parent Perspective')),
    tag_color TEXT DEFAULT 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
    order_index INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Insert Default Site Settings
INSERT INTO public.site_settings (key, value)
VALUES 
    ('hero_config', '{
        "badge_text": "Next Cohort Opening Soon",
        "badge_cta": "Join the Waitlist",
        "badge_href": "#waitlist",
        "title": "Stop Waiting. Start Earning.",
        "description": "We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order."
    }'::jsonb),
    ('contact_config', '{
        "whatsapp_phone": "254796469972",
        "whatsapp_default_message": "Hello Ascend Growth, I would like to inquire about the mentorship program",
        "calendly_url": "https://calendly.com/dredyoj/clarity-call"
    }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 6b. Insert New CMS Section Defaults
INSERT INTO public.site_settings (key, value)
VALUES
    ('cohort_config', '{
        "admission_date": "4 Sep, 2026",
        "duration": "12 weeks",
        "format": "Cohort-based learning",
        "admission_badge": "Next Cohort",
        "duration_badge": "Intensive",
        "format_badge": "1-on-1 Mentorship"
    }'::jsonb),
    ('founder_config', '{
        "section_badge": "From the Founder",
        "founder_name": "Purity Gaiti",
        "founder_title": "Founder & Lead Mentor",
        "paragraph_1": "I didn''t learn business in a classroom. I learned it in the trenches of direct sales—building teams from scratch, mastering real-world outreach, and overcoming rejection daily.",
        "paragraph_2": "I built Ascend because young professionals don''t need another theoretical lecture. They need practical, battle-tested \u201cstreet smarts\u201d and a mentor who has actually walked the path to financial independence.",
        "quote": "We don''t teach theory. We teach mindset, resilience, and the exact skills you need to monetize your potential in the real world.",
        "brand_label": "Ascend Growth International"
    }'::jsonb),
    ('cta_config', '{
        "badge_text": "Next Cohort Applications Open",
        "headline_line1": "No commitment.",
        "headline_line2": "No pressure.",
        "body": "A private 1-on-1 strategy call with founder Purity Gaiti to audit where you are currently stuck and map your transition into an independent, earning professional.",
        "agenda_title": "Inside Your 30 Minutes:",
        "agenda_footer": "Strictly capped at 30 minutes \u00b7 Direct with Founder Purity Gaiti",
        "agenda_steps": [
            {"time": "00 \u2013 10m", "title": "The Bottleneck Audit", "desc": "We diagnose where you are stuck\u2014whether it''s sending ghosted CVs, low market clarity, or lack of commercial confidence."},
            {"time": "10 \u2013 20m", "title": "Skill & Offer Match", "desc": "We map your natural strengths against our 4-Phase framework to identify the high-ticket service you can monetize immediately."},
            {"time": "20 \u2013 30m", "title": "Honest Fit & Action Plan", "desc": "You get transparent feedback on whether AGI is the right next step. If not, you still leave with a practical roadmap."}
        ]
    }'::jsonb),
    ('program_config', '{
        "section_badge": "The Framework",
        "heading": "The 4-Phase Ascend Methodology",
        "subheading": "A structured 12-week intensive cohort designed to transform stuck graduates into confident, self-reliant professionals.",
        "deliverables_pills": ["1-on-1 Mentor Guidance", "Weekly Accountability Reviews", "Live Sales Role-Plays", "Real Client Invoicing"],
        "phases": [
            {"id": 0, "step": "Phase 01", "weeks": "Weeks 1-3", "title": "Mindset Calibration", "iconName": "BrainCircuit",
             "shortDesc": "Rewire the graduate mindset and unlearn the ''wait-to-be-hired'' passive mentality.",
             "fullDesc": "Before you learn to sell or invoice, you must shatter the academic illusion. We eliminate imposter syndrome, instill daily discipline, and train you to think like an independent service provider rather than a hopeful applicant.",
             "deliverables": ["Deconstruct the ''Employee Mindset'' & build unshakeable confidence", "Daily high-performance routines & rejection desensitization", "Define your market positioning and high-leverage service offering"],
             "milestone": "Graduation from theoretical student to active market operator."},
            {"id": 1, "step": "Phase 02", "weeks": "Weeks 4-6", "title": "High-Value Market Skills", "iconName": "Zap",
             "shortDesc": "Acquire the practical digital skills, direct outreach, and sales mastery the market pays for.",
             "fullDesc": "No academic theory. You will master the exact skills businesses pay top-dollar for: direct DM & email outreach, objection handling, high-converting offer crafting, and effective client communication.",
             "deliverables": ["Master high-ticket closing & live sales roleplay simulations", "Build a client-attracting portfolio & personalized outreach scripts", "Identify high-budget decision makers and craft irresistible proposals"],
             "milestone": "A battle-tested pitch deck and 50+ qualified prospects contacted."},
            {"id": 2, "step": "Phase 03", "weeks": "Weeks 7-9", "title": "Real-World Monetisation", "iconName": "TrendingUp",
             "shortDesc": "Pitch live prospects, handle objections, and land your first paying client before cohort ends.",
             "fullDesc": "This is where theory turns into bank alerts. Under direct 1-on-1 mentorship, you will conduct live discovery calls, pitch your services to real businesses, and close your first paying client.",
             "deliverables": ["Live call reviews & real-time pitch feedback from mentor leads", "Negotiating payment terms, retainers, and closing deals", "Deploy your first service delivery without overwhelming yourself"],
             "milestone": "Securing your first closed client and independent invoice paid."},
            {"id": 3, "step": "Phase 04", "weeks": "Weeks 10-12", "title": "Scaling & Independence", "iconName": "Repeat2",
             "shortDesc": "Build reliable systems to turn one-off gigs into predictable, recurring monthly income.",
             "fullDesc": "Transform an initial client win into sustainable financial freedom. Build automated referral engines, structure retainer agreements, and master the art of long-term career independence.",
             "deliverables": ["Transition from one-off gigs to recurring monthly retainers", "Systematized referral generation & network leverage", "12-Month Post-Cohort Independence & Growth Blueprint"],
             "milestone": "A repeatable revenue engine and lifetime alumni network access."}
        ]
    }'::jsonb),
    ('media_config', '{
        "founder_image_url": null,
        "message_image_url": null
    }'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 7. insert Testimonials (Graduate & Parent Stories)
INSERT INTO public.testimonials (name, role, quote, tag, tag_color, order_index, is_active)
VALUES
    ('Samuel K.', 'Marketing Consultant · Cohort 1', 'Sent 100+ CVs with zero replies. Ascend taught me commercial outreach and I landed a high-ticket client in 5 weeks.', 'Graduate Alum', 'bg-brand-gold/15 text-brand-gold border-brand-gold/30', 1, true),
    ('Linda A.', 'Growth Strategist · Cohort 2', 'Went from being an invisible unpaid intern to managing 3 active retainer clients independently.', 'Graduate Alum', 'bg-brand-gold/15 text-brand-gold border-brand-gold/30', 2, true),
    ('David O.', 'B2B Lead Specialist · Cohort 3', 'Zero sales background before AGI. The live call roleplays helped me close my first $600 client by Week 8.', 'Graduate Alum', 'bg-brand-gold/15 text-brand-gold border-brand-gold/30', 3, true),
    ('Kevin T.', 'Direct Sales Lead · Cohort 1', 'Shattered my imposter syndrome. I now pitch business owners directly without fear and invoice with pride.', 'Graduate Alum', 'bg-brand-gold/15 text-brand-gold border-brand-gold/30', 4, true),
    ('Grace M.', 'Mother of Cohort 2 Graduate', 'My daughter went from post-graduation anxiety to waking up early, managing client projects, and smiling with true self-belief.', 'Parent Perspective', 'bg-sky-950/70 text-sky-300 border-sky-500/30', 5, true),
    ('Dr. Peter N.', 'Parent of Economics Graduate', 'The best post-university investment we made. It replaced theoretical lectures with real commercial execution.', 'Parent Perspective', 'bg-sky-950/70 text-sky-300 border-sky-500/30', 6, true),
    ('Sarah W.', 'Cohort 3 Alum', 'Purity''s 1-on-1 feedback on my pitch scripts completely altered how I communicate with high-budget decision makers.', 'Graduate Alum', 'bg-brand-gold/15 text-brand-gold border-brand-gold/30', 7, true),
    ('James M.', 'Parent of Cohort 1 Graduate', 'Seeing my son achieve financial self-reliance and pay his own bills within 12 weeks was an immense relief.', 'Parent Perspective', 'bg-sky-950/70 text-sky-300 border-sky-500/30', 8, true)
ON CONFLICT DO NOTHING;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 9. Create Policies for Public Access vs Authenticated Admins

-- Public can read active testimonials and site settings
CREATE POLICY "Public can view active testimonials" 
ON public.testimonials FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view site settings" 
ON public.site_settings FOR SELECT 
USING (true);

-- Public can insert new bookings and waitlist entries
CREATE POLICY "Public can insert bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can insert waitlist" 
ON public.waitlist FOR INSERT 
WITH CHECK (true);

-- Authenticated Admin full access to everything
CREATE POLICY "Admins have full access to bookings" 
ON public.bookings FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to waitlist" 
ON public.waitlist FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to site_settings" 
ON public.site_settings FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to testimonials" 
ON public.testimonials FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
