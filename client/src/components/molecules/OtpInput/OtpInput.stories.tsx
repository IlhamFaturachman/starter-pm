import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { OtpInput } from './OtpInput';

function Harness() {
  const [value, setValue] = useState('');
  return <OtpInput value={value} onChange={setValue} />;
}

const meta: Meta<typeof OtpInput> = {
  title: 'Molecules/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  argTypes: { length: { control: { type: 'number', min: 4, max: 8 } } },
};
export default meta;
type Story = StoryObj<typeof OtpInput>;

export const SixDigit: Story = { render: () => <Harness /> };
