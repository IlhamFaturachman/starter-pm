import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { OtpInput } from '@/components/molecules/OtpInput';
import { Button } from '@/components/atoms/Button';
import { useVerifyOtpMutation } from '@/api/queries/auth';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { paths } from '@/routes/paths';
import { useState } from 'react';

export function OtpPage() {
  const [code, setCode] = useState('');
  const verify = useVerifyOtpMutation();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const pushToast = useUiStore((s) => s.pushToast);
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (code.length !== 6 || !pendingEmail) return;
    try {
      await verify.mutateAsync({ email: pendingEmail, code });
      pushToast({ message: 'Password reset. Please sign in.', tone: 'success' });
      navigate(paths.login);
    } catch (err) {
      pushToast({ message: (err as Error).message || 'Invalid code', tone: 'danger' });
    }
  };

  if (!pendingEmail) {
    return null;
  }

  return (
    <AuthLayout
      title="Check your email"
      subtitle={
        <>
          We sent a verification code to{' '}
          <span className="font-semibold text-text-main-light dark:text-text-main-dark">
            {pendingEmail}
          </span>
        </>
      }
    >
      <div className="space-y-8">
        <OtpInput value={code} onChange={setCode} />

        <div className="flex gap-2">
          <Link
            to={paths.forgotPassword}
            className="flex-1 rounded-xl border border-border-light px-4 py-3.5 text-center text-sm font-semibold text-text-muted-light transition-colors hover:bg-surface-50 dark:border-border-dark dark:text-text-muted-dark dark:hover:bg-surface-800"
          >
            Back
          </Link>
          <Button
            type="button"
            onClick={onSubmit}
            isLoading={verify.isPending}
            disabled={code.length !== 6}
            className="flex-1 rounded-xl bg-gradient-to-r from-brand-orange to-orange-500 py-3.5 font-bold text-white shadow-lg shadow-brand-orange/20 hover:from-brand-orange-hover hover:to-orange-600 hover:shadow-glow-orange disabled:opacity-50"
          >
            Verify Code
          </Button>
        </div>

        <p className="text-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          Didn&apos;t receive the email?{' '}
          <button
            type="button"
            className="font-semibold text-brand-blue transition-colors hover:text-brand-blue-hover"
          >
            Click to resend
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
