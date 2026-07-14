import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  it('renders title and content', () => {
    render(
      <AuthLayout title="Sign in" subtitle="Welcome">
        body
      </AuthLayout>,
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });
});
