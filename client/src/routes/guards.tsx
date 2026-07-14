import { redirect } from 'react-router';
import { useAuthStore } from '@/store/authStore';
import { paths } from './paths';

export function authLoader() {
  const token = useAuthStore.getState().token;
  if (!token) throw redirect(paths.login);
  return null;
}

export function guestLoader() {
  const token = useAuthStore.getState().token;
  if (token) throw redirect(paths.dashboard);
  return null;
}

export function otpLoader() {
  const { pendingEmail, pendingMode } = useAuthStore.getState();
  if (!pendingEmail || !pendingMode) throw redirect(paths.login);
  return null;
}
