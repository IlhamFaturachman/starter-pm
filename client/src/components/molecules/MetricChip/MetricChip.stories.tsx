import type { Meta, StoryObj } from '@storybook/react';
import { MetricChip } from './MetricChip';

const meta: Meta<typeof MetricChip> = {
  title: 'Molecules/MetricChip',
  component: MetricChip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['emerald', 'blue', 'violet', 'amber'],
    },
    icon: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricChip>;

export const Emerald: Story = {
  args: {
    label: 'Sprints Done',
    value: '13',
    icon: '🏁',
    color: 'emerald',
  },
};

export const Blue: Story = {
  args: {
    label: 'Avg Cycle Time',
    value: '3.2d',
    icon: '⏱',
    color: 'blue',
  },
};

export const Violet: Story = {
  args: {
    label: 'Code Reviews',
    value: '47',
    icon: '🔍',
    color: 'violet',
  },
};

export const Amber: Story = {
  args: {
    label: 'Deployments',
    value: '28',
    icon: '🚀',
    color: 'amber',
  },
};
