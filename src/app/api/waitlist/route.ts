import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// On Vercel / Serverless, process.cwd() is read-only, so /tmp is used as the writable directory
const IS_VERCEL = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'data') : path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'waitlist.json');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 1. If a Google Sheet / Webhook URL is configured in environment variables, forward it
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL || process.env.WAITLIST_GOOGLE_SHEET_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: cleanEmail,
            timestamp,
            source: 'Website Footer Waitlist',
          }),
        });
      } catch (webhookErr) {
        console.error('Failed to forward to webhook:', webhookErr);
      }
    }

    // 2. Safe local / serverless fallback storage
    try {
      try {
        await fs.access(DATA_DIR);
      } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
      }

      let waitlist = [];
      try {
        const fileData = await fs.readFile(FILE_PATH, 'utf-8');
        waitlist = JSON.parse(fileData);
      } catch {
        waitlist = [];
      }

      // Check duplicates
      const exists = waitlist.some((entry: any) => entry.email === cleanEmail);
      if (!exists) {
        waitlist.push({
          id: crypto.randomUUID(),
          email: cleanEmail,
          createdAt: timestamp,
          userAgent,
        });
        await fs.writeFile(FILE_PATH, JSON.stringify(waitlist, null, 2), 'utf-8');
      }
    } catch (fsErr) {
      // If filesystem write fails on serverless, log the email so it's not lost in server logs
      console.log(`[WAITLIST ENTRY SAVED]: ${cleanEmail} at ${timestamp}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist! We will notify you when spots open.' 
    });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Failed to process waitlist request' }, { status: 500 });
  }
}
