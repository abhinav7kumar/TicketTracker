'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { tickets } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  notifications: z.object({
    newReplies: z.boolean().default(true),
    statusUpdates: z.boolean().default(true),
    newTickets: z.boolean().default(false),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  notifications: {
    newReplies: true,
    statusUpdates: true,
    newTickets: false,
  },
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    console.log(data);
    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your account settings have been saved.',
      });
      setIsSubmitting(false);
    }, 1500);
  }

  const userTickets = tickets.filter((t) => t.createdBy === 'user-1');
  const openTickets = userTickets.filter(
    (t) => t.status === 'Open' || t.status === 'In Progress'
  ).length;
  const resolvedTickets = userTickets.filter(
    (t) => t.status === 'Resolved'
  ).length;
  const closedTickets = userTickets.filter(
    (t) => t.status === 'Closed'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          User Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTickets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolved Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedTickets}</div>
          </CardContent>
        </Card>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your email notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="notifications.newReplies"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <FormLabel className="text-base">New Replies</FormLabel>
                      <FormDescription>
                        Receive an email when someone replies to your ticket.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifications.statusUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <FormLabel className="text-base">
                        Status Updates
                      </FormLabel>
                      <FormDescription>
                        Get notified when the status of your ticket changes.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notifications.newTickets"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <FormLabel className="text-base">
                        Ticket Creation
                      </FormLabel>
                      <FormDescription>
                        Receive a confirmation email when you create a new
                        ticket.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
