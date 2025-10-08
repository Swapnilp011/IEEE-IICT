
import { getAdminSdks } from '@/firebase/admin';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const adminSdks = getAdminSdks();
  if (!adminSdks) {
    return NextResponse.json({ error: 'Firebase Admin SDK not configured' }, { status: 500 });
  }
  const { auth } = adminSdks;
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
  }
}
