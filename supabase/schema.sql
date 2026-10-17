-- Ascend Growth International - Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com -> SQL Editor -> New Query)

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

-- 7. Seed Initial Testimonials (Graduate & Parent Stories)
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
