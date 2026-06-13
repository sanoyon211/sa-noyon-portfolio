import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      // In a real production app you'd use JWT or NextAuth.
      // For this simple portfolio, returning a success is enough.
      // The frontend will store the password in localStorage to use as a token.
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
