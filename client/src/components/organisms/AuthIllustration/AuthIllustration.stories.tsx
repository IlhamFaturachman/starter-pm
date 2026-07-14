import type { Meta, StoryObj } from '@storybook/react';
import { AuthIllustration } from './AuthIllustration';

const meta: Meta<typeof AuthIllustration> = {
  title: 'Organisms/AuthIllustration',
  component: AuthIllustration,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AuthIllustration>;

export const Default: Story = {};
