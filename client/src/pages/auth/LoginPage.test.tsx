import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';

jest.mock('@/api/queries/auth', () => ({
  useLoginMutation: () => ({ mutateAsync: jest.fn(), isPending: false }),
}));

describe('LoginPage', () => {
  it('renders title and links', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign up for free')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });
});
