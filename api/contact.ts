interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  submittedAfterMs?: unknown;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT_EMAIL = 'ganeshmacharla2020@gmail.com';

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request): Promise<Response> {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return Response.json(
        { ok: false, error: 'Unsupported content type. Expected application/json.' },
        { status: 415 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    // Honeypot check: bots often populate hidden fields
    const honeypot = sanitizeString(body.website, 200);
    if (honeypot.length > 0) {
      return Response.json({ ok: true, message: 'Message received.' }, { status: 200 });
    }

    // Basic timing check against automated instant-submit bots
    if (typeof body.submittedAfterMs === 'number' && body.submittedAfterMs < 1200) {
      return Response.json(
        { ok: false, error: 'Please wait a moment before submitting the form.' },
        { status: 429 }
      );
    }

    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 160);
    const subject = sanitizeString(body.subject, 160);
    const message = sanitizeString(body.message, 4000);

    if (name.length < 2) {
      return Response.json(
        { ok: false, error: 'Please enter your full name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (subject.length < 3) {
      return Response.json(
        { ok: false, error: 'Please enter a subject (at least 3 characters).' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return Response.json(
        { ok: false, error: 'Please enter a message of at least 10 characters.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
    const toAddress = process.env.CONTACT_TO_EMAIL || RECIPIENT_EMAIL;

    if (!resendApiKey) {
      console.error('Contact API missing RESEND_API_KEY environment variable.');
      return Response.json(
        {
          ok: false,
          code: 'EMAIL_SERVICE_UNCONFIGURED',
          error:
            'Email delivery is not configured yet on the server. Please email me directly or use the quick email button below.',
        },
        { status: 503 }
      );
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Inter, system-ui, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin: 0 0 16px;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #e5e7eb;" />
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API delivery failed:', resendResponse.status, errorText);
      return Response.json(
        {
          ok: false,
          error: 'Unable to send your message right now. Please try emailing directly.',
        },
        { status: 502 }
      );
    }

    return Response.json(
      { ok: true, message: 'Thank you! Your message has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in /api/contact:', error);
    return Response.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
