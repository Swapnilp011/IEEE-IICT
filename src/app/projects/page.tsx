import { Wrench } from 'lucide-react';

export const metadata = {
  title: 'Projects | IEEE Connect',
  description: 'Discover innovative projects developed by members of the IEEE Student Branch at IICT, MGM University.',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center">
        <Wrench className="h-16 w-16 text-primary" />
        <h1 className="mt-6 font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Our Projects
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          This section is currently under development. We are busy curating a showcase of the innovative projects by our members.
        </p>
        <p className="mt-2 text-muted-foreground">Please check back soon!</p>
      </div>
    </div>
  );
}
