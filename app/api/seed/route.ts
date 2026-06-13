import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { projects } from '@/data/projects';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if there are already projects to prevent duplicate seeding
    const count = await Project.countDocuments();
    if (count > 0) {
       return NextResponse.json({ success: true, message: "Database already has projects. Skipping seed." });
    }

    // Insert the static projects
    await Project.insertMany(projects);
    return NextResponse.json({ success: true, message: "Static projects successfully migrated to the database!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to seed database', details: error.message }, { status: 500 });
  }
}
