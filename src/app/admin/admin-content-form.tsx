'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useState, useActionState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2 } from 'lucide-react';
import { generateContentAction } from './actions';
import { toast } from '@/hooks/use-toast';

const initialState = {
  title: '',
  description: '',
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <> <Wand2 className="mr-2 h-4 w-4" /> Generate Suggestion</>}
    </Button>
  );
}

export default function AdminContentForm() {
  const [state, formAction] = useActionState(generateContentAction, initialState);
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state.title && state.description) {
      setGeneratedTitle(state.title);
      setGeneratedDescription(state.description);
      toast({
        title: 'Content Generated!',
        description: 'Review and edit the suggested content below.',
      });
    }
  }, [state]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
          <CardDescription>Provide the type and details for the content you want to create.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type</Label>
            <Select name="contentType" defaultValue="event" required>
              <SelectTrigger id="contentType">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="teamMember">Team Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="e.g., For an event: 'Annual 24-hour hackathon, focused on web3 technologies, prizes from Google and Microsoft'. For a team member: 'Priya Sharma, 3rd year CSE, Chairperson, skilled in project management and React'."
              className="min-h-[150px]"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>

      {(state.title || generatedTitle) && (
        <div className="border-t">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Review and edit the AI-generated suggestions before saving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="generatedTitle">Suggested Title</Label>
              <Input
                id="generatedTitle"
                value={generatedTitle}
                onChange={(e) => setGeneratedTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="generatedDescription">Suggested Description</Label>
              <Textarea
                id="generatedDescription"
                value={generatedDescription}
                onChange={(e) => setGeneratedDescription(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast({ title: 'Content Saved!', description: 'This is a demo. No data was saved.'})} className="w-full">
                Save Content
            </Button>
          </CardFooter>
        </div>
      )}
    </Card>
  );
}
