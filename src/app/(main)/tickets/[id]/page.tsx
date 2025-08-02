
'use client';

import { notFound, usePathname } from 'next/navigation';
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
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Ticket } from '@/lib/types';

const statusVariantMap: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  Open: 'default',
  'In Progress': 'secondary',
  Resolved: 'outline',
  Closed: 'destructive',
};

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const ticket = tickets.find((t) => t.id === params.id);
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<'upvote' | 'downvote' | null>(ticket?.feedback || null);

  if (!ticket) {
    notFound();
  }
  
  // Determine role based on the current URL path
  const role = pathname.includes('/agent/') ? 'agent' : 'user';

  const handleFeedback = (newFeedback: 'upvote' | 'downvote') => {
    if (feedback === newFeedback) {
      // If user clicks the same button again, deselect it.
      setFeedback(null);
      if (ticket) ticket.feedback = undefined;
      toast({
        title: 'Feedback Removed',
        description: 'Your feedback has been withdrawn.',
      });
    } else {
      setFeedback(newFeedback);
       if (ticket) ticket.feedback = newFeedback;
      toast({
        title: 'Thank you for your feedback!',
        description: 'We appreciate you helping us improve our support.',
      });
    }
  };


  const author = users.find((u) => u.id === ticket.createdBy);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <Badge variant={statusVariantMap[ticket.status as Ticket['status']]} className="mb-2">
                  {ticket.status}
                </Badge>
                <CardTitle className="font-headline text-2xl sm:text-3xl">{ticket.subject}</CardTitle>
              </div>
              <div className="text-left sm:text-right text-sm text-muted-foreground">
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
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleFeedback('upvote')}
                      className={cn(feedback === 'upvote' && 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200')}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleFeedback('downvote')}
                      className={cn(feedback === 'downvote' && 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200')}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>

        <CommentSection comments={ticket.comments} ticketId={ticket.id} role={role}/>
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
