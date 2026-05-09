import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API Key
// You can get a free key at resend.com
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 2. LOGIC: Send Email via Resend
    // This sends the notification TO you (info@agesos.org)
    const { data, error } = await resend.emails.send({
      from: 'AGESOS Web <onboarding@resend.dev>', // Replace with your verified domain later
      to: ['info@agesos.org'],
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
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

// Keep GET only if you need to test the endpoint status
export async function GET() {
  return NextResponse.json({ status: "Contact API is Online" });
}