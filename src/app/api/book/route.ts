import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const IS_VERCEL = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'data') : path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'bookings.json');

const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwMgsKxZCb46nwwReAiEAQ2xljDMMBHlWg9EU7QX0fnYlGnEUaPubOiQ7mXvNa7_WWQfg/exec';

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, timeSlot, degree } = await req.json();

    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json({ error: 'Name, email, date, and time are required.' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const bookingRecord = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      date,
      timeSlot,
      degree: (degree || '').trim(),
      timestamp,
      source: 'Direct Native Booking',
    };

    // Forward to Google Apps Script Webhook
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL || process.env.WAITLIST_GOOGLE_SHEET_URL || DEFAULT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          body: JSON.stringify(bookingRecord),
        });
      } catch (webhookErr) {
        console.error('Failed to forward booking to Google Sheets webhook:', webhookErr);
      }
    }

    // 2. Persist to Supabase if configured
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('bookings').insert({
          name: bookingRecord.name,
          email: bookingRecord.email,
          phone: bookingRecord.phone,
          date: bookingRecord.date,
          time_slot: bookingRecord.timeSlot,
          degree: bookingRecord.degree,
          status: 'pending',
          created_at: timestamp,
        });
      }
    } catch (supabaseErr) {
      console.error('Failed to write booking to Supabase:', supabaseErr);
    }

    // 3. Local / serverless persistence fallback
    try {
      try {
        await fs.access(DATA_DIR);
      } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
      }

      let bookings = [];
      try {
        const fileData = await fs.readFile(FILE_PATH, 'utf-8');
        bookings = JSON.parse(fileData);
      } catch {
        bookings = [];
      }

      bookings.push(bookingRecord);
      await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2));
    } catch (fsErr) {
      console.error('Failed to write booking locally:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Your 1-on-1 Clarity Call has been successfully scheduled!',
      booking: bookingRecord,
    });
  } catch (error) {
    console.error('Error in /api/book route:', error);
    return NextResponse.json({ error: 'Internal server error while booking.' }, { status: 500 });
  }
}
