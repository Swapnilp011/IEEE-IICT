import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  return (
    <>
      <section className="relative flex h-[calc(100vh-4rem)] min-h-[500px] w-full flex-col items-center justify-center bg-primary/5 text-center">
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
        <div className="relative container z-10 mx-auto px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
            IEEE Student Branch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 drop-shadow-sm md:text-xl">
            IICT, MGM University
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/events">Our Events</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50" />
      </section>
    </>
  );
}
