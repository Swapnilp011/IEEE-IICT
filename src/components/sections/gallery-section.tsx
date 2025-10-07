'use client';

import { useState } from 'react';
import Image from 'next/image';
import { mockGallery } from '@/lib/mock-data';
import type { GalleryAlbum } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Download, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function GallerySection() {

  const AlbumCard = ({ album }: { album: GalleryAlbum }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative block w-full overflow-hidden rounded-lg cursor-pointer">
          <Image
            src={album.imageUrl}
            alt={album.title}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={album.imageHint}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-4">
            <h3 className="font-headline text-lg font-bold text-white">{album.title}</h3>
            <p className="text-sm text-white/80 flex items-center gap-2">
              <Camera className="h-4 w-4" /> {album.imageCount} photos
            </p>
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
            <Button className="w-full mt-4">
                <Download className="mr-2 h-4 w-4" />
                Download Album (Members Only)
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
        {mockGallery.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
