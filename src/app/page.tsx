
'use client';

import { useState, useEffect } from 'react';
import AboutSection from '@/components/sections/about-section';
import EventsSection from '@/components/sections/events-section';
import GallerySection from '@/components/sections/gallery-section';
import TeamSection from '@/components/sections/team-section';
import ContactSection from '@/components/sections/contact-section';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

function AnimatedSection({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [id]);

  return (
    <section 
      id={id} 
      className={cn(
        'py-16 md:py-24 transition-opacity duration-1000 ease-out transform', 
        className, 
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {children}
    </section>
  );
}


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleBecomeMemberClick = () => {
    toast({
      title: "Recruitment Opening Soon!",
      description: "Stay tuned for updates on when you can join the team.",
    });
  }

  return (
    <>
      <section id="home" className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-white/50 to-transparent z-10" />
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
             />
        )}
        <div className="relative container z-20 mx-auto flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground drop-shadow-md sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-primary">IEEE</span> Student Branch
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg font-semibold text-foreground drop-shadow-md md:text-xl">
            IICT, MGM University: Fostering Tomorrow's Tech Leaders.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="group" >
              <Link href="https://forms.gle/6UFqbdLw1uaoiYnv5" target="_blank" rel="noopener noreferrer">
                Become a Member <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {isMounted && (
        <>
          <AnimatedSection id="about">
            <AboutSection />
          </AnimatedSection>
          <AnimatedSection id="events" className="bg-secondary/60">
            <EventsSection />
          </AnimatedSection>
          <AnimatedSection id="gallery">
            <GallerySection />
          </AnimatedSection>
          <AnimatedSection id="team" className="bg-secondary/60">
            <TeamSection />
          </AnimatedSection>
          <AnimatedSection id="contact">
            <ContactSection />
          </AnimatedSection>
        </>
      )}
    </>
  );
}
