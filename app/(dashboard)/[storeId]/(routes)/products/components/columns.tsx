"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string;
  price: string;
  height: string;
  width: string;
  lenght: string;
  weight: string;
  pricepromotional: string;
  category: string;
  size: string;
  // tabela: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isPromotioned: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isArchived",
    header: "Arquivado",
  },
  {
    accessorKey: "isFeatured",
    header: "Principal",
  },
  {
    accessorKey: "isPromotioned",
    header: "Promocional",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "pricepromotional",
    header: "Preço Promocional",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  // {
  //   accessorKey: "tabela",
  //   header: "Tabela",
  // },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
