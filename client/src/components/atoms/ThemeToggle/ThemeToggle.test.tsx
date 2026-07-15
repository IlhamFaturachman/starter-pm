import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { useUiStore } from '@/store/uiStore';

describe('ThemeToggle', () => {
  it('toggles theme', async () => {
    useUiStore.setState({ theme: 'light' });
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
    expect(useUiStore.getState().theme).toBe('dark');
  });
});
