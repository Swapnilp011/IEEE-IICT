
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';

const EventCard = ({ event }: { event: Event }) => (
  <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 w-full sm:w-auto shadow-md">
    <div className="relative h-52 w-full">
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover"
        data-ai-hint={event.imageHint}
      />
      <Badge variant="default" className="absolute top-3 right-3">{event.category}</Badge>
    </div>
    <CardHeader>
      <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
      <p className="text-sm text-muted-foreground pt-1">
        {format(new Date(event.date), 'MMMM d, yyyy')}
      </p>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{event.description}</p>
    </CardContent>
    <CardFooter>
      {event.status === 'upcoming' && event.registrationLink && (
        <Button asChild className="w-full group">
          <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
            Register Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
      {event.status === 'past' && (
        <Button variant="outline" className="w-full" disabled>
          Event Concluded
        </Button>
      )}
    </CardFooter>
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
