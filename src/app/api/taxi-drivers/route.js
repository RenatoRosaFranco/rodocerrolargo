import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TaxiDriver from '@/models/TaxiDriver';

// GET - List all taxi drivers (filter only approved if not admin)
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const isAdmin = searchParams.get('admin') === 'true';

    let query = {};

    if (status) {
      query.status = status;
    } else if (!isAdmin) {
      // If not admin, show only approved
      query.status = 'approved';
    }

    const taxiDrivers = await TaxiDriver.find(query)
      .sort({ registrationDate: -1 })
      .select('-__v');

    return NextResponse.json({
      success: true,
      data: taxiDrivers,
      total: taxiDrivers.length,
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
    await dbConnect();

    const body = await request.json();

    // Remove fields that should not be sent by user
    delete body.status;
    delete body.approvalDate;
    delete body.approvedBy;
    delete body.rejectionReason;

    // Create taxi driver with pending status
    const taxiDriver = await TaxiDriver.create({
      ...body,
      status: 'pending',
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

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: messages.join(', ') },
        { status: 400 }
      );
    }

    // Handle duplicate errors
    if (error.code === 11000) {
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
