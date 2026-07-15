import type { Meta, StoryObj } from '@storybook/react';
import { NavigationIcon } from './NavigationIcon';

const meta: Meta<typeof NavigationIcon> = {
  title: 'Atoms/NavigationIcon',
  component: NavigationIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['dashboard', 'projects', 'kanban', 'table', 'settings', 'users', 'groups', 'chevron'],
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationIcon>;

export const Dashboard: Story = {
  args: {
    name: 'dashboard',
    className: 'w-6 h-6 text-slate-800 dark:text-white',
  },
};

export const Chevron: Story = {
  args: {
    name: 'chevron',
    className: 'w-6 h-6 text-slate-800 dark:text-white',
  },
};
