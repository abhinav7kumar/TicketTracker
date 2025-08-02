
"use client";

import { useRouter } from "next/navigation";
import { AtSign, KeyRound, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required." }),
});

// In a real app, you would fetch admin credentials securely.
const ADMIN_EMAIL = "admin@tickettrack.com";
const ADMIN_PASSWORD = "adminpassword"; // Use a strong, hashed password in production

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      toast({
        title: "Admin Login Successful",
        description: "Redirecting to the Admin Dashboard.",
      });
      router.push("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-destructive/10 p-4">
      <Card className="w-full max-w-md shadow-2xl border-destructive">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/90 text-destructive-foreground rounded-full p-3 w-fit">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-headline mt-4">TicketTrack</h1>
          <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
          <CardDescription>
            This area is for authorized personnel only.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="admin@tickettrack.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" variant="destructive">
                Sign In as Admin
              </Button>
               <Button variant="link" asChild className="p-0 text-sm">
                  <Link href="/login">Return to main login</Link>
                </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
