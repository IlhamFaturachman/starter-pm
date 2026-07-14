import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';

const variantClasses: Record<Variant, string> = {
  h1: 'text-3xl font-bold tracking-tight',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-semibold',
  h4: 'text-lg font-medium',
  body: 'text-sm',
  caption: 'text-xs text-surface-600',
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  children: ReactNode;
}

export function Typography({
  variant = 'body',
  as,
  className,
  children,
  ...rest
}: TypographyProps) {
  const Tag = (as ?? (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' ? variant : 'p')) as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'span';
  return (
    <Tag className={cn(variantClasses[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
