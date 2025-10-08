
export type Event = {
  id: string;
  title: string;
  date: string;
  category: 'Workshop' | 'Seminar' | 'Competition' | 'Webinar' | 'Recruitment';
  description: string;
  imageUrl: string;
  imageHint: string;
  status: 'upcoming' | 'past';
  registrationLink?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  imageHint: string;
  linkedin: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageHint: string;
  imageCount: number;
};
