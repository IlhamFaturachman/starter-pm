import type { Meta, StoryObj } from '@storybook/react';
import { SparklineChart } from './SparklineChart';

const meta: Meta<typeof SparklineChart> = {
  title: 'Molecules/SparklineChart',
  component: SparklineChart,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof SparklineChart>;

export const Default: Story = {
  args: {
    data: [10, 15, 8, 22, 18, 25, 30, 28, 35],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    color: '#2563eb',
  },
};

export const GreenTrend: Story = {
  args: {
    data: [5, 12, 10, 18, 15, 22, 29, 34, 45],
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    color: '#10b981',
  },
};

export const DangerTrend: Story = {
  args: {
    data: [50, 45, 48, 30, 32, 20, 15, 22, 10],
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    color: '#ef4444',
  },
};
