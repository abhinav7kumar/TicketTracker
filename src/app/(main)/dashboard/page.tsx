import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tickets, users } from '@/lib/data';
import TicketDataTable from './components/ticket-data-table';

export default function DashboardPage() {
  const userTickets = tickets.filter((t) => t.createdBy === 'user-1');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Tickets
          </h1>
          <p className="text-muted-foreground">
            View, manage, and track your support tickets.
          </p>
        </div>
        <Button asChild>
          <Link href="/tickets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Ticket
          </Link>
        </Button>
      </div>
      <TicketDataTable data={userTickets} />
    </div>
  );
}
