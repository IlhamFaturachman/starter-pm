import { type ReactNode, useId } from 'react';
import { useFormContext, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@/components/atoms/Input';
import { cn } from '@/lib/cn';

export interface TextFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  icon?: ReactNode;
  autoComplete?: string;
  disabled?: boolean;
}

export function TextField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  icon,
  autoComplete,
  disabled,
}: TextFieldProps<T>) {
  const id = useId();
  const errorId = `${id}-error`;
  const { control } = useFormContext<T>();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold tracking-wide text-text-main-light dark:text-text-main-dark"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted-light dark:text-text-muted-dark">
            {icon}
          </div>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => {
            const hasError = Boolean(fieldState.error);
            return (
              <>
                <Input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  disabled={disabled}
                  hasError={hasError}
                  aria-invalid={hasError || undefined}
                  aria-describedby={hasError ? errorId : undefined}
                  className={cn(icon && 'pl-11', 'py-3.5')}
                  {...field}
                  value={(field.value as string | number | undefined) ?? ''}
                />
                {fieldState.error?.message && (
                  <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
