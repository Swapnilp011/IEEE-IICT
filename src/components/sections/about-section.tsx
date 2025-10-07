
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Award } from 'lucide-react';

const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: '250+',
    label: 'Active Members',
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    value: '50+',
    label: 'Events Hosted',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    value: '5+',
    label: 'Years of Excellence',
  },
];

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === 'about-graphic');

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
        About <span className="text-primary">IEEE</span> Student Branch
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground md:text-lg">
        We are a community of innovators, leaders, and thinkers dedicated to advancing technology for humanity.
      </p>

      <div className="mt-16 grid gap-12 md:grid-cols-5 md:gap-16 items-center">
        <div className="md:col-span-3">
          <h2 className="font-headline text-3xl font-semibold text-primary">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            The IEEE Student Branch at IICT, MGM University, is committed to providing a platform for students to develop their technical and professional skills. We aim to foster a spirit of collaboration and innovation by organizing workshops, seminars, competitions, and networking events.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our goal is to bridge the gap between academia and industry, preparing our members for successful careers in technology and engineering. We believe in learning by doing, offering real-world projects and access to a global network of professionals.
          </p>
        </div>

        <div className="md:col-span-2">
          {aboutImage && (
            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="rounded-lg object-cover scale-110"
                data-ai-hint={aboutImage.imageHint}
                />
            </div>
          )}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary">Our Journey in Numbers</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card text-center transition-transform hover:-translate-y-2 p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {stat.icon}
                </div>
                <p className="text-5xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
