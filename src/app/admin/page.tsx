import AdminContentForm from './admin-content-form';

export const metadata = {
  title: 'Admin | IEEE Connect',
  description: 'Admin tools for managing content on the IEEE Connect website.',
};

export default function AdminPage() {
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
