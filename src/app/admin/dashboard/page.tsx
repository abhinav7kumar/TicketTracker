
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Welcome, Admin. This area is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Future features will include user management, site analytics, and
            system-wide settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
