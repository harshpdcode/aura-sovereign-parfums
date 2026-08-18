import { NextResponse } from 'next/server';
import { sanitizeInput, isValidEmail } from '@/lib/auth/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, valid email, and message are required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
    }

    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: body.email.trim().toLowerCase(),
      phone: sanitizeInput(body.phone || ''),
      message: sanitizeInput(body.message),
      createdAt: new Date(),
    };

    return NextResponse.json({
      status: 'ok',
      message: 'Inquiry securely registered with Aura Sovereign Concierge',
      data: sanitizedData,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
