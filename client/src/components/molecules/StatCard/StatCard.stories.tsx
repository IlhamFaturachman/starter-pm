import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    color: {
      control: 'select',
      options: ['teal', 'violet', 'amber', 'rose', 'blue', 'emerald'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Velocity: Story = {
  args: {
    label: 'Project Velocity',
    value: '87%',
    change: '+12%',
    trend: 'up',
    sub: 'Active Sprints: 4',
    color: 'teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const Tasks: Story = {
  args: {
    label: 'Task Completion',
    value: '245',
    change: '/ 310',
    trend: 'neutral',
    sub: 'Due This Week: 18',
    color: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export const Capacity: Story = {
  args: {
    label: 'Team Capacity',
    value: '82%',
    change: '-3%',
    trend: 'down',
    sub: 'Utilized',
    color: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 4a3 3 0 0 0 0-6m4 8v-2a3 3 0 0 0-2.27-2.91" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};
