import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Register a view of the banner
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
        views: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'View registered',
    });
  } catch (error) {
    console.error('Error registering view:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error registering view' },
      { status: 500 }
    );
  }
}
