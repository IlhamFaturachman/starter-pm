import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const WithIllustration: Story = {
  args: {
    title: 'Welcome Back',
    subtitle: 'Please enter your details to sign in.',
    withIllustration: true,
    children: <div>Auth form</div>,
  },
};

export const Centered: Story = {
  args: {
    title: 'Verify',
    withIllustration: false,
    children: <div>OTP form</div>,
  },
};
