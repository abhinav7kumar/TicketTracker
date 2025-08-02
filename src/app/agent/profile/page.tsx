
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
import { tickets, users } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  avatar: z.string().optional(),
  notifications: z.object({
    newReplies: z.boolean().default(true),
    statusUpdates: z.boolean().default(true),
    newTickets: z.boolean().default(false),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const agentId = 'agent-1';

const defaultValues: ProfileFormValues = {
  name: users.find(u => u.id === agentId)?.name || 'Agent',
  email: users.find(u => u.id === agentId)?.email || 'agent@example.com',
  avatar: users.find(u => u.id === agentId)?.avatar || '',
  notifications: {
    newReplies: true,
    statusUpdates: true,
    newTickets: true,
  },
};

export default function AgentProfilePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStoredProfile = () => {
    if (typeof window !== 'undefined') {
      const storedProfile = localStorage.getItem('agentProfile');
      if (storedProfile) {
        try {
          return JSON.parse(storedProfile);
        } catch (e) {
          console.error("Failed to parse agent profile from localStorage", e);
          return defaultValues;
        }
      }
    }
    return defaultValues;
  };
  
  const [profile, setProfile] = useState<ProfileFormValues>(getStoredProfile);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profile,
    mode: 'onChange',
  });
  
  useEffect(() => {
    setIsMounted(true);
    form.reset(getStoredProfile());
  }, [form]);

  useEffect(() => {
    form.reset(profile);
  }, [profile, form]);


  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    console.log(data);
    
    localStorage.setItem('agentProfile', JSON.stringify(data));
    setProfile(data);

    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your account settings have been saved.',
      });
      setIsSubmitting(false);
    }, 1500);
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        const updatedProfile = { ...profile, avatar: newAvatarUrl };
        setProfile(updatedProfile);
        form.setValue('avatar', newAvatarUrl, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };


  const agentTickets = tickets.filter((t) => t.assignedTo === agentId);
  const resolvedTickets = agentTickets.filter(
    (t) => t.status === 'Resolved'
  ).length;
  const closedTickets = agentTickets.filter(
    (t) => t.status === 'Closed'
  ).length;

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Agent Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentTickets.length}</div>
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
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}>
                  Change Photo
                </Button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                />
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
                        Receive an email when a user replies to a ticket you're assigned to.
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
                        Get notified when a ticket status changes.
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
                        New Ticket Alerts
                      </FormLabel>
                      <FormDescription>
                        Receive an email when a new ticket is created in the system.
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
            <Button type="submit" disabled={isSubmitting || !form.formState.isDirty}>
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
