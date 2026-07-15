import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { TextField } from '@/components/molecules/TextField';
import { Button } from '@/components/atoms/Button';
import { useForgotPasswordMutation } from '@/api/queries/auth';
import { applyFormErrors } from '@/lib/apiError';
import { paths } from '@/routes/paths';
import { Mail, Shield, Check } from '@/components/atoms/icons';
import { cn } from '@/lib/cn';

interface ForgotForm {
  email: string;
  human: boolean;
}

export function ForgotPasswordPage() {
  const methods = useForm<ForgotForm>({ defaultValues: { email: '', human: false } });
  const forgot = useForgotPasswordMutation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const onToggleHuman = useCallback(
    (checked: boolean) => {
      setConfirmed(checked);
      methods.setValue('human', checked, { shouldValidate: true });
      if (checked) methods.clearErrors('human');
    },
    [methods],
  );

  const onSubmit = useCallback(
    async (data: ForgotForm) => {
      if (!data.human) {
        methods.setError('human', { message: 'Please confirm you are human' });
        return;
      }
      try {
        await forgot.mutateAsync({ email: data.email.trim() });
        navigate(paths.verifyOtp, { replace: true });
      } catch (err) {
        applyFormErrors(err, methods.setError, 'Request failed');
      }
    },
    [forgot, methods, navigate],
  );

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            icon={<Mail className="h-5 w-5" />}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold tracking-wide">Security Check</label>
            <label className="group flex cursor-pointer items-center justify-between rounded-xl border border-border-light bg-input-bg-light p-4 transition-colors hover:border-brand-orange dark:border-border-dark dark:bg-input-bg-dark">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded border-2 transition-colors',
                    confirmed
                      ? 'border-brand-orange bg-brand-orange text-white'
                      : 'border-border-light group-hover:border-brand-orange dark:border-border-dark',
                  )}
                >
                  {confirmed && <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm font-medium">I am human</span>
              </div>
              <Shield className="h-6 w-6 text-brand-blue" />
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => onToggleHuman(e.target.checked)}
                className="sr-only"
              />
            </label>
            {methods.formState.errors.human && (
              <p role="alert" className="mt-1 text-xs text-red-500">
                {methods.formState.errors.human.message}
              </p>
            )}
          </div>

          {methods.formState.errors.root && (
            <p role="alert" className="text-xs text-red-500">
              {methods.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            isLoading={forgot.isPending}
            className="w-full rounded-xl bg-brand-blue py-3.5 font-bold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue-hover hover:shadow-glow-blue"
          >
            Send Reset Link
          </Button>
        </form>
      </FormProvider>

      <div className="mt-6 text-center">
        <Link
          to={paths.login}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted-light transition-colors hover:text-text-main-light dark:text-text-muted-dark dark:hover:text-text-main-dark"
        >
          ← Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
