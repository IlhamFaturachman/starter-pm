import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField } from './TextField';

function Harness() {
  const methods = useForm<{ email: string }>({ defaultValues: { email: '' } });
  return (
    <FormProvider {...methods}>
      <TextField name="email" label="Email" type="email" placeholder="name@company.com" />
    </FormProvider>
  );
}

const meta: Meta<typeof TextField> = {
  title: 'Molecules/TextField',
  component: TextField,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = { render: () => <Harness /> };
