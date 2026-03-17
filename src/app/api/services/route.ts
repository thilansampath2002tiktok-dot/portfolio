import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
      }
    });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
