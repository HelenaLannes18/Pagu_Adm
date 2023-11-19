"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TesteColumn = {
  id: string;
  status: string;
  user: string;
  unitprice: string;
  quantity: string;
  createdAt: string;
}

export const columns: ColumnDef<TesteColumn>[] = [
  {
    accessorKey: "user",
    header: "Comprador",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "unitprice",
    header: "Unit Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
