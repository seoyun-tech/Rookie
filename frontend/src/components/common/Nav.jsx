import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faHome, faStar, faUser, faChevronDown, faLeaf } from '@fortawesome/free-solid-svg-icons';

// Figma Asset URLs for Nav
const NAV_ASSETS = {
  profile: "https://www.figma.com/api/mcp/asset/576ed7e4-d395-48c1-9714-bc6239e33a75",
  leaf: "https://www.figma.com/api/mcp/asset/2d8f4295-112a-4287-9ea7-f2162b26511f",
  arrowDown: "https://www.figma.com/api/mcp/asset/28053465-08ac-49ce-957b-40c14a2cb6e9",
  search: "https://www.figma.com/api/mcp/asset/18fc27d9-6197-4c05-9c69-c2f80f4682b9",
  notif: "https://www.figma.com/api/mcp/asset/eef3f84d-05be-41d5-b5d5-2b96ea972da0"
};

/**
 * Nav Button Component (Internal)
 */
function NavButton({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex flex-col items-center justify-center w-[80px] h-[80px] rounded-3xl transition-all duration-200 cursor-pointer p-3 gap-1',
        active ? 'bg-primary-500 shadow-sm' : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
      )}
    >
      <div className={twMerge(
        'flex items-center justify-center size-[30px]',
        active ? 'text-primary-950' : 'text-gray-300'
      )}>
        <FontAwesomeIcon icon={icon} className="text-[24px]" />
      </div>
      <span className={twMerge(
        'text-xs font-semibold leading-tight font-sans',
        active ? 'text-primary-950' : 'text-gray-300'
      )}>
        {label}
      </span>
    </button>
  );
}

/**
 * Nav Profile Component (Internal)
 */
function NavProfile({ name = "최승아", zone = "키즈존 4~7세" }) {
  return (
    <button className="flex items-center h-[44px] w-[150px] bg-gray-50 rounded-full px-[10px] gap-[8px] hover:bg-gray-100 transition-colors cursor-pointer border-none outline-none">
      <div className="size-[24px] bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
        <img src={NAV_ASSETS.profile} className="w-full h-full object-cover" alt="profile" />
      </div>
      <div className="flex flex-col items-start leading-tight overflow-hidden">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-700 font-sans whitespace-nowrap">{name}</span>
          <img src={NAV_ASSETS.leaf} className="size-[16px]" alt="leaf" />
        </div>
        <span className="text-[12px] font-bold text-green-600 font-sans whitespace-nowrap">{zone}</span>
      </div>
      <div className="ml-auto">
        <img src={NAV_ASSETS.arrowDown} className="size-[12px]" alt="arrow" />
      </div>
    </button>
  );
}

/**
 * Main Navigation Component
 */
export default function Nav({ activeTab = "main" }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full h-[120px] bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center px-10">
      <div className="w-full max-w-[1200px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          className="flex items-center p-[27px] select-none cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-[54px] font-black tracking-tight leading-none uppercase font-sans">
            <span className="text-[#3d2200]">Roo</span>
            <span className="text-[#ffc633]">KIZ</span>
          </span>
        </div>

        {/* Center: Nav Buttons */}
        <div className="flex items-center gap-[18px]">
          <NavButton 
            icon={faHome} 
            label="메인" 
            active={activeTab === "main"} 
            onClick={() => navigate('/')}
          />
          <NavButton 
            icon={faStar} 
            label="내 친구 루" 
            active={activeTab === "airon"} 
            onClick={() => navigate('/airon')}
          />
          <NavButton 
            icon={faUser} 
            label="마이 페이지" 
            active={activeTab === "mypage"} 
            onClick={() => navigate('/mypage')}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button 
            className="size-[38px] bg-gray-50 rounded-full flex items-center justify-center cursor-pointer transition-colors overflow-hidden"
            onClick={() => navigate('/search')}
          >
            <img src={NAV_ASSETS.search} className="size-[15px]" alt="search" />
          </button>
          <button className="size-[38px] bg-gray-50 rounded-full flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden">
            <img src="https://www.figma.com/api/mcp/asset/eef3f84d-05be-41d5-b5d5-2b96ea972da0" className="size-[18px]" alt="bell" />
            <div className="absolute top-2 right-2 size-[8px] bg-secondary-400 rounded-full" />
          </button>
          <div className="ml-1">
            <NavProfile />
          </div>
        </div>

      </div>
    </nav>
  );
}
