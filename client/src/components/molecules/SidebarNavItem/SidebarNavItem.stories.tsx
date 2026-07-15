import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNavItem } from './SidebarNavItem';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof SidebarNavItem> = {
  title: 'Molecules/SidebarNavItem',
  component: SidebarNavItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    icon: {
      control: 'select',
      options: ['dashboard', 'projects', 'kanban', 'table', 'settings', 'users', 'groups', 'chevron'],
    },
    isCollapsed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNavItem>;

export const Default: Story = {
  args: {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'dashboard',
    isCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'dashboard',
    isCollapsed: true,
  },
};

export const WithChildren: Story = {
  args: {
    label: 'Projects',
    to: '/projects',
    icon: 'projects',
    isCollapsed: false,
    children: [
      { label: 'Active Projects', to: '/projects/active', icon: 'projects' },
      { label: 'Archived Projects', to: '/projects/archived', icon: 'table' },
    ],
  },
};

export const WithChildrenCollapsed: Story = {
  args: {
    label: 'Projects',
    to: '/projects',
    icon: 'projects',
    isCollapsed: true,
    children: [
      { label: 'Active Projects', to: '/projects/active', icon: 'projects' },
      { label: 'Archived Projects', to: '/projects/archived', icon: 'table' },
    ],
  },
};
