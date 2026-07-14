import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { TextField } from '@/components/molecules/TextField';
import { Button } from '@/components/atoms/Button';
import { useForgotPasswordMutation } from '@/api/queries/auth';
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

  const onSubmit = async (data: ForgotForm) => {
    if (!data.human) {
      methods.setError('human', { message: 'Please confirm you are human' });
      return;
    }
    try {
      await forgot.mutateAsync({ email: data.email });
      navigate(paths.verifyOtp);
    } catch (err) {
      methods.setError('root', { message: (err as Error).message || 'Request failed' });
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
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
                      : 'border-border-light dark:border-border-dark group-hover:border-brand-orange',
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
                onChange={(e) => {
                  setConfirmed(e.target.checked);
                  methods.setValue('human', e.target.checked);
                }}
                className="sr-only"
              />
            </label>
            {methods.formState.errors.human && (
              <p className="mt-1 text-xs text-red-500">
                {methods.formState.errors.human.message}
              </p>
            )}
          </div>

          {methods.formState.errors.root && (
            <p className="text-xs text-red-500">{methods.formState.errors.root.message}</p>
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
