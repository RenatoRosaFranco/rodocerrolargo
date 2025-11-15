import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - List advertisements with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bannerType = searchParams.get('type');
    const status = searchParams.get('status');
    const isAdmin = searchParams.get('admin') === 'true';
    const activeOnly = searchParams.get('active') === 'true';

    let where = {};

    // Filter by banner type
    if (bannerType) {
      where.bannerType = bannerType;
    }

    // Filter by status
    if (status) {
      where.status = status;
    } else if (!isAdmin) {
      // If not admin, show only active
      where.status = 'active';
    }

    // Filter by active period
    if (activeOnly) {
      const now = new Date();
      where.startDate = { lte: now };
      where.endDate = { gte: now };
      where.status = 'active';
    }

    const advertisements = await prisma.advertisement.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    });

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
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['imageUrl', 'destinationLink', 'bannerType', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

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
    const advertisement = await prisma.advertisement.create({
      data: {
        imageUrl: body.imageUrl,
        destinationLink: body.destinationLink,
        bannerType: body.bannerType,
        startDate,
        endDate,
        priority: body.priority || 0,
        popupDisplayAfter: body.popupDisplayAfter || 5,
        popupFrequency: body.popupFrequency || 'once-per-session',
        status: 'pending',
      },
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

    return NextResponse.json(
      { success: false, error: 'Error creating request' },
      { status: 500 }
    );
  }
}
