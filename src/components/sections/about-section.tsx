
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Award, GraduationCap, Briefcase, Info, Target, Landmark, Rocket } from 'lucide-react';
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
        role: 'Director IICT MGM University',
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

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
        <Card className="animate-fade-in-up animation-delay-200">
            <CardHeader className='items-center'>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Our Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
                Our mission is to foster core knowledge, leadership, and managerial skills among students. We aim to bridge the gap between academia and industry by providing a platform for students to interact with peers and professionals globally, ensuring they are well-prepared for their future careers.
            </CardContent>
        </Card>
        <Card className="animate-fade-in-up animation-delay-400">
             <CardHeader className='items-center'>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Landmark className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Our History</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
                The IEEE Student Branch at IICT, MGM University was officially inaugurated on July 13, 2023. It was formed through the dedicated efforts of key faculty and student members who envisioned a community for tech enthusiasts to thrive.
            </CardContent>
        </Card>
        <Card className="animate-fade-in-up animation-delay-600 md:col-span-2 lg:col-span-1">
             <CardHeader className='items-center'>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
                    <Rocket className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">About IEEE</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
                 IEEE is the world's largest technical professional organization for the advancement of technology. Student membership offers access to a vast network of professionals, technical resources, and career development opportunities.
            </CardContent>
        </Card>
      </div>
      
      <div className="mt-16 animate-fade-in-up">
        <h2 className="font-headline text-3xl font-semibold text-center text-primary">Faculty Guidance</h2>
        <p className="mt-2 max-w-2xl mx-auto text-center text-muted-foreground">
          Our student branch is fortunate to be guided by experienced faculty members.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faculty.map((person, index) => (
            <Card key={person.name} className={`overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in-up animation-delay-${400 + index * 200}`}>
              <div className="flex flex-col items-center gap-6 p-8">
                <div className="relative h-36 w-36 flex-shrink-0">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    fill
                    className="rounded-full object-cover border-4 border-primary/10 shadow-lg"
                    data-ai-hint={person.imageHint}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-headline text-2xl font-bold text-foreground">{person.name}</h3>
                  <p className="text-primary font-semibold text-lg">{person.role}</p>
                </div>
              </div>
            </Card>
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
