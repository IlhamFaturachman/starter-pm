import { render, screen } from '@testing-library/react';
import { DataTablePage } from './DataTablePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/api/queries/projects', () => ({
  useProjectsQuery: () => ({ data: [], isLoading: false }),
}));

describe('DataTablePage', () => {
  it('renders heading', () => {
    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <DataTablePage />
      </QueryClientProvider>,
    );
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});
