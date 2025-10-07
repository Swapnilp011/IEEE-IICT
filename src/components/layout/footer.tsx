import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/logo';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Fostering technological innovation and excellence.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/events" className="hover:text-primary">Events</Link></li>
              <li><Link href="/team" className="hover:text-primary">Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>MGM University, Chhatrapati Sambhajinagar, Maharashtra 431003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@ieee-mgm.com" className="hover:text-primary">info@ieee-mgm.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} aria-label={label} className="hover:text-primary">
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} IEEE Student Branch, IICT MGMU. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
