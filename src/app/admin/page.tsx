
import AdminSection from '@/components/sections/admin-section';
import { getCurrentUser } from '@/firebase/admin';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    
    return (
        <div>
            <AdminSection />
        </div>
    )
}
