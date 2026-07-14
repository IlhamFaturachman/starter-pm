import type { Meta, StoryObj } from '@storybook/react';
import { AuthCard } from './AuthCard';

const meta: Meta<typeof AuthCard> = {
  title: 'Molecules/AuthCard',
  component: AuthCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AuthCard>;

export const Default: Story = {
  render: () => <AuthCard>Auth form content</AuthCard>,
};
