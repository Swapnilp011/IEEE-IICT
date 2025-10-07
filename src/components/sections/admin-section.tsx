
import AdminContentForm from '@/app/admin/admin-content-form';

export default function AdminSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Admin: AI Content Generator
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Streamline content creation for events and team profiles. Provide details and let AI suggest a title and description.
          </p>
        </div>
        <div className="mt-12">
          <AdminContentForm />
        </div>
      </div>
    </div>
  );
}
