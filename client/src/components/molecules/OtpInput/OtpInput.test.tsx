import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { OtpInput } from './OtpInput';

function Harness() {
  const [value, setValue] = useState('');
  return <OtpInput value={value} onChange={setValue} />;
}

describe('OtpInput', () => {
  it('renders 6 boxes', () => {
    render(<Harness />);
    expect(screen.getAllByRole('textbox').length).toBe(6);
  });

  it('accepts typed digit', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const boxes = screen.getAllByRole('textbox');
    await user.type(boxes[0], '1');
    expect((boxes[0] as HTMLInputElement).value).toBe('1');
  });
});
