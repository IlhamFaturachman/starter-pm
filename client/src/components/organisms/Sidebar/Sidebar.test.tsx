import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders all nav items', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Kanban')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('reveals settings submenus when clicked', async () => {
    render(<Sidebar />);
    await userEvent.click(screen.getByRole('button', { name: /settings/i }));
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Group Management')).toBeInTheDocument();
  });
});
