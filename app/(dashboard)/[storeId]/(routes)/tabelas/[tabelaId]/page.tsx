import prismadb from "@/lib/prismadb";

import { TabelaForm } from "./components/tabela-form";

const TabelaPage = async ({
    params
}: {
    params: { tabelaId: string }
}) => {
    const tabela = await prismadb.tabela.findUnique({
        where: {
            id: params.tabelaId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TabelaForm initialData={tabela} />
            </div>
        </div>
    );
}

export default TabelaPage;
