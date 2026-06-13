import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const deletedProject = await Project.deleteOne({ _id: id });
    if (!deletedProject.deletedCount) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 400 });
  }
}
