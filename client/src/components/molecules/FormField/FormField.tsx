import { useId, type ReactNode } from 'react';
import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@/components/atoms/Input';

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  helperText?: ReactNode;
  autoComplete?: string;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  autoComplete,
}: FormFieldProps<T>) {
  const id = useId();
  const { control } = useFormContext<T>();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-surface-900">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              hasError={Boolean(fieldState.error)}
              {...field}
              value={(field.value as string | number | undefined) ?? ''}
            />
            {fieldState.error?.message && (
              <p className="text-xs text-red-600">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
      {helperText && <p className="text-xs text-surface-600">{helperText}</p>}
    </div>
  );
}
