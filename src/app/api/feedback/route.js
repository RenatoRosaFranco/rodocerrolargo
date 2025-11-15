import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { rating, message } = body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create feedback in database
    const feedback = await prisma.feedback.create({
      data: {
        rating,
        message: message.trim(),
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback received successfully',
        id: feedback.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        rating: true,
        message: true,
        createdAt: true
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        feedbacks,
        count: feedbacks.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}
