import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from './FormField';

function Harness() {
  const methods = useForm<{ email: string }>({ defaultValues: { email: '' } });
  return (
    <FormProvider {...methods}>
      <FormField name="email" label="Email" type="email" />
    </FormProvider>
  );
}

describe('FormField', () => {
  it('renders label and input', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
