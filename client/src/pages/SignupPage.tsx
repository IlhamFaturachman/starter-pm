import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { TextField } from '@/components/molecules/TextField';
import { Button } from '@/components/atoms/Button';
import { useSignupMutation } from '@/api/queries/auth';
import { paths } from '@/routes/paths';
import { User, Mail, Lock } from '@/pages/_icons';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupPage() {
  const methods = useForm<SignupForm>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });
  const signup = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      methods.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    try {
      await signup.mutateAsync(data);
      navigate(paths.dashboard);
    } catch (err) {
      methods.setError('root', { message: (err as Error).message || 'Signup failed' });
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with us today."
      withIllustration
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            name="name"
            label="Full Name"
            placeholder="John Doe"
            autoComplete="name"
            icon={<User className="h-5 w-5" />}
          />
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
            autoComplete="new-password"
            icon={<Lock className="h-5 w-5" />}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            icon={<Lock className="h-5 w-5" />}
          />

          {methods.formState.errors.root && (
            <p className="text-xs text-red-500">{methods.formState.errors.root.message}</p>
          )}

          <Button
            type="submit"
            isLoading={signup.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-brand-orange to-orange-500 py-3.5 font-bold text-white shadow-lg shadow-brand-orange/20 hover:from-brand-orange-hover hover:to-orange-600 hover:shadow-glow-orange"
          >
            Create Account
          </Button>
        </form>
      </FormProvider>

      <div className="mt-8 border-t border-border-light pt-6 text-center dark:border-border-dark">
        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          Already have an account?{' '}
          <Link
            to={paths.login}
            className="font-bold text-brand-blue transition-colors hover:text-brand-blue-hover"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
