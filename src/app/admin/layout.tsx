
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Ticket,
  Shield,
  LayoutDashboard,
  Users as UsersIcon,
} from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/lib/data';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    href: '/admin/users',
    icon: UsersIcon,
    label: 'User Management',
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const admin = users.find(u => u.role === 'admin');

   const getInitials = (name?: string) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2">
            <Ticket className="w-7 h-7 text-primary" />
            <h1 className="text-xl font-bold font-headline">TicketTrack Admin</h1>
        </div>
        
        <nav className="ml-4 flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors ${pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
        </nav>
        
        <div className="ml-auto flex items-center gap-2">
            <div className='flex items-center gap-2 border-l pl-2'>
            <Shield size={16} className="text-destructive"/>
            <p className='text-sm font-semibold'>Admin Mode</p>
            </div>
            
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={admin?.avatar}
                      alt="Admin Avatar"
                    />
                    <AvatarFallback>{getInitials(admin?.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{admin?.name || 'Admin'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            {children}
      </main>
    </div>
  );
}
