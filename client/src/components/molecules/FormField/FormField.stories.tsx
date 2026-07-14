import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from './FormField';

function Harness() {
  const methods = useForm<{ email: string }>({ defaultValues: { email: '' } });
  return (
    <FormProvider {...methods}>
      <FormField name="email" label="Email" type="email" placeholder="you@company.com" />
    </FormProvider>
  );
}

const meta: Meta<typeof Harness> = {
  title: 'Molecules/FormField',
  component: Harness,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Harness>;

export const Default: Story = {};
