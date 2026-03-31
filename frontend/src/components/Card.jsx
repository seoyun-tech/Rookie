import { twMerge } from 'tailwind-merge';

export default function Card({
  thumbnail,
  title,
  subtitle,
  badge,
  onClick,
  className,
  children,
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'bg-gray-950 rounded-3xl overflow-hidden shadow-md transition-transform duration-150',
        onClick && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        className,
      )}
    >
      {thumbnail && (
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          {badge && (
            <div className="absolute top-2 left-2">
              {badge}
            </div>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col gap-1">
        {title && (
          <p className="text-base font-bold text-white leading-snug line-clamp-2">
            {title}
          </p>
        )}
        {subtitle && (
          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
