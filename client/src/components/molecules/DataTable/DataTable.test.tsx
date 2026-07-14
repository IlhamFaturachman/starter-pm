import { render, screen } from '@testing-library/react';
import { DataTableMolecule } from './DataTable';
import type { TableColumn } from 'react-data-table-component';

interface Row {
  id: string;
  name: string;
}

const columns: TableColumn<Row>[] = [
  { name: 'ID', selector: (row) => row.id },
  { name: 'Name', selector: (row) => row.name, sortable: true },
];

describe('DataTableMolecule', () => {
  it('renders rows', () => {
    render(<DataTableMolecule data={[{ id: '1', name: 'Alpha' }]} columns={columns} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('shows no data text when empty', () => {
    render(<DataTableMolecule data={[]} columns={columns} noDataText="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
});
