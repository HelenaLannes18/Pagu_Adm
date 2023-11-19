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

    // if (!desconto) {
    //   return new NextResponse('desconto is required', { status: 400 });
    // }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    // Consulta o banco de dados para encontrar o cupom pelo ticket
    const cupom = await prismadb.cupom.findFirst({
      where: {
        ticket,
        storeId: params.storeId,
      },
    });

    if (!cupom) {
      return new NextResponse('Cupom not found', { status: 404 });
    }

    // Compara o valor do cupom com o valor fornecido pelo usuário
    if (cupom.ticket !== ticket) {
      return new NextResponse('Invalid cupom code', { status: 400 });
    }

    return NextResponse.json({ cupom, discount: cupom.desconto });
  } catch (error) {
    console.log('[CUPOMS_POST]', error);
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

    const cupoms = await prismadb.cupom.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(cupoms);
  } catch (error) {
    console.log('[CUPOMS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
