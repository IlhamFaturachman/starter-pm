import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ClipboardEvent as ReactClipboardEvent,
} from 'react';
import { cn } from '@/lib/cn';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OtpInput({ length = 6, value, onChange, disabled }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusAt = useCallback((index: number) => {
    const el = inputsRef.current[index];
    el?.focus();
    el?.select();
  }, []);

  const setChar = useCallback(
    (index: number, char: string) => {
      const chars = value.split('');
      chars[index] = char;
      onChange(chars.join('').slice(0, length).replace(/\s/g, ''));
    },
    [value, length, onChange],
  );

  const handleInput = useCallback(
    (index: number, raw: string) => {
      const digit = raw.replace(/\D/g, '').slice(-1);
      if (!digit) return;
      setChar(index, digit);
      if (index < length - 1) focusAt(index + 1);
    },
    [setChar, focusAt, length],
  );

  const handleKeyDown = useCallback(
    (index: number, e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (value[index]) {
          setChar(index, '');
        } else if (index > 0) {
          focusAt(index - 1);
          setChar(index - 1, '');
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusAt(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusAt(index + 1);
      }
    },
    [value, setChar, focusAt, length],
  );

  const handlePaste = useCallback(
    (e: ReactClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      if (!pasted) return;
      onChange(pasted);
      focusAt(Math.min(pasted.length, length - 1));
    },
    [length, onChange, focusAt],
  );

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="number"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          value={value[i] ?? ''}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            'h-14 w-12 rounded-xl border border-border-light bg-input-bg-light text-center text-2xl font-bold',
            'text-text-main-light focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30',
            'transition-all shadow-sm dark:border-border-dark dark:bg-input-bg-dark dark:text-text-main-dark',
            'disabled:opacity-60',
          )}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
