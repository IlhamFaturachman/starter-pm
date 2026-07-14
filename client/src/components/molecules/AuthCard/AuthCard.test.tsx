import { render, screen } from '@testing-library/react';
import { AuthCard } from './AuthCard';

describe('AuthCard', () => {
  it('renders children', () => {
    render(<AuthCard>Form here</AuthCard>);
    expect(screen.getByText('Form here')).toBeInTheDocument();
  });
});
