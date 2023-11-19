import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    const { status, title, unitprice, quantity, user } = body;

    if (!status) {
      return new NextResponse('Status is required', { status: 400 });
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 });
    }

    if (!unitprice) {
      return new NextResponse('Unitprice is required', { status: 400 });
    }

    if (!quantity) {
      return new NextResponse('Quantity is required', { status: 400 });
    }

    if (!user) {
      return new NextResponse('User is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const teste = await prismadb.teste.create({
      data: {
        status,
        user,
        title,
        unitprice,
        quantity,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(teste);
  } catch (error) {
    console.log('[TESTES_POST]', error);
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

    const testes = await prismadb.teste.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(testes);
  } catch (error) {
    console.log('[TESTES_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
