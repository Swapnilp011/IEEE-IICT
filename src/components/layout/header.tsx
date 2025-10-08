
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, LogOut, Menu, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#events', label: 'Events' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#team', label: 'Team' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, loading } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || pathname !== '/') return;

    setActiveLink('/#home');

    const handleScroll = () => {
      const sections = navLinks
        .map(link => (link.href.startsWith('/#') ? document.getElementById(link.href.substring(2)) : null))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      let currentSection = '/#home';
      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          currentSection = `/#${section.id}`;
          break;
        }
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          const lastLink = navLinks[navLinks.length - 1];
          if(lastLink.href.startsWith('/#')){
            currentSection = lastLink.href;
          }
      }


      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active link

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
        e.preventDefault();
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 64, // 64 is header height
            behavior: 'smooth',
          });
        }
        setActiveLink(href);
        setIsMobileMenuOpen(false);
    } else {
        window.location.href = href;
        setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully.' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Error',
        description: error.message,
      });
    }
  };

  const getLinkClassName = (href: string) => {
     if (pathname !== '/' || !isMounted) {
        const baseHref = href.split('#')[0];
        if (baseHref === '/') { 
            return pathname === '/' ? 'text-primary' : 'hover:text-primary';
        }
        return pathname.startsWith(baseHref) ? 'text-primary' : 'hover:text-primary';
     }
     return activeLink === href ? 'text-primary font-semibold' : 'hover:text-primary';
  }

  const renderAuthControls = () => {
    if (loading) {
      return <Button variant="ghost" size="sm" disabled>Loading...</Button>;
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/join">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Member Area</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button asChild size="default" variant="outline">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
            <nav className="hidden text-foreground md:flex md:items-center md:gap-6">
            {isMounted && navLinks.map(({ href, label }) => (
                <Link
                key={href}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className={cn(
                    'text-base font-medium transition-colors',
                    getLinkClassName(href)
                )}
                >
                {label}
                </Link>
            ))}
            </nav>

            <div className="flex items-center gap-2">
              {isMounted && renderAuthControls()}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="pr-0 bg-background/95">
                  <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                          <Logo />
                      </Link>
                  </div>
                  <div className="mt-8 flex flex-col gap-4">
                      {isMounted && navLinks.map(({ href, label }) => (
                      <Link
                          key={href}
                          href={href}
                          onClick={(e) => handleLinkClick(e, href)}
                          className={cn(
                          'text-lg font-medium transition-colors',
                          getLinkClassName(href)
                          )}
                      >
                          {label}
                      </Link>
                      ))}
                  </div>
                  </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
