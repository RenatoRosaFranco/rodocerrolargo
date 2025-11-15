import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';

// POST - Register a click on the banner
export async function POST(request, { params }) {
  try {
    await dbConnect();

    const advertisement = await Advertisement.findByIdAndUpdate(
      params.id,
      { $inc: { clicks: 1 } },
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
      message: 'Click registered',
    });
  } catch (error) {
    console.error('Error registering click:', error);
    return NextResponse.json(
      { success: false, error: 'Error registering click' },
      { status: 500 }
    );
  }
}
