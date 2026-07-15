import type { Meta, StoryObj } from '@storybook/react';
import { ActivityItem } from './ActivityItem';

const meta: Meta<typeof ActivityItem> = {
  title: 'Molecules/ActivityItem',
  component: ActivityItem,
  tags: ['autodocs'],
  argTypes: {
    avatarColor: { control: 'color' },
    targetColor: { control: 'color' },
    isLatest: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityItem>;

export const Default: Story = {
  args: {
    user: 'Sarah Connor',
    initials: 'SC',
    avatarColor: '#ec4899',
    action: 'created task',
    target: 'Deploy V2 to Staging',
    targetColor: '#3b82f6',
    detail: 'Staging environment is configured on Google Cloud',
    time: '2 hours ago',
    isLatest: false,
  },
};

export const Latest: Story = {
  args: {
    user: 'John Doe',
    initials: 'JD',
    avatarColor: '#10b981',
    action: 'completed task',
    target: 'Bug: Fix Login Loop',
    targetColor: '#ef4444',
    detail: 'Resolved race condition in auth response handling',
    time: 'Just now',
    isLatest: true,
  },
};
