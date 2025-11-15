import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';

// POST - Register a view of the banner
export async function POST(request, { params }) {
  try {
    await dbConnect();

    const advertisement = await Advertisement.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!advertisement) {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'View registered',
    });
  } catch (error) {
    console.error('Error registering view:', error);
    return NextResponse.json(
      { success: false, error: 'Error registering view' },
      { status: 500 }
    );
  }
}
