
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { PartyPopper } from 'lucide-react';
import { useEffect } from 'react';

export default function JoinPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }


  const handleJoin = () => {
    // In a real app, this would trigger a Firestore write to add the user to a 'members' collection
    toast({
      title: 'Congratulations!',
      description: `Welcome to the IEEE Student Branch, ${user.displayName || 'member'}! (This is a demo)`,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <PartyPopper className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Welcome, {user.displayName || user.email}!</CardTitle>
          <CardDescription>You are one step away from becoming a member of the IEEE Student Branch at IICT, MGM University.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            By clicking the button below, you'll be registered as an official member. You'll get access to exclusive workshops, events, and a network of passionate tech enthusiasts.
          </p>
          <Button size="lg" onClick={handleJoin}>
            Join the IEEE Student Branch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
