import { NextResponse } from 'next/server';
import { sanitizeInput, isValidEmail } from '@/lib/auth/auth';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Security Validation
    if (!orderData.customerName || !orderData.customerEmail || !orderData.shippingAddress) {
      return NextResponse.json(
        { error: 'Customer name, valid email, and shipping address are required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(orderData.customerEmail)) {
      return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
    }

    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item.' }, { status: 400 });
    }

    const sanitizedCustomerName = sanitizeInput(orderData.customerName);
    const sanitizedAddress = sanitizeInput(orderData.shippingAddress);
    const orderNumber = `ALD-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      status: 'ok',
      message: 'Sovereign order confirmed and registered',
      data: {
        ...orderData,
        customerName: sanitizedCustomerName,
        shippingAddress: sanitizedAddress,
        orderNumber,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal order processing error' }, { status: 500 });
  }
}
