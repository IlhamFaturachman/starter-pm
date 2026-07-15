import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    label: 'Ini adalah tooltip info',
    children: <button className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white">Hover Me</button>,
  },
};
