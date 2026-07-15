import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPerformanceRow } from './DashboardPerformanceRow';

const meta: Meta<typeof DashboardPerformanceRow> = {
  title: 'Organisms/DashboardPerformanceRow',
  component: DashboardPerformanceRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardPerformanceRow>;

export const Default: Story = {};
