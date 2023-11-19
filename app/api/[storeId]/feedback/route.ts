import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    const { text, star } = body;


    if (!text) {
      return new NextResponse('text is required', { status: 400 });
    }

    if (!star) {
      return new NextResponse('star is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const feedback = await prismadb.feedback.create({
      data: {
        text,
        star,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.log('[FEEDBACKS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const feedbacks = await prismadb.feedback.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.log('[FEEDBACKS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
