"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, TesteColumn } from "./testes";

interface TesteClientProps {
  data: TesteColumn[];
}

export const TesteClient: React.FC<TesteClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Pedidos (${data.length})`} description="Controle os pedidos da sua loja" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
