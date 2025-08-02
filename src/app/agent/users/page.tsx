
import { users, tickets } from '@/lib/data';
import UserDataTable from './components/user-data-table';
import type { UserWithTicketCount } from './components/user-data-table';

export default function AgentUsersPage() {
  const endUsers = users.filter((user) => user.role === 'user');

  const usersWithTicketData: UserWithTicketCount[] = endUsers.map((user) => {
    const userTickets = tickets.filter((ticket) => ticket.createdBy === user.id);
    return {
      ...user,
      ticketCount: userTickets.length,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          User Management
        </h1>
        <p className="text-muted-foreground">
          View and manage all registered end-users.
        </p>
      </div>
      <UserDataTable data={usersWithTicketData} />
    </div>
  );
}
