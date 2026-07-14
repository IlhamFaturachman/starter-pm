import { Typography } from '@/components/atoms/Typography';
import { DataTableMolecule } from '@/components/molecules/DataTable';
import type { TableColumn } from 'react-data-table-component';
import type { Project } from '@/types/api';

const SAMPLE: Project[] = [
  { id: '1', name: 'Mobile App', description: 'iOS + Android', status: 'active', ownerId: 'u1', createdAt: '2026-01-15' },
  { id: '2', name: 'Web Dashboard', description: 'Internal analytics', status: 'active', ownerId: 'u1', createdAt: '2026-02-02' },
  { id: '3', name: 'Legacy Migration', description: 'v1 → v2', status: 'archived', ownerId: 'u1', createdAt: '2025-09-10' },
];

const columns: TableColumn<Project>[] = [
  { name: 'Name', selector: (r) => r.name, sortable: true, grow: 2 },
  { name: 'Description', selector: (r) => r.description, grow: 3 },
  { name: 'Status', selector: (r) => r.status, sortable: true, width: '120px' },
];

export function ProjectsPage() {
  return (
    <div className="space-y-4">
      <Typography variant="h2">Projects</Typography>
      <DataTableMolecule data={SAMPLE} columns={columns} paginationPerPage={8} />
    </div>
  );
}
