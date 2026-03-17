import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      }
    });
    
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
