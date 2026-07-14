import { render, screen } from '@testing-library/react';
import { OtpPage } from './OtpPage';
import { useAuthStore } from '@/store/authStore';

jest.mock('@/api/queries/auth', () => ({
  useVerifyOtpMutation: () => ({ mutateAsync: jest.fn(), isPending: false }),
}));

describe('OtpPage', () => {
  it('redirects to nothing if no pending email', () => {
    useAuthStore.setState({ pendingEmail: null });
    const { container } = render(<OtpPage />);
    expect(container.firstChild).toBeNull();
  });

  it('renders OTP boxes when pending', () => {
    useAuthStore.setState({
      pendingEmail: 'me@x.com',
      token: null,
      user: null,
    });
    render(<OtpPage />);
    expect(screen.getByText('Check your email')).toBeInTheDocument();
  });
});
