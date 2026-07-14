import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('accepts typed value', async () => {
    render(<Input aria-label="email" />);
    const input = screen.getByLabelText('email');
    await userEvent.type(input, 'a@b.com');
    expect(input).toHaveValue('a@b.com');
  });
});
