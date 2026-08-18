import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';

export async function GET() {
  try {
    return NextResponse.json({
      status: 'ok',
      data: INITIAL_PRODUCTS,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: 'ok',
      message: 'Product registered successfully',
      data: body,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
