import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { cupomId: string } }
) {
  try {
    if (!params.cupomId) {
      return new NextResponse('cupom id is required', { status: 400 });
    }

    const cupom = await prismadb.cupom.findUnique({
      where: {
        id: params.cupomId,
      },
    });

    return NextResponse.json(cupom);
  } catch (error) {
    console.log('[CUPOM_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { cupomId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.cupomId) {
      return new NextResponse('cupom id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const cupom = await prismadb.cupom.delete({
      where: {
        id: params.cupomId,
      },
    });

    return NextResponse.json(cupom);
  } catch (error) {
    console.log('[CUPOM_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { cupomId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { ticket, desconto } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!ticket) {
      return new NextResponse('ticket is required', { status: 400 });
    }

    if (!desconto) {
      return new NextResponse('desconto is required', { status: 400 });
    }

    if (!params.cupomId) {
      return new NextResponse('cupom id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const cupom = await prismadb.cupom.update({
      where: {
        id: params.cupomId,
      },
      data: {
        ticket,
        desconto,
      },
    });

    return NextResponse.json(cupom);
  } catch (error) {
    console.log('[CUPOM_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
