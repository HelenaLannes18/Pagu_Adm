import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    const { ticket, desconto } = body;


    if (!ticket) {
      return new NextResponse('ticket is required', { status: 400 });
    }

    if (!desconto) {
      return new NextResponse('desconto is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const cupom = await prismadb.cupom.create({
      data: {
        ticket,
        desconto,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(cupom);
  } catch (error) {
    console.log('[CUPOMS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

