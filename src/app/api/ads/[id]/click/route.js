import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Register a click on the banner
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    // Validate ID exists
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Invalid advertisement ID' },
        { status: 400 }
      );
    }
    
    const advertisement = await prisma.advertisement.update({
      where: { id },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Click registered',
    });
  } catch (error) {
    console.error('Error registering click:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error registering click' },
      { status: 500 }
    );
  }
}
