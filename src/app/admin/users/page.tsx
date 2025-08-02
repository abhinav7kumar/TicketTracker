
import { users, tickets } from '@/lib/data';
import AdminUserDataTable from './components/admin-user-data-table';
import type { UserWithTicketCount } from './components/admin-user-data-table';

export default function AdminUsersPage() {

  const usersWithTicketData: UserWithTicketCount[] = users.map((user) => {
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
          View, edit, and manage all users in the system.
        </p>
      </div>
      <AdminUserDataTable data={usersWithTicketData} />
    </div>
  );
}
