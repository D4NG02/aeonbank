import { NextRequest, NextResponse } from 'next/server';
import RandomString from '../RandomString';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (username && password) {
    console.log('Login attempt with:', { username, password });
    
    return NextResponse.json({ success: true, message: 'Login successful', token: RandomString() });
  } else {
    return NextResponse.json({ success: false, message: 'Username and password are required.', token: '' }, { status: 400 });
  }
}