import { twMerge } from 'tailwind-merge';

/**
 * Global Footer Component
 */
export default function Footer({ className }) {
  return (
    <footer className={twMerge('w-full bg-[#f5f5f5] py-8 md:py-10 px-6 md:px-10', className)}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Logo & Copyright */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <div className="flex items-center py-4 md:py-7">
            <span className="text-4xl md:text-[54px] font-black uppercase tracking-widest leading-none font-sans">
              <span className="text-[#3d2200]">Roo</span>
              <span className="text-[#ffc633]">KIZ</span>
            </span>
          </div>
          <p className="text-xs text-[#aeada4]">© 2026 Rookiz AI. The Guided Playground.</p>
        </div>

        {/* Middle Info */}
        <div className="md:col-span-3 flex flex-col gap-4 md:pt-4">
          <div className="flex gap-3">
             <div className="bg-blue-100 border border-blue-600 px-3 py-1.5 rounded-full text-blue-600 text-xs md:text-sm font-bold flex items-center gap-2">
               안전 인증
             </div>
             <div className="bg-secondary-100 border border-secondary-500 px-3 py-1.5 rounded-full text-secondary-500 text-xs md:text-sm font-bold flex items-center gap-2">
               우수 콘텐츠
             </div>
          </div>
          <div className="text-sm text-[#aeada4] leading-5 font-medium">
            <p>만 3-12세 어린이를 위한</p>
            <p>안전하고 즐거운 콘텐츠 플랫폼입니다.</p>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-3 md:gap-12 md:pt-16">
          <a href="#" className="text-sm text-[#aeada4] font-medium hover:text-gray-600">이용약관</a>
          <a href="#" className="text-sm text-[#aeada4] font-medium hover:text-gray-600">개인정보처리방침</a>
          <a href="#" className="text-sm text-[#aeada4] font-medium hover:text-gray-600">자녀 보호 설정</a>
          <a href="#" className="text-sm text-[#aeada4] font-medium hover:text-gray-600">고객센터</a>
        </div>

        {/* Social Icons */}
        <div className="md:col-span-2 flex md:justify-end gap-4 md:pt-12">
           <button className="size-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">🌐</button>
           <button className="size-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">🎧</button>
        </div>

      </div>
    </footer>
  );
}
