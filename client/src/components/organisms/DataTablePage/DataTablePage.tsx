import { useMemo, useState } from 'react';
import type { TableColumn } from 'react-data-table-component';
import { DataTableMolecule } from '@/components/molecules/DataTable';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { Typography } from '@/components/atoms/Typography';
import { useProjectsQuery } from '@/api/queries/projects';

export function DataTablePage() {
  const [search, setSearch] = useState('');
  const { data = [], isLoading } = useProjectsQuery();

  const filtered = useMemo(
    () => (search ? data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) : data),
    [data, search],
  );

  const columns: TableColumn<(typeof filtered)[number]>[] = [
    { name: 'Name', selector: (row) => row.name, sortable: true, grow: 2 },
    { name: 'Description', selector: (row) => row.description, grow: 3 },
    {
      name: 'Status',
      width: '120px',
      cell: (row) => <span className="text-xs">{row.status}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <Typography variant="h2">Projects</Typography>

      <div className="max-w-sm">
        <Input
          placeholder="Search by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-surface-600">
          <Spinner size="sm" /> Loading projects…
        </div>
      ) : (
        <DataTableMolecule data={filtered} columns={columns} paginationPerPage={8} />
      )}
    </div>
  );
}
