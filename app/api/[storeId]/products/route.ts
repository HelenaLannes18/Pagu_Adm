import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      height,
      width,
      lenght,
      weight,
      pricepromotional,
      categoryId,
      colorId,
      sizeId,
      tabelaId,
      images,
      isFeatured,
      isPromotioned,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!height) {
      return new NextResponse('Height is required', { status: 400 });
    }

    if (!lenght) {
      return new NextResponse('lenght is required', { status: 400 });
    }

    if (!height) {
      return new NextResponse('Height is required', { status: 400 });
    }

    if (!width) {
      return new NextResponse('Width is required', { status: 400 });
    }

    // if (!pricepromotional) {
    //   return new NextResponse('PricePromotional is required', { status: 400 });
    // }

    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 });
    }


    if (!sizeId) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    if (!tabelaId) {
      return new NextResponse('TabelaId id is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        height,
        lenght,
        width,
        weight,
        pricepromotional,
        isFeatured,
        isPromotioned,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        tabelaId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const tabelaId = searchParams.get('tabelaId') || undefined;
    const isFeatured = searchParams.get('isFeatured');
    const isPromotioned = searchParams.get('isPromotioned');
    const searchQuery = searchParams.get('searchQuery') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '9999');

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        name: {
          contains: searchQuery,
          mode: 'insensitive',
        },
        categoryId,
        colorId,
        sizeId,
        tabelaId,
        isFeatured: isFeatured ? true : undefined,
        isPromotioned: isPromotioned ? true : undefined,
        isArchived: false,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        tabela: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
