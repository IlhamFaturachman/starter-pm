import { render, screen } from '@testing-library/react';
import { DashboardLayout } from './DashboardLayout';

describe('DashboardLayout', () => {
  it('renders children', () => {
    render(<DashboardLayout>Hello</DashboardLayout>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
