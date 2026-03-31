import { twMerge } from 'tailwind-merge';

const variants = {
  primary:   'bg-primary-500 text-gray-950',
  secondary: 'bg-secondary-200 text-secondary-900',
  blue:      'bg-blue-200 text-blue-900',
  green:     'bg-green-200 text-green-900',
  gray:      'bg-gray-200 text-gray-800',
};

// 연령 등급
export const AGE_BADGE = {
  kids:   { label: '키즈 4–7세',   variant: 'primary' },
  junior: { label: '주니어 8–12세', variant: 'blue' },
};

export default function Badge({ variant = 'primary', className, children }) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
