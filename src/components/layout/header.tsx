'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#events', label: 'Events' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#team', label: 'Team' },
  { href: '/#contact', label: 'Contact' },
  { href: '/#admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
      // If no section is in view (e.g., at the very bottom), the last one should be active
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
        // If on a different page, just navigate to home and then scroll
        window.location.href = href;
        setIsMobileMenuOpen(false);
    }
  };

  const getLinkClassName = (href: string) => {
     if (pathname !== '/' || !isMounted) {
       // On non-home pages, or before mount, don't highlight any link based on scroll
        const baseHref = href.split('#')[0];
        if (baseHref === '/') { // Special case for home link
            return pathname === '/' ? 'text-primary' : 'text-muted-foreground';
        }
        return pathname.startsWith(baseHref) ? 'text-primary' : 'text-muted-foreground';
     }
     return activeLink === href ? 'text-primary' : 'text-muted-foreground';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {isMounted && navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleLinkClick(e, href)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                getLinkClassName(href)
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
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
                      'text-lg font-medium transition-colors hover:text-primary',
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
    </header>
  );
}
