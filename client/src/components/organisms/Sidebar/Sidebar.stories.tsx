import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
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
type Story = StoryObj<typeof Sidebar>;
export const Default: Story = {};
