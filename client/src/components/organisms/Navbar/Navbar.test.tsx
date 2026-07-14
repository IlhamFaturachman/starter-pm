import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';
import { useAuthStore } from '@/store/authStore';

describe('Navbar', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: { id: '1', email: 'me@x.com', name: 'Me', role: 'admin' }, token: 't' });
  });

  it('shows the signed-in user profile and logs out from the dropdown', async () => {
    render(<Navbar />);
    await userEvent.click(screen.getByRole('button', { name: /open user menu/i }));
    expect(screen.getAllByText('Me')).toHaveLength(2);
    expect(screen.getByText('me@x.com')).toBeInTheDocument();
    expect(screen.getAllByText('Administrator')).toHaveLength(2);
    await userEvent.click(screen.getByRole('menuitem', { name: /logout/i }));
    expect(useAuthStore.getState().user).toBeNull();
  });
});
