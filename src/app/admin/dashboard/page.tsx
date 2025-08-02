
import { redirect } from 'next/navigation';

export default function AdminDashboardPage() {
  // Redirect to the user management page by default
  redirect('/admin/users');
}
