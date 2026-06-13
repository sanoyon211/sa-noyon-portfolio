import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    // Basic auth check
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 400 });
  }
}
