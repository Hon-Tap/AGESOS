import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the environment variable from Vercel
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

    // 2. Logic: Send Email via your verified info@agesos.org address
    const { data, error } = await resend.emails.send({
      // Using info@agesos.org as the authorized sender
      from: 'AGESOS Contact <info@agesos.org>', 
      to: ['info@agesos.org'],
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      replyTo: email, // This allows you to click "Reply" and email the visitor directly
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${inquiryType}</p>
          </div>
          <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <p style="margin-bottom: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 12px;">Message:</p>
            <p style="white-space: pre-wrap; color: #1e293b;">${message}</p>
          </div>
          <footer style="margin-top: 40px; font-size: 12px; color: #94a3b8;">
            Sent automatically from AGESOS Web Portal
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Operational Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Operational Dispatch Successful", id: data?.id }, 
      { status: 200 }
    );

  } catch (err) {
    console.error("API Route Critical Failure:", err);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Contact API is Online" });
}