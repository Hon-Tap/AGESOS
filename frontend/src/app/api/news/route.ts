import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    const {
      name,
      email,
      inquiryType = "General Inquiry",
      message,
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "All required fields must be filled.",
        },
        { status: 400 }
      );
    }

    // Email validation
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

    // =========================
    // SEND EMAIL
    // =========================

    const { data, error } = await resend.emails.send({
      from: "AGESOS Contact <info@agesos.org>",
      to: ["info@agesos.org"],

      subject: `New Inquiry: ${inquiryType} from ${name}`,

      replyTo: email,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; line-height: 1.7;">

          <h2 style="color: #0ea5e9; margin-bottom: 20px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sender Name:</td>
              <td>${name}</td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Sender Email:</td>
              <td>${email}</td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Inquiry Type:</td>
              <td>${inquiryType}</td>
            </tr>
          </table>

          <div
            style="
              margin-top: 30px;
              padding: 20px;
              background-color: #f8fafc;
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

            <p style="white-space: pre-wrap; margin: 0;">
              ${message}
            </p>
          </div>

          <footer
            style="
              margin-top: 40px;
              font-size: 12px;
              color: #94a3b8;
            "
          >
            Sent automatically from the AGESOS website.
          </footer>

        </div>
      `,
    });

    // =========================
    // HANDLE RESEND ERRORS
    // =========================

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        {
          success: false,
          error:
            error.message || "Failed to send email. Please try again.",
        },
        { status: 500 }
      );
    }

    // =========================
    // SUCCESS RESPONSE
    // =========================

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

// Health Check Route
export async function GET() {
  return NextResponse.json({
    success: true,
    status: "AGESOS Contact API is running.",
  });
}