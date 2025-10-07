
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
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-center md:text-4xl">
        About IEEE Student Branch IICT
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground md:text-lg">
        We are a community of innovators, leaders, and thinkers dedicated to advancing technology for humanity.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <h2 className="font-headline text-2xl font-semibold text-primary">Our Mission</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The IEEE Student Branch at IICT, MGM University, is committed to providing a platform for students to develop their technical and professional skills. We aim to foster a spirit of collaboration and innovation by organizing workshops, seminars, competitions, and networking events. Our goal is to bridge the gap between academia and industry, preparing our members for successful careers in technology and engineering.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe in learning by doing. Our members get opportunities to work on real-world projects, participate in global competitions, and connect with a vast network of professionals through IEEE's global community. Join us to be a part of this exciting journey of learning and growth.
          </p>
        </div>

        <div className="md:col-span-2">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-lg"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-headline text-2xl font-semibold text-center text-primary">Our Journey in Numbers</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
