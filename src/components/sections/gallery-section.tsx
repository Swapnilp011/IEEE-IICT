
'use client';

import Image from 'next/image';
import { mockGallery } from '@/lib/mock-data';
import type { GalleryAlbum } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from 'react';


export default function GallerySection() {
    const plugin = React.useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true })
    )

  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in-up text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Gallery
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          A glimpse into our events, workshops, and celebrations.
        </p>
      </div>
      
        <Carousel 
            plugins={[plugin.current]}
            className="w-full max-w-5xl mx-auto mt-8 animate-fade-in-up animation-delay-300"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
            {mockGallery.map((album) => (
                <CarouselItem key={album.id}>
                    <Card className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                            src={album.imageUrl}
                            alt={album.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={album.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <CardContent className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-sm font-semibold text-primary">{album.category}</p>
                            <h3 className="font-headline text-2xl font-bold text-white">{album.title}</h3>
                        </CardContent>
                    </Card>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    </div>
  );
}
