import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { useUiStore } from '@/store/uiStore';

describe('Sidebar', () => {
  beforeEach(() => useUiStore.setState({ sidebarOpen: true }));
  it('renders all nav items', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Kanban')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('collapses to icon-only navigation with accessible tooltips', async () => {
    render(<Sidebar />);
    expect(screen.getByText('Collapse')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /collapse sidebar/i }));
    expect(screen.getByRole('button', { name: /expand sidebar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('tooltip', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('reveals settings submenus when clicked', async () => {
    render(<Sidebar />);
    await userEvent.click(screen.getByRole('button', { name: /settings/i }));
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Group Management')).toBeInTheDocument();
  });
});
