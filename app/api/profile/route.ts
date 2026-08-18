import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { portfolioData } from '@/data/portfolio';
import { isAuthenticatedAdmin } from '@/lib/auth';

const fallbackProfile = {
  nameText: portfolioData.hero.nameText,
  headingText: portfolioData.hero.headingText,
  subheadingText: portfolioData.hero.subheadingText,
  descriptionText: portfolioData.hero.descriptionText,
  aboutTitle: portfolioData.about.title,
  greeting: portfolioData.about.greeting,
  descriptionParagraphs: portfolioData.about.descriptionParagraphs,
  infoCards: portfolioData.about.infoCards,
  resumeUrl: portfolioData.about.resumeUrl,
  resumeFilename: portfolioData.about.resumeFilename,
  imageSrc: portfolioData.about.imageSrc,
};

export async function GET() {
  try {
    await dbConnect();
    const profile = await Profile.findOne();
    if (profile) {
      return NextResponse.json({ success: true, data: profile });
    }
    return NextResponse.json({ success: true, data: fallbackProfile });
  } catch (error) {
    // If DB is offline or not configured, return fallback profile data gracefully
    return NextResponse.json({ success: true, data: fallbackProfile, fallback: true });
  }
}

export async function PUT(req: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin(req);
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const profile = await Profile.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile', details: error.message }, { status: 400 });
  }
}
