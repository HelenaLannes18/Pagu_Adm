import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { ptBR } from 'date-fns/locale';

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  //@ts-ignore
  const formattedProducts: ProductColumn[] = products
  .map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isPromotioned: item.isPromotioned,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    pricepromotional: item.pricepromotional?.toNumber()
      ? formatter.format(item.pricepromotional.toNumber())
      : null,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "'Dia' do MMMM, yyyy", { locale: ptBR }),
  }))
  .filter((product) => product.pricepromotional !== null);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
