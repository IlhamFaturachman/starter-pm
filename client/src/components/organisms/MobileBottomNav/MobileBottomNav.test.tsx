import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileBottomNav } from './MobileBottomNav';

// Note: react-router is mocked in jest.config.cjs globally

describe('MobileBottomNav', () => {
  it('renders main navigation links', () => {
    render(<MobileBottomNav />);
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /kanban/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /table demo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
  });

  it('toggles settings submenus when settings button is clicked', async () => {
    render(<MobileBottomNav />);
    
    // settings submenus should not be present initially
    expect(screen.queryByRole('button', { name: /user management/i })).not.toBeInTheDocument();
    
    // click settings button
    await userEvent.click(screen.getByRole('button', { name: /settings/i }));
    
    // submenus should appear
    expect(screen.getByRole('button', { name: /user management/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /group management/i })).toBeInTheDocument();
    
    // click settings button again
    await userEvent.click(screen.getByRole('button', { name: /settings/i }));
    
    // submenus should disappear
    expect(screen.queryByRole('button', { name: /user management/i })).not.toBeInTheDocument();
  });
});
