
'use client';
import { tickets, users } from '@/lib/data';
import AgentTicketDataTable from './components/agent-ticket-data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AgentDashboardPage() {
  // In a real app, you'd get the current agent's ID from session/auth
  const currentAgentId = 'agent-1';

  const myTickets = tickets.filter((t) => t.assignedTo === currentAgentId);
  const allTickets = tickets;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Support Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and resolve customer support tickets.
          </p>
        </div>
      </div>
      <Tabs defaultValue="my-tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="my-tickets">
           <AgentTicketDataTable data={myTickets} agents={users.filter(u => u.role === 'agent')} />
        </TabsContent>
        <TabsContent value="all-tickets">
           <AgentTicketDataTable data={allTickets} agents={users.filter(u => u.role === 'agent')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
