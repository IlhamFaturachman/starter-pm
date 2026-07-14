import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = { args: { variant: 'h1', children: 'Heading 1' } };
export const Body: Story = { args: { variant: 'body', children: 'Body text' } };
