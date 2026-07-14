import { Typography } from '@/components/atoms/Typography';

export function UserManagementPage() {
  return (
    <div className="space-y-2">
      <Typography variant="h2">User Management</Typography>
      <Typography variant="body" className="text-slate-500 dark:text-slate-400">
        Manage workspace users and their access roles.
      </Typography>
    </div>
  );
}
