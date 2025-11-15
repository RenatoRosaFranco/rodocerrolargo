import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET - List all taxi drivers (filter only approved if not admin)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const isAdmin = searchParams.get('admin') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    let where = {};

    if (status) {
      where.status = status;
    } else if (!isAdmin) {
      // If not admin, show only approved
      where.status = 'approved';
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.taxiDriver.count({ where });

    const taxiDrivers = await prisma.taxiDriver.findMany({
      where,
      orderBy: {
        registrationDate: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: taxiDrivers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching taxi drivers:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching taxi drivers' },
      { status: 500 }
    );
  }
}

// POST - Create new taxi driver registration (pending status)
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'whatsapp'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create taxi driver with pending status
    const taxiDriver = await prisma.taxiDriver.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        description: body.description || null,
        photo: body.photo || null,
        status: 'pending',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Awaiting approval.',
        data: taxiDriver,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating taxi driver:', error);

    // Handle unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error creating registration' },
      { status: 500 }
    );
  }
}
