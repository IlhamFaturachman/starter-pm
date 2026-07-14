import { Typography } from '@/components/atoms/Typography';

export function GroupManagementPage() {
  return (
    <div className="space-y-2">
      <Typography variant="h2">Group Management</Typography>
      <Typography variant="body" className="text-slate-500 dark:text-slate-400">
        Organize users into groups for easier access management.
      </Typography>
    </div>
  );
}
