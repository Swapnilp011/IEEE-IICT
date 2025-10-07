'use client';

import Image from 'next/image';
import Link from 'next/link';
import { mockTeam } from '@/lib/mock-data';
import type { TeamMember } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Linkedin, Github } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Card className="group relative overflow-hidden rounded-lg">
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
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-headline text-lg font-bold text-white">{member.name}</h3>
        <p className="text-sm text-primary-foreground/80">{member.role}</p>
      </div>
    </div>
    <div className="absolute inset-0 flex flex-col justify-end bg-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <h3 className="font-headline text-lg font-bold text-white">{member.name}</h3>
      <p className="text-sm text-primary-foreground/80">{member.role}</p>
      <p className="mt-2 text-sm text-primary-foreground/90 flex-grow">{member.bio}</p>
      <div className="mt-4 flex items-center space-x-4">
        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-white">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
        {member.github && (
          <Link href={member.github} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-white">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        )}
      </div>
    </div>
  </Card>
);

export default function TeamSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-center md:text-4xl">
        Meet Our Team
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        The driving force behind our success. A group of passionate and dedicated individuals.
      </p>

      <div className="mt-12">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
