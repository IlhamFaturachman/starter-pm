import { render, screen } from '@testing-library/react';
import { SignupPage } from './SignupPage';

jest.mock('@/api/queries/auth', () => ({
  useSignupMutation: () => ({ mutateAsync: jest.fn(), isPending: false }),
}));

describe('SignupPage', () => {
  it('renders title', () => {
    render(<SignupPage />);
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
  });
});
