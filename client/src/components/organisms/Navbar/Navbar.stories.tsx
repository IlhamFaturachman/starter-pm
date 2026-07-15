import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
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
type Story = StoryObj<typeof Navbar>;
export const Default: Story = {};

