import type { Meta, StoryObj } from '@storybook/react';
import { DataTableMolecule } from './DataTable';
import type { TableColumn } from 'react-data-table-component';

interface Row {
  id: string;
  name: string;
  role: string;
}

const columns: TableColumn<Row>[] = [
  { name: 'ID', selector: (row) => row.id, width: '80px' },
  { name: 'Name', selector: (row) => row.name, sortable: true },
  { name: 'Role', selector: (row) => row.role },
];

const data: Row[] = [
  { id: '1', name: 'Aria Chen', role: 'Engineering Lead' },
  { id: '2', name: 'Marcus Webb', role: 'Product Manager' },
  { id: '3', name: 'Priya Kapoor', role: 'Designer' },
];

const meta: Meta<typeof DataTableMolecule> = {
  title: 'Molecules/DataTable',
  component: DataTableMolecule,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTableMolecule<Row>>;

export const Default: Story = { args: { data, columns, paginationPerPage: 5 } };
export const Empty: Story = { args: { data: [], columns } };
