
'use client';

import Image from 'next/image';
import { mockGallery } from '@/lib/mock-data';
import type { GalleryAlbum } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GallerySection() {
  const AlbumRow = ({ album }: { album: GalleryAlbum }) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-2 relative min-h-[250px] w-full">
          <Image
            src={album.imageUrl}
            alt={album.title}
            fill
            className="object-cover"
            data-ai-hint={album.imageHint}
          />
        </div>
        <div className="md:col-span-3">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">{album.category}</p>
              <h3 className="font-headline text-2xl font-bold text-foreground">{album.title}</h3>
              <p className="mt-2 text-muted-foreground line-clamp-3">
                {album.description}
              </p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Camera className="h-4 w-4" /> 
                    <span>{album.imageCount} photos</span>
                </div>
              <Button disabled className="group w-full sm:w-auto">
                View More Photos <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

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
      
      <div className="flex flex-col gap-8 mt-8">
        {mockGallery.map((album, index) => (
           <div key={album.id} className={`animate-fade-in-up animation-delay-${index * 150 + 300}`}>
            <AlbumRow album={album} />
          </div>
        ))}
      </div>
    </div>
  );
}
