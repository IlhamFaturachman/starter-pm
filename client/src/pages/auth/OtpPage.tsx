import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthLayout } from '@/components/templates/AuthLayout';
import { OtpInput } from '@/components/molecules/OtpInput';
import { Button } from '@/components/atoms/Button';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/api/queries/auth';
import { getApiErrorMessage } from '@/lib/apiError';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { paths } from '@/routes/paths';

export function OtpPage() {
  const [code, setCode] = useState('');
  const verify = useVerifyOtpMutation();
  const resend = useResendOtpMutation();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const pushToast = useUiStore((s) => s.pushToast);
  const navigate = useNavigate();

  const canSubmit = useMemo(
    () => code.length === 6 && Boolean(pendingEmail) && !verify.isPending,
    [code.length, pendingEmail, verify.isPending],
  );

  const onCodeChange = useCallback((value: string) => {
    setCode(value.replace(/\D/g, '').slice(0, 6));
  }, []);

  const onSubmit = useCallback(async () => {
    if (!canSubmit || !pendingEmail) return;
    try {
      await verify.mutateAsync({ email: pendingEmail, code });
      pushToast({
        message: 'Password reset. Check your email for a temporary password, then sign in.',
        tone: 'success',
      });
      navigate(paths.login, { replace: true });
    } catch (err) {
      pushToast({ message: getApiErrorMessage(err, 'Invalid code'), tone: 'danger' });
    }
  }, [canSubmit, code, navigate, pendingEmail, pushToast, verify]);

  const onResend = useCallback(async () => {
    if (!pendingEmail || resend.isPending) return;
    try {
      await resend.mutateAsync(pendingEmail);
      setCode('');
      pushToast({ message: 'A new code was sent to your email.', tone: 'info' });
    } catch (err) {
      pushToast({ message: getApiErrorMessage(err, 'Could not resend code'), tone: 'danger' });
    }
  }, [pendingEmail, pushToast, resend]);

  if (!pendingEmail) return null;

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
        <OtpInput value={code} onChange={onCodeChange} disabled={verify.isPending} />

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
            disabled={!canSubmit}
            className="flex-1 rounded-xl bg-gradient-to-r from-brand-orange to-orange-500 py-3.5 font-bold text-white shadow-lg shadow-brand-orange/20 hover:from-brand-orange-hover hover:to-orange-600 hover:shadow-glow-orange disabled:opacity-50"
          >
            Verify Code
          </Button>
        </div>

        <p className="text-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          Didn&apos;t receive the email?{' '}
          <button
            type="button"
            onClick={onResend}
            disabled={resend.isPending}
            className="font-semibold text-brand-blue transition-colors hover:text-brand-blue-hover disabled:opacity-50"
          >
            {resend.isPending ? 'Sending…' : 'Click to resend'}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
