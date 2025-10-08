
import Link from 'next/link';
import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/ieee.udict.mgmu', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-muted-foreground">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center md:items-start">
            <Logo />
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/#team" className="hover:text-primary transition-colors">Our Team</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>IICT MGM University, Chhatrapati Sambhajinagar, Maharashtra 431003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@ieee-mgm.com" className="hover:text-primary transition-colors">info@ieee-mgm.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-sm">
            <div className="mb-8">
                <h4 className="font-headline text-lg font-semibold text-foreground mb-4 text-center">Proudly Affiliated With</h4>
                <div className="flex justify-center items-center gap-8">
                    <Link href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer" className="relative h-12 w-28 transition-transform hover:scale-105">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" alt="IEEE Logo" fill className="object-contain" />
                    </Link>
                    <Link href="https://www.mgmu.ac.in/" target="_blank" rel="noopener noreferrer" className="relative h-16 w-32 transition-transform hover:scale-105">
                        <Image src="https://cdn.mgmtech.org/static/mgmu.ac.in/assets/images/LogoMGM.svg" alt="MGM University Logo" fill className="object-contain" />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="md:ml-12">&copy; {new Date().getFullYear()} IEEE Student Branch, IICT MGMU. All Rights Reserved.</p>
              <div className="flex items-center gap-4 md:mr-12">
                  <div className="flex space-x-6">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </Link>
                    ))}
                  </div>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
