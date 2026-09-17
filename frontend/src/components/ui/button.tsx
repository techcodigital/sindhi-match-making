import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'gold' | 'white' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-green-700 text-white shadow-lg shadow-green-700/25 hover:-translate-y-px hover:bg-green-800 hover:shadow-xl hover:shadow-green-800/25 active:translate-y-0',
  secondary:
    'bg-green-700/[0.07] text-green-900 ring-1 ring-inset ring-green-700/15 hover:bg-green-700/[0.12]',
  gold: 'bg-gradient-to-b from-amber-300 to-amber-400 text-green-950 shadow-lg shadow-amber-500/30 hover:-translate-y-px hover:brightness-105 active:translate-y-0',
  white:
    'bg-white text-green-900 shadow-lg shadow-green-950/10 hover:-translate-y-px hover:bg-green-50 active:translate-y-0',
  outline: 'bg-white/70 text-slate-700 ring-1 ring-inset ring-slate-300 hover:text-green-900 hover:ring-green-600',
  ghost: 'text-slate-600 hover:bg-green-950/[0.05] hover:text-green-900',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-9 rounded-lg px-3.5 text-[13px]',
  md: 'min-h-11 rounded-xl px-5 text-sm',
  lg: 'min-h-[52px] rounded-2xl px-7 text-[15px]',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 focus-visible:outline-none active:scale-[.98] disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 size={17} className="animate-spin" />}
      {children}
    </button>
  );
}
