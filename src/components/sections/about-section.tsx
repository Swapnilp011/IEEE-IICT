
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Award, GraduationCap, Briefcase, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTeam } from '@/lib/mock-data';


const stats = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    value: '250+',
    label: 'Active Members',
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    value: '50+',
    label: 'Events Hosted',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    value: '5+',
    label: 'Years of Excellence',
  },
];

const faculty = [
    {
        name: 'Prof. Dr Sharvari Tamane',
        role: 'Director IICT MGM UNiversitty',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1DR-R5w3a5U_wLZMB4W290M8qdA3lHG4w',
        imageHint: 'professional headshot'
    },
    {
        name: 'Ms. Vijaya Ahire',
        role: 'Student Branch Counsellor',
        imageUrl: 'https://drive.google.com/uc?export=view&id=1yuDKwBVw1LnUdyTo64yaqIcdjWJa4_mZ',
        imageHint: 'professional headshot'
    }
]

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === 'about');

  return (
    <div className="container mx-auto px-4">
      <div className="animate-fade-in-up">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-center md:text-5xl">
          About <span className="text-primary">IEEE</span> Student Branch
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground md:text-lg">
        Welcome to the IEEE Student Branch at IICT, MGM University, a dynamic community dedicated to fostering technological innovation and professional growth. Our mission is to provide a platform for students to connect, learn, and lead in the ever-evolving world of technology.
        </p>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-5 md:gap-16 items-center">
        <div className="md:col-span-3 animate-fade-in-up animation-delay-200">
          <h2 className="font-headline text-3xl font-semibold text-primary">Our Mission & Vision</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            Our mission is to foster core knowledge, leadership, and managerial skills among students. We aim to bridge the gap between academia and industry by providing a platform for students to interact with peers and professionals globally, ensuring they are well-prepared for their future careers.
          </p>
           <div className="mt-6">
            <h3 className="font-headline text-2xl font-semibold text-primary/90">Our History</h3>
             <p className="mt-3 text-muted-foreground leading-relaxed">
                The IEEE Student Branch at UDICT, MGM University was officially established on April 28, 2023. It was formed through the dedicated efforts of key faculty and student members who envisioned a community for tech enthusiasts to thrive.
             </p>
          </div>
          <div className="mt-6">
            <h3 className="font-headline text-2xl font-semibold text-primary/90">About IEEE</h3>
             <ul className="mt-3 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                    <Info className="h-5 w-5 flex-shrink-0 mt-1 text-primary" />
                    <span>IEEE is the world's largest technical professional organization for the advancement of technology. Student membership offers access to a vast network of professionals, technical resources, and career development opportunities.</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 animate-fade-in-up animation-delay-400">
          {aboutImage && (
            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="rounded-lg object-cover scale-110"
                data-ai-hint={aboutImage.imageHint}
                />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-16 animate-fade-in-up">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary">Faculty Guidance</h2>
        <p className="mt-2 max-w-2xl mx-auto text-center text-muted-foreground">
          Our student branch is fortunate to be guided by experienced faculty members.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faculty.map((person, index) => (
            <div key={person.name} className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 p-6 rounded-xl border bg-card text-card-foreground shadow-sm animate-fade-in-up animation-delay-${400 + index * 200}`}>
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={person.imageUrl} alt={person.name} data-ai-hint={person.imageHint} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-headline text-xl font-bold">{person.name}</h3>
                    <p className="text-primary font-semibold">{person.role}</p>
                </div>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-16 animate-fade-in-up">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary">Our Journey in Numbers</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`text-center transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 p-6 rounded-xl border bg-card text-card-foreground shadow-sm animate-fade-in-up animation-delay-${400 + index * 200}`}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {stat.icon}
                </div>
                <p className="text-5xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
