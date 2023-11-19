"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CupomColumn = {
  id: string
  ticket: any;
  desconto: any;
  createdAt: string;
}

export const columns: ColumnDef<CupomColumn>[] = [
  {
    accessorKey: "ticket",
    header: "Nome",
  },
  {
    accessorKey: "desconto",
    header: "Desconto",
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
