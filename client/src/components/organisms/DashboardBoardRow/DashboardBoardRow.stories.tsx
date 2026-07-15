import type { Meta, StoryObj } from '@storybook/react';
import { DashboardBoardRow } from './DashboardBoardRow';

const meta: Meta<typeof DashboardBoardRow> = {
  title: 'Organisms/DashboardBoardRow',
  component: DashboardBoardRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardBoardRow>;

export const Default: Story = {};
