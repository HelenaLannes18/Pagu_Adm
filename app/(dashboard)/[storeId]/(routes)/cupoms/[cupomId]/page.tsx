import prismadb from "@/lib/prismadb";

import { CupomForm } from "./components/cupom-form";

const CupomPage = async ({
  params
}: {
  params: { cupomId: string }
}) => {
  const cupom = await prismadb.cupom.findUnique({
    where: {
      id: params.cupomId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CupomForm initialData={cupom} />
      </div>
    </div>
  );
}

export default CupomPage;
