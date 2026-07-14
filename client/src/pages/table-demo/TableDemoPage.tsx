import { Typography } from '@/components/atoms/Typography';
import { DataTablePage } from '@/components/organisms/DataTablePage';

export function TableDemoPage() {
  return (
    <div className="space-y-4">
      <Typography variant="h2">Table Demo</Typography>
      <Typography variant="caption">
        Backed by TanStack Query; uses react-data-table-component for the styled table.
      </Typography>
      <DataTablePage />
    </div>
  );
}
