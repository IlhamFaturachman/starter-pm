import DataTable, { type TableColumn, createTheme } from 'react-data-table-component';
import type { ReactNode } from 'react';
import { Spinner } from '@/components/atoms/Spinner';

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: boolean;
  paginationPerPage?: number;
  selectableRows?: boolean;
  onSelectedRowsChange?: (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: T[];
  }) => void;
  subHeader?: boolean;
  subHeaderComponent?: ReactNode;
  noDataText?: string;
}

export const tableTheme = createTheme(
  'pmfe',
  {
    text: { primary: '#0f172a', secondary: '#475569', disabled: '#94a3b8' },
    background: { default: '#ffffff' },
    context: { background: '#e2e8f0', text: '#0f172a' },
    divider: { default: '#e2e8f0' },
    button: {
      default: '#3b82f6',
      hover: '#2563eb',
      focus: '#1d4ed8',
      disabled: '#94a3b8',
    },
  },
  'light',
);

export function DataTableMolecule<T>({
  data,
  columns,
  loading,
  pagination = true,
  paginationPerPage = 10,
  selectableRows = false,
  onSelectedRowsChange,
  subHeader = false,
  subHeaderComponent,
  noDataText = 'No records found',
}: DataTableProps<T>) {
  return (
    <DataTable<T>
      data={data}
      columns={columns}
      theme="pmfe"
      progressPending={loading}
      progressComponent={<Spinner />}
      pagination={pagination}
      paginationPerPage={paginationPerPage}
      selectableRows={selectableRows}
      onSelectedRowsChange={onSelectedRowsChange}
      subHeader={subHeader ? subHeaderComponent : undefined}
      noDataComponent={<div className="py-6 text-sm text-surface-600">{noDataText}</div>}
      highlightOnHover
      striped
      pointerOnHover
    />
  );
}
