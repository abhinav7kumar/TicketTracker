import { notFound } from 'next/navigation';
import { tickets, users } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { CommentSection } from './components/comment-section';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  Open: 'default',
  'In Progress': 'secondary',
  Resolved: 'outline',
  Closed: 'destructive',
};

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === params.id);

  if (!ticket) {
    notFound();
  }

  const author = users.find((u) => u.id === ticket.createdBy);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant={statusVariantMap[ticket.status]} className="mb-2">
                  {ticket.status}
                </Badge>
                <CardTitle className="font-headline text-3xl">{ticket.subject}</CardTitle>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Ticket ID: {ticket.id}</p>
                <p>Category: {ticket.category}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <p>{ticket.description}</p>
            </div>
            {ticket.status === 'Resolved' && (
              <div className="mt-6 border-t pt-4">
                 <h3 className="text-lg font-semibold mb-2">Was this resolution helpful?</h3>
                 <div className="flex gap-2">
                    <Button variant="outline" size="icon"><ThumbsUp className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><ThumbsDown className="h-4 w-4" /></Button>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>

        <CommentSection comments={ticket.comments} />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created By</span>
              <span>{author?.name || 'Unknown User'}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created At</span>
              <span>{format(new Date(ticket.createdAt), 'PPp')}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Modified</span>
              <span>{format(new Date(ticket.lastModified), 'PPp')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
