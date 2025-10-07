
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { mockTeam } from '@/lib/mock-data';
import type { TeamMember } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Card className="group relative overflow-hidden rounded-lg border shadow-sm">
    <div className="aspect-square">
      <Image
        src={member.imageUrl}
        alt={member.name}
        width={400}
        height={400}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        data-ai-hint={member.imageHint}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-headline text-lg font-bold text-white">{member.name}</h3>
        <p className="text-sm text-primary-foreground/80">{member.role}</p>
      </div>
    </div>
    <div className="absolute inset-0 flex flex-col justify-end bg-white/95 dark:bg-black/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <h3 className="font-headline text-lg font-bold text-primary">{member.name}</h3>
      <p className="text-sm text-foreground/80">{member.role}</p>
      <p className="mt-2 text-sm text-foreground/90 flex-grow">{member.bio}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
    </div>
  </Card>
);

export default function TeamSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
        Meet Our <span className="text-primary">Team</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        The driving force behind our success. A group of passionate and dedicated individuals.
      </p>
      <p className="mt-4 max-w-2xl mx-auto text-center text-primary/80 font-semibold md:text-lg">
        Recruitment for the tenure of 2026 is going to start soon. Stay tuned!
      </p>

      <div className="mt-12">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {mockTeam.map((member) => (
              <CarouselItem key={member.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <TeamMemberCard member={member} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </div>
  );
}
