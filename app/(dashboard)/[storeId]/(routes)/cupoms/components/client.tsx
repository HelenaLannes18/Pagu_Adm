"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, CupomColumn } from "./columns";

interface CupomsClientProps {
  data: CupomColumn[];
}

export const CupomsClient: React.FC<CupomsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Cupons (${data.length})`} description="Controle os cupons dos seus produtos" />
        <Button onClick={() => router.push(`/${params.storeId}/cupoms/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="API" description="API Calls for cupoms" />
      <Separator />
      <ApiList entityName="cupoms" entityIdName="cupomId" /> */}
    </>
  );
};
