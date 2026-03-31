import { twMerge } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Section Title with View All Link
 */
export default function ContentRow({ title, showViewAll = true, viewAllLink = "#", className, children }) {
  return (
    <div className={twMerge('w-full flex flex-col gap-7', className)}>
      <div className="flex items-center justify-between w-full max-w-[1200px]">
        <h2 className="text-4xl font-black text-[#44433f] tracking-tight leading-[48px]">
          {title}
        </h2>
        {showViewAll && (
          <a 
            href={viewAllLink} 
            className="flex items-center gap-1 text-lg font-bold text-[#44433f] hover:opacity-70 transition-opacity font-poppins"
          >
            <span>더보기</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          </a>
        )}
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
