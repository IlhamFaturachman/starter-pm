import { isAxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ApiError } from '@/types/api';

function getErrorBody(err: unknown): ApiError | undefined {
  if (!isAxiosError(err)) return undefined;
  const data = err.response?.data;
  if (!data || typeof data !== 'object') return undefined;
  return data as ApiError;
}

export function getApiErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  const body = getErrorBody(err);
  if (body?.message) return body.message;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

/** Map BE field errors into RHF; falls back to `root` for generic messages. */
export function applyFormErrors<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
  fallback = 'Something went wrong',
): void {
  const body = getErrorBody(err);

  if (body?.errors) {
    let applied = false;
    for (const [field, messages] of Object.entries(body.errors)) {
      const message = messages?.[0];
      if (!message) continue;
      setError(field as Path<T>, { type: 'server', message });
      applied = true;
    }
    if (applied) {
      if (body.message) setError('root' as Path<T>, { type: 'server', message: body.message });
      return;
    }
  }

  setError('root' as Path<T>, {
    type: 'server',
    message: body?.message ?? getApiErrorMessage(err, fallback),
  });
}
