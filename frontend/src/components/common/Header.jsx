import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Header — 섹션 타이틀 + 더보기 링크
 */
export default function Header({ title, showViewAll = true, viewAllLink = '#' }) {
  return (
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
  );
}
