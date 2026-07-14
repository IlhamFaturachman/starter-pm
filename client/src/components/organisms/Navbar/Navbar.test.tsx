import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';
import { useAuthStore } from '@/store/authStore';

describe('Navbar', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: { id: '1', email: 'me@x.com', name: 'Me', role: 'admin' }, token: 't' });
  });

  it('renders user email and logout works', async () => {
    render(<Navbar />);
    expect(screen.getByText('me@x.com')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(useAuthStore.getState().user).toBeNull();
  });
});
