import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await req.json();

    const { address, userLast, user, email, cep, complemento, cidade, estado } =
      body;

    const url = new URL(req.url);
    const orderId = url.searchParams.get('orderId');

    if (!address) {
      return new NextResponse('Address is required', { status: 400 });
    }

    if (!userLast) {
      return new NextResponse('UserLast is required', { status: 400 });
    }

    if (!user) {
      return new NextResponse('User is required', { status: 400 });
    }

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    if (!cep) {
      return new NextResponse('Cep is required', { status: 400 });
    }

    if (!complemento) {
      return new NextResponse('Complemento is required', { status: 400 });
    }

    if (!cidade) {
      return new NextResponse('Cidade is required', { status: 400 });
    }

    if (!estado) {
      return new NextResponse('Estado is required', { status: 400 });
    }

    const teste = await prismadb.teste.update({
      where: {
        //@ts-ignore
        id: orderId,
      },
      data: {
        user,
        userLast,
        address,
        email,
        cep,
        complemento,
        cidade,
        estado,
        // productId,
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
