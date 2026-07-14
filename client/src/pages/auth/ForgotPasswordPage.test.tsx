import { render, screen } from '@testing-library/react';
import { ForgotPasswordPage } from './ForgotPasswordPage';

jest.mock('@/api/queries/auth', () => ({
  useForgotPasswordMutation: () => ({ mutateAsync: jest.fn(), isPending: false }),
}));

describe('ForgotPasswordPage', () => {
  it('renders title', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });
});
