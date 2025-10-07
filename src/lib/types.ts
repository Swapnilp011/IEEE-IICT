export type Event = {
  id: string;
  title: string;
  date: string;
  category: 'Workshop' | 'Seminar' | 'Competition' | 'Webinar';
  description: string;
  imageUrl: string;
  imageHint: string;
  status: 'upcoming' | 'past';
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageHint: string;
  linkedin: string;
  github?: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageHint: string;
  imageCount: number;
};
