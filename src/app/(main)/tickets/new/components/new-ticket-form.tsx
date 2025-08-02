'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Bot, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { suggestTagsAction } from '../../actions';

const formSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  category: z.enum(['Billing', 'Technical Support', 'General Inquiry', 'Bug Report']),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  attachments: z.any().optional(),
});

export default function NewTicketForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Ticket Created!',
        description: 'Your new ticket has been successfully submitted.',
      });
      router.push('/dashboard');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleSuggestTags = async () => {
    const description = form.getValues('description');
    if (!description || description.length < 20) {
      toast({
        variant: 'destructive',
        title: 'Description too short',
        description: 'Please enter a description of at least 20 characters to get suggestions.',
      });
      return;
    }
    
    setIsSuggesting(true);
    setSuggestedTags([]);

    const result = await suggestTagsAction({ newTicketDescription: description });
    
    if (result.success && result.data) {
      setSuggestedTags(result.data);
      toast({
        title: 'Tags suggested!',
        description: 'AI has suggested some tags for your ticket.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not suggest tags.',
      });
    }

    setIsSuggesting(false);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Ticket Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Password reset issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                      <SelectItem value="Bug Report">Bug Report</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Markdown is supported. Please be detailed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>AI Tag Suggestions</FormLabel>
              <div className="flex items-start gap-4 mt-2">
                 <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
                   {isSuggesting ? (
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   ) : (
                     <Bot className="mr-2 h-4 w-4" />
                   )}
                   Suggest Tags
                 </Button>
                 <div className="flex flex-wrap gap-2 items-center min-h-[40px]">
                   {suggestedTags.length > 0 ? (
                     suggestedTags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)
                   ) : (
                     <p className="text-sm text-muted-foreground">{isSuggesting ? 'Thinking...' : 'Click "Suggest Tags" to get AI-powered recommendations.'}</p>
                   )}
                 </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>
                    Max 5MB per file. Allowed types: png, jpg, jpeg, pdf, doc,
                    docx.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Ticket
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
