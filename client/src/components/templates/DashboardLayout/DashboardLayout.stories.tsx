import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DashboardLayout>;
export const Default: Story = { args: { children: <div className="p-4">Content area</div> } };

