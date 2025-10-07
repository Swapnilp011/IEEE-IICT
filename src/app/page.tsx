
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

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section id="home" className="relative h-[calc(100vh-4rem)] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent z-10" />
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover animate-pan-in"
                data-ai-hint={heroImage.imageHint}
                priority
             />
        )}
        <div className="relative container z-20 mx-auto flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white drop-shadow-md sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">IEEE</span> Student Branch
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 drop-shadow-sm md:text-xl">
            IICT, MGM University: Fostering Tomorrow's Tech Leaders.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="group" >
              <Link href="/join">
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
          <section id="about" className="py-16 md:py-24">
            <AboutSection />
          </section>
          <section id="events" className="py-16 md:py-24 bg-secondary/20">
            <EventsSection />
          </section>
          <section id="gallery" className="py-16 md:py-24">
            <GallerySection />
          </section>
          <section id="team" className="py-16 md:py-24 bg-secondary/20">
            <TeamSection />
          </section>
          <section id="contact" className="py-16 md:py-24 bg-secondary/20">
            <ContactSection />
          </section>
        </>
      )}
    </>
  );
}
