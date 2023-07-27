
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { TabelasClient } from "./components/client";
import { TabelaColumn } from "./components/columns";
import htmlParser from 'react-html-parser';



const TabelaPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const tabelas = await prismadb.tabela.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  //@ts-ignore
  const formattedTabelas: TabelaColumn[] = tabelas.map((item) => ({
    id: item.id,
    name: htmlParser(item.name),
    createdAt: format(item.createdAt, "'Dia' do MMMM, yyyy", { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TabelasClient data={formattedTabelas} />
      </div>
    </div>
  );
};

export default TabelaPage;
