
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { users, tickets } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ArrowLeft, Mail, Calendar, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserTicketHistoryTable } from './components/user-ticket-history-table';

const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map((n) => n[0]).join('');
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const userTickets = tickets.filter((ticket) => ticket.createdBy === user.id);

  return (
    <div className="space-y-6">
       <Button variant="outline" asChild>
          <Link href="/agent/users">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Users
          </Link>
        </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-3xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
               <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
               </div>
               <Separator />
                <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Registration Date</span>
                        <span className="text-muted-foreground">
                            {format(new Date(user.registrationDate), 'PP')}
                        </span>
                    </div>
                </div>
                 <Separator />
                <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                        <span className="font-medium">Last Login</span>
                        <span className="text-muted-foreground">
                            {format(new Date(user.lastLogin), 'PPp')}
                        </span>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Ticket History</CardTitle>
                    <CardDescription>A list of all tickets submitted by {user.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserTicketHistoryTable data={userTickets} />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
