import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import prismadb from "@/lib/prismadb";

import { CupomColumn } from "./components/columns"
import { CupomsClient } from "./components/client";

const CupomsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const cupoms = await prismadb.cupom.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCupoms: CupomColumn[] = cupoms.map((item) => ({
    id: item.id,
    ticket: item.ticket,
    desconto: item.desconto,
    createdAt: format(item.createdAt, "'Dia' do MMMM, yyyy", { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CupomsClient data={formattedCupoms} />
      </div>
    </div>
  );
};

export default CupomsPage;
