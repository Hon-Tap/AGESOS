import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// --- GET: Fetch News Updates (Fixed to return an Array) ---
export async function GET() {
  try {
    // Mock data matching the NewsItem interface until your Vercel database is connected
    const mockNews = [
      {
        id: '1',
        title: 'Initial Database Sync Status',
        category: 'General',
        description: 'Vercel database schema tables are ready for deployment. System operating securely.',
        date: '2026-05-16',
        status: 'Published'
      },
      {
        id: '2',
        title: 'Clean Water Project Expansion',
        category: 'Water',
        description: 'New water infrastructure pipelines are successfully running across target zones.',
        date: '2026-05-15',
        status: 'Published'
      }
    ];
    
    return NextResponse.json(mockNews);
  } catch (error) {
    console.error("GET News Error:", error);
    return NextResponse.json({ error: "Failed to fetch news feed" }, { status: 500 });
  }
}

// --- POST: Commit News Update & Dispatch Notification Email ---
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
    // SEND EMAIL VIA RESEND
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
          <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
            <p style="margin-bottom: 10px; font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold;">
              Message
            </p>
            <p style="white-space: pre-wrap; margin: 0;">
              ${message}
            </p>
          </div>
          <footer style="margin-top: 40px; font-size: 12px; color: #94a3b8;">
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
          error: error.message || "Failed to send email. Please try again.",
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
        message: "Message processed and email dispatched successfully.",
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