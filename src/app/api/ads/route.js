import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';

// GET - List advertisements with filters
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const bannerType = searchParams.get('type');
    const status = searchParams.get('status');
    const isAdmin = searchParams.get('admin') === 'true';
    const activeOnly = searchParams.get('active') === 'true';

    let query = {};

    // Filter by banner type
    if (bannerType) {
      query.bannerType = bannerType;
    }

    // Filter by status
    if (status) {
      query.status = status;
    } else if (!isAdmin) {
      // If not admin, show only active
      query.status = 'active';
    }

    // Filter by active period
    if (activeOnly) {
      const now = new Date();
      query.startDate = { $lte: now };
      query.endDate = { $gte: now };
      query.status = 'active';
    }

    const advertisements = await Advertisement.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .select('-__v');

    return NextResponse.json({
      success: true,
      data: advertisements,
      total: advertisements.length,
    });
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching advertisements' },
      { status: 500 }
    );
  }
}

// POST - Create new advertisement
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Remove fields that should not be sent by user
    delete body.status;
    delete body.views;
    delete body.clicks;
    delete body.approvedBy;
    delete body.approvalDate;

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    if (endDate <= startDate) {
      return NextResponse.json(
        { success: false, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Create advertisement with pending status
    const advertisement = await Advertisement.create({
      ...body,
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully! Awaiting approval.',
        data: advertisement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating advertisement:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error creating request' },
      { status: 500 }
    );
  }
}
