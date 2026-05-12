import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with your actual database logic
  const inquiries = [
    { id: '1', name: 'Test User', email: 'test@example.com', message: 'Hello', date: '2026-05-12', isRead: false }
  ];
  
  return NextResponse.json(inquiries);
}