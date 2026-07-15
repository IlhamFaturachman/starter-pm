import type { Meta, StoryObj } from '@storybook/react';
import { DashboardStatsRow } from './DashboardStatsRow';

const meta: Meta<typeof DashboardStatsRow> = {
  title: 'Organisms/DashboardStatsRow',
  component: DashboardStatsRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardStatsRow>;

export const Default: Story = {};
