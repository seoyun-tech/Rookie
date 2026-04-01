import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import logoSvg from '../../LOGO.svg';

function NavButton({ iconName, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex flex-col items-center justify-center w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-2xl md:rounded-3xl transition-all duration-200 cursor-pointer gap-1',
        active ? 'bg-primary-500' : 'bg-gray-50 hover:bg-gray-100'
      )}
    >
      <Icon
        icon={iconName}
        className={twMerge(
          'text-[22px] md:text-[26px]',
          active ? 'text-primary-950' : 'text-gray-300'
        )}
      />
      <span className={twMerge(
        'text-[10px] md:text-xs font-semibold leading-tight',
        active ? 'text-primary-950' : 'text-gray-300'
      )}>
        {label}
      </span>
    </button>
  );
}

function NavProfile({ name = "최승아", zone = "키즈존 4~7세" }) {
  return (
    <button className="flex items-center h-[44px] w-fit md:w-[150px] bg-gray-50 rounded-full px-2.5 gap-2 hover:bg-gray-100 transition-colors cursor-pointer border-none outline-none">
      <div className="size-6 bg-primary-200 rounded-full flex items-center justify-center shrink-0">
        <Icon icon="mingcute:user-4-fill" className="text-[14px] text-primary-700" />
      </div>
      <div className="hidden md:flex flex-col items-start leading-tight overflow-hidden text-left">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{name}</span>
          <Icon icon="mingcute:leaf-fill" className="text-[14px] text-green-500" />
        </div>
        <span className="text-[12px] font-bold text-green-600 whitespace-nowrap">{zone}</span>
      </div>
      <div className="ml-auto hidden md:block">
        <Icon icon="mingcute:down-small-fill" className="text-[14px] text-gray-400" />
      </div>
    </button>
  );
}

export default function Nav({ activeTab = "main" }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full h-[80px] md:h-[120px] bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center px-4 md:px-10">
      <div className="w-full max-w-[1200px] grid grid-cols-3 items-center">

        {/* Left: Logo */}
        <div
          className="flex items-center select-none cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logoSvg} alt="ROOKIZ" className="h-8 md:h-16 w-auto" />
        </div>

        {/* Center: Nav Buttons */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <NavButton
            iconName="mingcute:home-4-fill"
            label="메인"
            active={activeTab === "main"}
            onClick={() => navigate('/')}
          />
          <NavButton
            iconName="mingcute:ai-fill"
            label="내 친구 루"
            active={activeTab === "airon"}
            onClick={() => navigate('/airon')}
          />
          <NavButton
            iconName="mingcute:contacts-fill"
            label="마이 페이지"
            active={activeTab === "mypage"}
            onClick={() => navigate('/mypage')}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1">
          <button
            className="size-[38px] bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/search')}
          >
            <Icon icon="mingcute:search-2-fill" className="text-[18px] text-gray-400" />
          </button>
          <button className="size-[38px] bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative">
            <Icon icon="mingcute:notification-fill" className="text-[18px] text-gray-400" />
            <div className="absolute top-[9px] right-[9px] size-2 bg-[#ff9589] rounded-full" />
          </button>
          <div className="ml-1">
            <NavProfile />
          </div>
        </div>

      </div>
    </nav>
  );
}
