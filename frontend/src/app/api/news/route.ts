import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with a fallback to prevent build-time crashes
const resend = new Resend(process.env.RESEND_API_KEY || 're_61KKpEdE_PAFKkgtLze4M2mtCu6SETMyB');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing." }, 
        { status: 400 }
      );
    }

    // 2. Logic: Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'AGESOS Web <onboarding@resend.dev>', 
      to: ['info@agesos.org'],
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; rounded: 8px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Operational Dispatch Successful", id: data?.id }, 
      { status: 200 }
    );

  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Contact API is Online" });
}