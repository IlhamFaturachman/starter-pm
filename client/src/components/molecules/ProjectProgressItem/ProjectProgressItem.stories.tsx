import type { Meta, StoryObj } from '@storybook/react';
import { ProjectProgressItem } from './ProjectProgressItem';

const meta: Meta<typeof ProjectProgressItem> = {
  title: 'Molecules/ProjectProgressItem',
  component: ProjectProgressItem,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['On Track', 'At Risk', 'Delayed'],
    },
    barColor: { control: 'color' },
    progress: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectProgressItem>;

export const OnTrack: Story = {
  args: {
    name: 'Frontend Redevelopment',
    progress: 75,
    status: 'On Track',
    barColor: '#10b981',
  },
};

export const AtRisk: Story = {
  args: {
    name: 'Database Migration',
    progress: 40,
    status: 'At Risk',
    barColor: '#f59e0b',
  },
};

export const Delayed: Story = {
  args: {
    name: 'API V2 Docs Integration',
    progress: 20,
    status: 'Delayed',
    barColor: '#ef4444',
  },
};
