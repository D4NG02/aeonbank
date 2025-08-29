import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (username && password) {
    console.log('Login attempt with:', { username, password });
    
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Username and password are required.' }, { status: 400 });
  }
}