
'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { Comment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { addCommentAction } from '../../actions';

export function CommentSection({ comments, ticketId, role }: { comments: Comment[], ticketId: string, role: 'user' | 'agent' }) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // In a real app, you'd get the current user/agent ID from the session
    const authorId = role === 'agent' ? 'agent-1' : 'user-1';

    const result = await addCommentAction({
      ticketId,
      content: newComment,
      authorId,
    });
    
    if (result.success) {
      toast({
        title: 'Reply Added',
        description: 'Your reply has been posted.',
      });
      setNewComment('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not post your reply.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Replies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback>
                    {comment.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{comment.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none mt-1">
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No replies yet.</p>
          )}
        </div>

        <form onSubmit={handleAddComment} className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-2">Add your reply</h3>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your reply here..."
            className="min-h-[120px]"
            disabled={isSubmitting}
          />
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Post Reply
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
