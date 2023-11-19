import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
  req: Request,
  { params }: { params: { tabelaId: string } }
) {
  try {
    if (!params.tabelaId) {
      return new NextResponse('Tabela id is required', { status: 400 });
    }

    const tabela = await prismadb.tabela.findUnique({
      where: {
        id: params.tabelaId,
      },
    });

    return NextResponse.json(tabela);
  } catch (error) {
    console.log('[TABELA_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tabelaId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.tabelaId) {
      return new NextResponse('Tabela id is required', { status: 400 });
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

    const tabela = await prismadb.tabela.delete({
      where: {
        id: params.tabelaId,
      },
    });

    return NextResponse.json(tabela);
  } catch (error) {
    console.log('[TABELA_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { tabelaId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.tabelaId) {
      return new NextResponse('Tabela id is required', { status: 400 });
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

    const tabela = await prismadb.tabela.update({
      where: {
        id: params.tabelaId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(tabela);
  } catch (error) {
    console.log('[TABELA_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
