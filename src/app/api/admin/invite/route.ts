import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email);

    if (error) {
      console.error('Error inviting admin user:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Invitation successfully dispatched to ${email}`,
      user: data.user,
    });
  } catch (err: any) {
    console.error('Invite route error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error while sending invite.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const users = (data.users || []).map((u) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      confirmed_at: u.confirmed_at,
    }));

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal error listing users.' },
      { status: 500 }
    );
  }
}
