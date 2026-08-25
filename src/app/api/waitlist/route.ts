import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'waitlist.json');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    // Ensure data directory exists
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    // Read existing data
    let waitlist = [];
    try {
      const fileData = await fs.readFile(FILE_PATH, 'utf-8');
      waitlist = JSON.parse(fileData);
    } catch {
      // File doesn't exist or is invalid JSON, start with empty array
    }

    // Check for duplicates
    if (waitlist.some((entry: any) => entry.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ success: true, message: 'Email is already on the waitlist' });
    }

    // Add new entry
    const newEntry = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || 'unknown',
    };

    waitlist.push(newEntry);

    // Write back to file
    await fs.writeFile(FILE_PATH, JSON.stringify(waitlist, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Successfully joined the waitlist' });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
