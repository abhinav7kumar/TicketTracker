
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';

import type { Ticket } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const statusVariantMap: {
  [key: string]: 'default' | 'secondary' | 'outline' | 'destructive';
} = {
  Open: 'default',
  'In Progress': 'secondary',
  Resolved: 'outline',
  Closed: 'destructive',
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'Ticket ID',
    cell: ({ row }) => (
      <Button variant="link" asChild className="p-0 h-auto font-mono">
        <Link href={`/tickets/${row.original.id}`}>{row.getValue('id')}</Link>
      </Button>
    ),
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => <div className="font-medium">{row.getValue('subject')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge variant={statusVariantMap[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'lastModified',
    header: 'Last Modified',
    cell: ({ row }) =>
      formatDistanceToNow(new Date(row.getValue('lastModified')), {
        addSuffix: true,
      }),
  },
];

export function UserTicketHistoryTable({ data }: { data: Ticket[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="p-2 sm:p-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2 sm:p-4">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                This user has not submitted any tickets yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
