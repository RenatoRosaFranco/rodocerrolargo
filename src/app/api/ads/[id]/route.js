import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';

// GET - Get specific advertisement
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const advertisement = await Advertisement.findById(params.id).select('-__v');

    if (!advertisement) {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: advertisement,
    });
  } catch (error) {
    console.error('Error fetching advertisement:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching advertisement' },
      { status: 500 }
    );
  }
}

// PATCH - Update advertisement
export async function PATCH(request, { params }) {
  try {
    await dbConnect();

    const body = await request.json();
    const { adminPassword, ...updateData } = body;

    // If changing status, require admin password
    if (updateData.status && updateData.status !== 'pending') {
      if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json(
          { success: false, error: 'Invalid admin password' },
          { status: 401 }
        );
      }

      // Add approval info
      if (updateData.status === 'active') {
        updateData.approvalDate = new Date();
        updateData.approvedBy = 'Admin';
      }
    }

    const advertisement = await Advertisement.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!advertisement) {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Advertisement updated successfully!',
      data: advertisement,
    });
  } catch (error) {
    console.error('Error updating advertisement:', error);
    return NextResponse.json(
      { success: false, error: 'Error updating advertisement' },
      { status: 500 }
    );
  }
}

// DELETE - Remove advertisement
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const adminPassword = searchParams.get('adminPassword');

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin password' },
        { status: 401 }
      );
    }

    const advertisement = await Advertisement.findByIdAndDelete(params.id);

    if (!advertisement) {
      return NextResponse.json(
        { success: false, error: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Advertisement removed successfully!',
    });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    return NextResponse.json(
      { success: false, error: 'Error removing advertisement' },
      { status: 500 }
    );
  }
}
