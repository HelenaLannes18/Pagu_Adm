// import { NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs';
// import prismadb from '@/lib/prismadb';

// export default async function handler(
//   req: any,
//   res: any,
//   { params }: { params: { storeId: string } }
// ) {
//   if (req.method !== 'POST') {
//     res.status(405).json({ message: 'Method not allowed' });
//     return;
//   }

//   const { userId } = auth();
//   const { postalcodefrom } = req.body;

//   const { height, width, lenght, weight } = req.body;

//   const options = {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization:
//         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiJhOTFlN2VkYzYyZTZjNmY2MWI0YWExNTE3ZjkwYzYzMDExMTgzOGM5MGE0YzI5ODkyZWJlMjgxYWUwMWM5ZGVmZDk4ODJkYWJiNjU1NzhmMyIsImlhdCI6MTY5MTQzOTQ5Mi4xMTYyMjUsIm5iZiI6MTY5MTQzOTQ5Mi4xMTYyMjgsImV4cCI6MTcyMzA2MTg5Mi4wOTc3ODgsInN1YiI6Ijk5ZDVlMTdhLWQwMjgtNGE0Ny05ZWViLWI1MTUyMzFlN2VjNyIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.aXRk2BciLlyOg9hmMMEdzmxCS9ta-Pn2_rm796jmMpdHFqZqwyNpsO1tsdy8mbbWvHr8NWAd16LrS_hUVA022my_hIlxLVedTskMw8EnIHd75rgBnuntdVjqZgUNmxvDu9vP0vepOOQf3ZMkPpCoueq0ARPqr8TF_Rn4_KoyLWwtgkwSxw-PRvOo5idrlOCoZQbt_m_W--FoX8LKEVFls4fzNaejsO6whvtl74OnTOqr7IQ5wEssbJ5tSUF_u-gQguf8aAuKxfMIaMZpfdwhN23Hx-TSdRN4vF48ITfc3F_xF0gzUYCQlU13ecpSOkeglA2xeUSFw-oNc3ZtivatyDV-43mwArkRC6SeLN_6jMhoG6rshMGchHPlAJVA9twztFeOkLPSnbOP7llRQJygPo1Sb_iWT3BLFBPaOF_HzKneTeA3VFKYbLeHxgyU_lUYPjfAwiyUIQIfBX3K1Fv3_AF4lSf3TE8Qg4uv_4PJv8vcAP7iM1k0B0O-MccK8VB9nlA_y1TxnUgGlfnKA-AHo6OzekEaTUXM7soh9tuTcXt0nI-M2GSz9x81siNGZDhDgAxLfT8ni4zrSR88shzDW7yt6F_vXMcKLJGRHk1irchvRJiNND9oYPT5OCRFFhvmSPhOQufJHx_70mNL-0rD7hq9zP3350oh1kVu6QsW-6s',
//       'User-Agent': 'Aplicação pagu@email.com',
//     },
//     body: JSON.stringify({
//       from: {
//         postal_code: '36700052',
//       },
//       to: {
//         postal_code: '36700052',
//       },
//       package: {
//         height: 12,
//         width: 12,
//         length: 12,
//         weight: 12,
//       },
//       services: '1,2,3,4,7,11',
//     }),
//   };

//   try {
//     const response = await fetch(
//       'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',
//       options
//     );
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }

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
