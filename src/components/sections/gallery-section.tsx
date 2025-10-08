
'use client';

import Image from 'next/image';
import { mockGallery } from '@/lib/mock-data';
import type { GalleryAlbum } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function GallerySection() {

  const AlbumCard = ({ album }: { album: GalleryAlbum }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative block w-full overflow-hidden rounded-lg cursor-pointer aspect-square transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
          <Image
            src={album.imageUrl}
            alt={album.title}
            fill
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={album.imageHint}
          />
          <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                <h3 className="font-headline text-lg font-bold">{album.title}</h3>
                 <p className="text-sm text-white/90 flex items-center gap-2">
                    <Camera className="h-4 w-4" /> {album.imageCount} photos
                </p>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{album.title}</DialogTitle>
          <DialogDescription>
            {album.category} | {album.imageCount} photos
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-4 aspect-video w-full">
            <Image 
                src={album.imageUrl} 
                alt={album.title} 
                fill 
                className="object-cover rounded-md"
                data-ai-hint={album.imageHint} 
            />
        </div>
        <div className="mt-4">
            <p className="text-sm text-muted-foreground">This is a preview of the album. More features coming soon.</p>
             {/* This button's functionality would be restricted to authenticated members */}
            <Button className="w-full mt-4" disabled>
                View Full Album (Members Only)
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in-up">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-center md:text-4xl">
          Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
          A glimpse into our events, workshops, and celebrations.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-8">
        {mockGallery.map((album, index) => (
           <div key={album.id} className={`animate-fade-in-up animation-delay-${index * 100 + 300}`}>
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </div>
  );
}
