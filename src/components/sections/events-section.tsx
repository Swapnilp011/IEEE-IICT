
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const EventCard = ({ event }: { event: Event }) => (
  <Card className="group relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-transparent transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
    <div className="absolute inset-0 z-0">
       <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        data-ai-hint={event.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    </div>

    <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
      <Badge variant="default" className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white">
        {event.category}
      </Badge>
      <div className="space-y-2">
        <h3 className="font-headline text-2xl font-bold">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
        </div>
        <p className="text-sm text-white/90 line-clamp-2">{event.description}</p>
      </div>

      <div className="mt-6">
        {event.status === 'upcoming' && event.registrationLink ? (
          <Button asChild className="w-full group bg-primary/90 hover:bg-primary backdrop-blur-sm transition-all duration-300 transform group-hover:scale-105">
            <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Register Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white/80 backdrop-blur-sm" disabled>
            Event Concluded
          </Button>
        )}
      </div>
    </div>
  </Card>
);


export default function EventsSection() {
  const upcomingEvents = mockEvents.filter((e) => e.status === 'upcoming');
  const pastEvents = mockEvents.filter((e) => e.status === 'past');

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
        Our <span className="text-primary">Events</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        Join our workshops, seminars, and competitions to learn, network, and grow.
      </p>

      <Tabs defaultValue="upcoming" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-8">
          <div className="flex flex-wrap justify-center gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No upcoming events scheduled at the moment.</p>
              <p className="text-sm text-muted-foreground/70">Check back soon for exciting new workshops and competitions!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
           {pastEvents.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No past events to show.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
