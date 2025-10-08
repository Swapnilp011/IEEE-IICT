
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useState, useActionState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { createContentAction } from './actions';
import { PlusCircle } from 'lucide-react';

const initialState = {
  message: '',
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Creating...' : <><PlusCircle className="mr-2 h-4 w-4" /> Create Content</>}
    </Button>
  );
}

export default function AdminForm() {
  const [state, formAction] = useActionState(createContentAction, initialState);
  const [contentType, setContentType] = useState('event');

  useEffect(() => {
    if (state.message && state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
    } else if (state.message && !state.success) {
      const description = state.errors 
        ? Object.values(state.errors).flat().join('\n') 
        : state.message;
      toast({
        variant: 'destructive',
        title: 'Error',
        description: description || 'An unknown error occurred.',
      });
    }
  }, [state]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Create New Content</CardTitle>
          <CardDescription>Select a content type and fill out the details to post to the website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type</Label>
            <Select name="contentType" value={contentType} onValueChange={setContentType} required>
              <SelectTrigger id="contentType">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="teamMember">Team Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contentType === 'event' && (
            <div className="space-y-4 border-t pt-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" name="title" placeholder="e.g., Innovista 2025" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="Competition">
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="upcoming">
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A brief summary of the event." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.jpg" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationLink">Registration Link (Optional)</Label>
                <Input id="registrationLink" name="registrationLink" type="url" placeholder="https://forms.gle/..." />
              </div>
            </div>
          )}
          
          {contentType === 'teamMember' && (
            <div className="space-y-4 border-t pt-4 mt-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Jane Doe" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="role">Role / Position</Label>
                    <Input id="role" name="role" placeholder="e.g., Chairperson" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea id="bio" name="bio" placeholder="A short bio about the team member." required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/photo.jpg" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                    <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
                </div>
            </div>
          )}

        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

