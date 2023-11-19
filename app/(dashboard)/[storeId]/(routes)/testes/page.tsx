import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { TesteColumn } from "./components/testes"
import { TesteClient } from "./components/client";
import { ptBR } from 'date-fns/locale';


const TestesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const testes = await prismadb.teste.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  //@ts-ignore
  const formattedTestes: TesteColumn[] = testes.map((item) => ({
    id: item.id,
    status: item.status,
    user: item.user,
    title: item.title,
    unitprice: item.unitprice,
    quantity: item.quantity,
    createdAt: format(item.createdAt, "'Dia' do MMMM, yyyy", { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TesteClient data={formattedTestes} />
      </div>
    </div>
  );
};

export default TestesPage;
