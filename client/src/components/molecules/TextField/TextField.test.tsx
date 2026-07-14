import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextField } from './TextField';

function Harness() {
  const methods = useForm<{ email: string }>({ defaultValues: { email: '' } });
  return (
    <FormProvider {...methods}>
      <TextField name="email" label="Email" type="email" />
    </FormProvider>
  );
}

describe('TextField', () => {
  it('renders label + input with icon slot', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
