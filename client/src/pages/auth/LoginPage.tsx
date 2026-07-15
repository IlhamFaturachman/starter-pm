import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { TextField } from '@/components/molecules/TextField';
import { Button } from '@/components/atoms/Button';
import { useLoginMutation } from '@/api/queries/auth';
import { applyFormErrors } from '@/lib/apiError';
import { paths } from '@/routes/paths';
import { Mail, Lock } from '@/components/atoms/icons';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginPage() {
  const methods = useForm<LoginForm>({
    defaultValues: { email: '', password: '', remember: true },
  });
  const login = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        await login.mutateAsync({
          email: data.email.trim(),
          password: data.password,
          remember: data.remember,
        });
        navigate(paths.dashboard, { replace: true });
      } catch (err) {
        applyFormErrors(err, methods.setError, 'Login failed');
      }
    },
    [login, methods.setError, navigate],
  );

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please enter your details to sign in."
      withIllustration
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            icon={<Mail className="h-5 w-5" />}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            icon={<Lock className="h-5 w-5" />}
          />

          <div className="flex items-center justify-between pt-1">
            <label className="group flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                {...methods.register('remember')}
                className="h-4 w-4 cursor-pointer rounded border-border-light bg-input-bg-light text-brand-orange focus:ring-brand-orange/50 focus:ring-offset-0 dark:border-border-dark dark:bg-input-bg-dark"
              />
              <span className="text-sm font-medium text-text-muted-light transition-colors group-hover:text-text-main-light dark:text-text-muted-dark dark:group-hover:text-text-main-dark">
                Remember me
              </span>
            </label>
            <Link
              to={paths.forgotPassword}
              className="text-sm font-semibold text-brand-blue transition-colors hover:text-brand-orange dark:text-[#3B9AE5]"
            >
              Forgot password?
            </Link>
          </div>

          {methods.formState.errors.root && (
            <p role="alert" className="text-xs text-red-500">
              {methods.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            isLoading={login.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-blue-500 py-3.5 font-bold text-white shadow-lg shadow-brand-blue/20 hover:from-brand-blue-hover hover:to-blue-600 hover:shadow-glow-blue"
          >
            Sign In
          </Button>
        </form>
      </FormProvider>

      <div className="mt-8 border-t border-border-light pt-6 text-center dark:border-border-dark">
        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          Don&apos;t have an account?{' '}
          <Link
            to={paths.signup}
            className="font-bold text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
