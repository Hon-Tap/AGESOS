import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY in environment variables.");
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      inquiryType = "General Inquiry",
      message,
    } = body;

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    // SEND EMAIL
    const { data, error } = await resend.emails.send({
      // TEMPORARY TESTING SENDER
      // Change this back after verifying agesos.org in Resend
      from: "AGESOS Contact <onboarding@resend.dev>",

      // Your receiving email
      to: ["info@agesos.org"],

      subject: `New Inquiry: ${inquiryType} from ${name}`,

      replyTo: email,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0f172a; line-height: 1.7;">
          
          <h2 style="color: #0ea5e9; margin-bottom: 20px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Name:</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td style="padding: 8px 0;"><strong>Inquiry Type:</strong></td>
              <td>${inquiryType}</td>
            </tr>
          </table>

          <div
            style="
              margin-top: 30px;
              padding: 20px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 10px;
            "
          >
            <p
              style="
                margin-bottom: 10px;
                font-size: 12px;
                text-transform: uppercase;
                color: #64748b;
                font-weight: bold;
              "
            >
              Message
            </p>

            <p style="white-space: pre-wrap;">
              ${message}
            </p>
          </div>

          <p
            style="
              margin-top: 40px;
              font-size: 12px;
              color: #94a3b8;
            "
          >
            Sent automatically from the AGESOS website.
          </p>

        </div>
      `,
    });

    // RESEND ERROR
    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          error:
            error.message ||
            "Failed to send email. Please verify your domain in Resend.",
        },
        { status: 500 }
      );
    }

    // SUCCESS
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    status: "Contact API is running.",
  });
}