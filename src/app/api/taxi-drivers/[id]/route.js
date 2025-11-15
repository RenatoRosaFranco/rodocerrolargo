import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get specific taxi driver
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const taxiDriver = await prisma.taxiDriver.findUnique({
      where: { id },
    });

    if (!taxiDriver) {
      return NextResponse.json(
        { success: false, error: 'Taxi driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: taxiDriver,
    });
  } catch (error) {
    console.error('Error fetching taxi driver:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching taxi driver' },
      { status: 500 }
    );
  }
}

// PATCH - Update taxi driver status (approve/reject)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, rejectionReason, adminPassword } = body;

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin password' },
        { status: 401 }
      );
    }

    // Validate status
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {
      status,
      approvalDate: status === 'approved' ? new Date() : null,
      approvedBy: 'Admin',
    };

    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const taxiDriver = await prisma.taxiDriver.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: `Registration ${status === 'approved' ? 'approved' : 'rejected'} successfully!`,
      data: taxiDriver,
    });
  } catch (error) {
    console.error('Error updating taxi driver:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Taxi driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error updating registration' },
      { status: 500 }
    );
  }
}

// DELETE - Remove taxi driver
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const adminPassword = searchParams.get('adminPassword');

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin password' },
        { status: 401 }
      );
    }

    await prisma.taxiDriver.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration removed successfully!',
    });
  } catch (error) {
    console.error('Error deleting taxi driver:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Taxi driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error removing registration' },
      { status: 500 }
    );
  }
}
