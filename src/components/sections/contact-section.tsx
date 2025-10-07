
import { Mail, Phone, MapPin, Linkedin, Instagram, Globe } from 'lucide-react';
import ContactForm from '@/app/contact/contact-form';

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: 'Email',
    value: 'info@ieee-mgm.com',
    href: 'mailto:info@ieee-mgm.com',
  },
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    title: 'Phone',
    value: '(123) 456-7890',
    href: 'tel:+1234567890',
  },
  {
    icon: <MapPin className="h-5 w-5 text-primary" />,
    title: 'Address',
    value: 'IICT, MGM University, Chhatrapati Sambhajinagar',
  },
];

const socialLinks = [
    {
        icon: <Linkedin className="h-6 w-6" />,
        href: '#',
        label: 'LinkedIn'
    },
    {
        icon: <Instagram className="h-6 w-6" />,
        href: 'https://www.instagram.com/ieee.udict.mgmu',
        label: 'Instagram'
    },
    {
        icon: <Globe className="h-6 w-6" />,
        href: 'https://mgmu.ac.in/',
        label: 'University Website'
    }
]

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 rounded-xl border bg-card text-card-foreground shadow-lg p-8 md:p-12">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl text-primary">
                Get in Touch
              </h1>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Have a question or want to collaborate? Send us a message, and we'll get back to you soon.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
                <h3 className="font-headline text-xl font-semibold mb-4">Contact Details</h3>
                <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        {link.icon}
                        <span className="sr-only">{link.label}</span>
                    </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
