
'use client';

import { useAuth } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function UserProfileButton({ className }: { className?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled className={cn(className)}>
        <User className="h-5 w-5 animate-pulse" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" size="icon" className={cn("hover:bg-slate-100 hover:text-primary", className)}>
        <Link href="/login">
          <User className="h-5 w-5" />
          <span className="sr-only">Log in</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/join')}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Join Branch</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
