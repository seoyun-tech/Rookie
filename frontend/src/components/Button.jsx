import { twMerge } from 'tailwind-merge';

const variants = {
  primary:   'bg-primary-500 text-gray-950 hover:bg-primary-400 active:bg-primary-600',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-400 active:bg-secondary-600',
  blue:      'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600',
  outline:   'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200',
  ghost:     'text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-xl',
  md: 'px-4 py-2 text-base rounded-2xl',
  lg: 'px-6 py-3 text-lg rounded-3xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        'inline-flex items-center justify-center font-semibold transition-colors duration-150 cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
