
import AdminForm from '@/app/admin/admin-form';

export default function AdminSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Create and manage content for the website. Add new events or team members.
          </p>
        </div>
        <div className="mt-12">
          <AdminForm />
        </div>
      </div>
    </div>
  );
}
