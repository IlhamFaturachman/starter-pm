import type { Meta, StoryObj } from '@storybook/react';
import { MobileBottomNav } from './MobileBottomNav';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof MobileBottomNav> = {
  title: 'Organisms/MobileBottomNav',
  component: MobileBottomNav,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-full max-w-md border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 p-4">
          <p className="text-xs text-slate-400 mb-8 text-center">Mobile View Simulator</p>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof MobileBottomNav>;
export const Default: Story = {};
