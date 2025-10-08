
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';

const EventCard = ({ event }: { event: Event }) => (
    <Card className="group w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20 h-full flex flex-col">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={event.imageHint}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="font-semibold">{event.category}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
            </div>
        </div>
        <h3 className="font-headline text-xl font-bold text-foreground mb-2 truncate">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{event.description}</p>
        <div className="mt-4">
          {event.status === 'upcoming' && event.registrationLink ? (
            <Button asChild className="w-full group">
              <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                Register Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>
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
    <div className="container mx-auto px-4">
      <div className="animate-fade-in-up">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
          Our <span className="text-primary">Events</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
          Join our workshops, seminars, and competitions to learn, network, and grow.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="mt-8 animate-fade-in-up animation-delay-300">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className={`animate-fade-in-up animation-delay-${index * 200 + 400}`}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <div className="text-center py-16 animate-fade-in-up">
              <p className="text-lg text-muted-foreground">No upcoming events scheduled at the moment.</p>
              <p className="text-sm text-muted-foreground/70">Check back soon for exciting new workshops and competitions!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-stretch">
            {pastEvents.map((event, index) => (
               <div key={event.id} className={`animate-fade-in-up animation-delay-${index * 150 + 400}`}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
           {pastEvents.length === 0 && (
            <p className="text-center text-muted-foreground py-16 animate-fade-in-up">No past events to show.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
