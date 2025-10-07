'use client';

import Image from 'next/image';
import { mockGallery } from '@/lib/mock-data';
import type { GalleryAlbum } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function GallerySection() {

  const AlbumCard = ({ album }: { album: GalleryAlbum }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative block w-full overflow-hidden rounded-lg cursor-pointer aspect-square">
          <Image
            src={album.imageUrl}
            alt={album.title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={album.imageHint}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center justify-center p-4">
             <div className="flex items-center gap-6 text-white font-bold text-lg">
                <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6" />
                    <span>{Math.floor(Math.random() * 500) + 50}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    <span>{Math.floor(Math.random() * 50) + 5}</span>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-headline text-lg font-bold">{album.title}</h3>
                 <p className="text-sm text-white/80 flex items-center gap-2">
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
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="font-headline text-3xl font-bold tracking-tight text-center md:text-4xl">
        Gallery
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
        A glimpse into our events, workshops, and celebrations.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mt-8">
        {mockGallery.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
