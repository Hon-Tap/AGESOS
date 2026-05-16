import { NextResponse } from "next/server";

// Simple localized mock arrays mimicking real data schemas
let mockInquiries = [
  {
    id: "inq_1",
    name: "Test User",
    email: "test@example.com",
    message: "Hello, looking to coordinate structural development configurations with AGE South Sudan.",
    date: "2026-05-12",
    replied: false
  }
];

export async function GET() {
  return NextResponse.json(mockInquiries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { inquiryId } = body;
  
  // Update internal mock states optimistically
  mockInquiries = mockInquiries.map(item => 
    item.id === inquiryId ? { ...item, replied: true } : item
  );

  return NextResponse.json({ success: true, message: "Outbound payload processed." });
}