
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import ContactForm from '@/app/contact/contact-form';

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: 'Address',
    value: 'IICT, MGM University, Chhatrapati Sambhajinagar, Maharashtra 431003',
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: 'Phone',
    value: '(123) 456-7890',
    href: 'tel:+1234567890',
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: 'Email',
    value: 'info@ieee-mgm.com',
    href: 'mailto:info@ieee-mgm.com',
  },
  {
    icon: <Linkedin className="h-6 w-6 text-primary" />,
    title: 'LinkedIn',
    value: 'IEEE IICT Student Branch',
    href: '#',
  },
  {
    icon: <Instagram className="h-6 w-6 text-primary" />,
    title: 'Instagram',
    value: '@ieee.udict.mgmu',
    href: 'https://www.instagram.com/ieee.udict.mgmu',
  },
];

export default function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-center md:text-4xl">
        Get in Touch
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        We'd love to hear from you. Whether you have a question about our events, membership, or anything else, our team is ready to answer all your questions.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        <div className="rounded-lg bg-card border p-8">
          <h2 className="font-headline text-2xl font-semibold">Send us a Message</h2>
          <ContactForm />
        </div>
        <div className="rounded-lg bg-card border p-8">
          <h2 className="font-headline text-2xl font-semibold mb-8">Contact Information</h2>
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
