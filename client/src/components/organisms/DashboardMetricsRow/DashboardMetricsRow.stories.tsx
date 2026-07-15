import type { Meta, StoryObj } from '@storybook/react';
import { DashboardMetricsRow } from './DashboardMetricsRow';

const meta: Meta<typeof DashboardMetricsRow> = {
  title: 'Organisms/DashboardMetricsRow',
  component: DashboardMetricsRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardMetricsRow>;

export const Default: Story = {};
