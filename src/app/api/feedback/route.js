import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const FEEDBACK_DIR = path.join(process.cwd(), 'data');
const FEEDBACK_FILE = path.join(FEEDBACK_DIR, 'feedbacks.json');

async function ensureFeedbackFile() {
  try {
    if (!existsSync(FEEDBACK_DIR)) {
      await mkdir(FEEDBACK_DIR, { recursive: true });
    }
    if (!existsSync(FEEDBACK_FILE)) {
      await writeFile(FEEDBACK_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error ensuring feedback file:', error);
  }
}

export async function POST(request) {
  try {
    await ensureFeedbackFile();

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

    // Read existing feedbacks
    const data = await readFile(FEEDBACK_FILE, 'utf8');
    const feedbacks = JSON.parse(data);

    // Create new feedback
    const feedback = {
      id: Date.now().toString(),
      rating,
      message: message.trim(),
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString(),
    };

    // Add to array and save
    feedbacks.push(feedback);
    await writeFile(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));

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
    await ensureFeedbackFile();

    const data = await readFile(FEEDBACK_FILE, 'utf8');
    const feedbacks = JSON.parse(data);

    // Sort by date (newest first)
    feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Remove sensitive data
    const sanitizedFeedbacks = feedbacks.map(({ ipAddress, userAgent, ...rest }) => rest);

    return NextResponse.json(
      { 
        success: true, 
        feedbacks: sanitizedFeedbacks,
        count: sanitizedFeedbacks.length 
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
