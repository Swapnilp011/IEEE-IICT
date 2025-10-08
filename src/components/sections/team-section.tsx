'use client';

import Image from 'next/image';
import Link from 'next/link';
import { mockTeam } from '@/lib/mock-data';
import type { TeamMember } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const TeamMemberCard = ({ member, size = 'default' }: { member: TeamMember, size?: 'default' | 'large' }) => {
  const cardClasses = cn(
    "group relative overflow-hidden rounded-lg border shadow-sm h-full transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1",
    { 'w-full max-w-sm': size === 'default', 'w-full max-w-md': size === 'large' }
  );

  const imageContainerClasses = cn(
    "aspect-square",
    { 'sm:aspect-[4/5]': size === 'large' }
  );

  return (
    <Card className={cardClasses}>
      <div className={imageContainerClasses}>
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={size === 'large' ? 500 : 400}
          height={size === 'large' ? 625 : 400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          data-ai-hint={member.imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={cn("font-headline font-bold text-white", size === 'large' ? 'text-xl' : 'text-lg')}>{member.name}</h3>
          <p className="text-sm text-primary-foreground/80">{member.role}</p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-white/95 dark:bg-black/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className={cn("font-headline font-bold text-primary", size === 'large' ? 'text-xl' : 'text-lg')}>{member.name}</h3>
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
};


const TeamSectionHeader = ({ title }: { title: string }) => (
    <div className="relative text-center mb-8">
        <h2 className="font-headline text-3xl font-semibold text-foreground">{title}</h2>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-primary mt-2"></div>
    </div>
);


export default function TeamSection() {
  const leadership = mockTeam.filter(m => m.role.toLowerCase().includes('chairperson'));
  const coreCommittee = mockTeam.filter(m => m.role.toLowerCase().includes('secretary') || m.role.toLowerCase().includes('treasurer'));
  const technicalHeads = mockTeam.filter(m => m.role.toLowerCase().includes('technical head'));

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
        Meet Our <span className="text-primary">Team</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        The driving force behind our success. A group of passionate and dedicated individuals.
      </p>
      <p className="mt-4 max-w-2xl mx-auto text-center text-primary/80 font-semibold md:text-lg">
        Recruitment for the tenure of 2026 is going to start soon. Stay tuned!
      </p>

      <div className="mt-12 space-y-16">
        
        {/* Leadership Section */}
        <section className="animate-fade-in-up">
            <TeamSectionHeader title="Leadership" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {leadership.map((member) => (
                    <div key={member.id} className="h-full">
                        <TeamMemberCard member={member} size="large" />
                    </div>
                ))}
            </div>
        </section>

        {/* Core Committee Section */}
        <section className="animate-fade-in-up animation-delay-200">
            <TeamSectionHeader title="Core Committee" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {coreCommittee.map((member) => (
                    <div key={member.id} className="h-full">
                        <TeamMemberCard member={member} size="large" />
                    </div>
                ))}
            </div>
        </section>

        {/* Technical Heads Section */}
        <section className="animate-fade-in-up animation-delay-400">
            <TeamSectionHeader title="Technical Leads" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {technicalHeads.map((member) => (
                    <div key={member.id} className="h-full">
                        <TeamMemberCard member={member} size="large" />
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
