import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';
import AgeButton from '../components/common/AgeButton';
import ContentRow from '../components/common/ContentRow';
import Card from '../components/common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Figma Asset URLs
const ASSETS = {
  hero: "https://www.figma.com/api/mcp/asset/9126fefa-7ade-4a89-93c2-9b3290519fef",
  science: "https://www.figma.com/api/mcp/asset/f557dff7-8537-4eeb-85fe-8fd66aeee8fc",
  fox: "https://www.figma.com/api/mcp/asset/42e9fffd-cea1-40f3-8f77-4af03465f840",
  lion: "https://www.figma.com/api/mcp/asset/69c946b5-64e5-4c2c-8278-32bf85f0382e",
  aiRoo: "https://www.figma.com/api/mcp/asset/72ba9870-e738-4c0f-9884-a7b11cfa61cc",
  union: "https://www.figma.com/api/mcp/asset/12d1485c-a58c-4176-ae3a-0b55dc1a20c4"
};

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Nav activeTab="main" />

      {/* Hero Banner - matching frame 223:288 */}
      <section className="w-full max-w-[1280px] px-10 pt-6 pb-10">
        <div className="relative w-[1200px] h-[600px] rounded-3xl overflow-hidden shadow-sm mx-auto">
          <img 
            src={ASSETS.hero} 
            className="absolute inset-0 w-full h-full object-cover"
            alt="슈퍼 히어로 특공대"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-12 max-w-[672px] flex flex-col gap-4 text-white">
            <div className="bg-primary-400 w-fit px-3 py-1.5 rounded-full flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-primary-700 size-5" />
              <span className="text-sm font-bold text-primary-700 font-poppins">신규</span>
            </div>
            <h1 className="text-[60px] font-black leading-[60px] font-poppins">슈퍼 히어로 특공대!</h1>
            <div className="text-lg font-medium text-white/80 leading-7">
              <p>슈퍼히어로가 꿈인 승아는 친구들을 모아 특공대를 만든다!</p>
              <p>승아와 친구들의 좌충우돌 도전기</p>
            </div>
            <div className="flex gap-4 mt-2">
              <button className="bg-primary-500 text-gray-700 px-8 py-4 rounded-[48px] flex items-center gap-2 shadow-lg hover:bg-primary-400 transition-all font-bold text-2xl">
                <FontAwesomeIcon icon={faPlay} className="size-6" />
                <span>보러가기</span>
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-gray-50 text-gray-50 px-8 py-4 rounded-[48px] flex items-center gap-2 shadow-lg hover:bg-white/30 transition-all font-bold text-2xl">
                <FontAwesomeIcon icon={faCircleInfo} className="size-6" />
                <span>더보기</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-[1280px] flex flex-col gap-10">
        
        {/* Age Selection */}
        <div className="px-10 flex gap-3.5">
          <AgeButton label="키즈 4~7세" active />
          <AgeButton label="주니어 8~12세" />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10 pb-20">
          
          {/* 이어보기 */}
          <ContentRow title="이어보기" className="px-10">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col gap-2.5 min-w-[320px]">
                  <div className="relative h-[180px] rounded-3xl overflow-hidden group">
                    <img src={ASSETS.fox} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
                      <div className="bg-primary-500 h-full w-1/2" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">여우들의 비밀</h4>
                    <p className="text-lg font-medium text-gray-500">10분 남음</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentRow>

          {/* 루의 추천 - Grid matching 264:715 */}
          <ContentRow title="루의 추천" className="px-10">
            <div className="grid grid-cols-4 grid-rows-2 gap-10 h-[580px]">
              <div className="col-span-2 row-span-2">
                <Card size="lg" title="신비한 과학이야기" image={ASSETS.science} className="h-full" />
              </div>
              <Card size="sm" title="신비한 과학이야기" image={ASSETS.science} />
              <Card size="sm" title="신비한 과학이야기" image={ASSETS.science} />
              <Card size="sm" title="신비한 과학이야기" image={ASSETS.science} />
              <Card size="sm" title="신비한 과학이야기" image={ASSETS.science} />
            </div>
          </ContentRow>

          {/* 인기 있는 캐릭터! */}
          <ContentRow title="인기 있는 캐릭터!" className="px-10">
            <div className="flex gap-10">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-[208px] h-[188px] rounded-[48px] bg-white overflow-hidden shadow-sm">
                    <img src={ASSETS.lion} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-700">사자선생님</span>
                </div>
              ))}
            </div>
          </ContentRow>

          {/* 인기 콘텐츠 */}
          <ContentRow title="인기 콘텐츠" className="px-10">
            <div className="grid grid-cols-4 gap-10">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[360px] rounded-[50px] overflow-hidden relative group cursor-pointer shadow-sm">
                  <img src={ASSETS.science} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white text-[21px] font-black">신비한 과학이야기</div>
                </div>
              ))}
            </div>
          </ContentRow>

          {/* 프리미엄 배너 */}
          <div className="mx-10 h-[160px] bg-blue-900 rounded-4xl flex items-center justify-between px-8 relative overflow-hidden shadow-lg">
            <div className="absolute -right-10 -bottom-10 size-48 bg-primary-500/20 blur-[32px] rounded-full" />
            <div className="flex flex-col gap-5 relative z-10 text-gray-50">
              <h2 className="text-4xl font-black">프리미엄으로 구독하세요!</h2>
              <p className="text-xl font-normal">더 많은 혜택이 팡팡! 프리미엄으로 더 많은 프로필을 등록하세요!</p>
            </div>
            <button className="bg-primary-500 text-primary-950 px-8 py-4 rounded-[48px] font-black text-2xl shadow-lg relative z-10 hover:bg-primary-400 transition-all">
              보러가기
            </button>
          </div>

        </div>
      </main>

      {/* AI Roo Chat Button - Precisely positioned based on 270:2494 */}
      <div className="fixed bottom-20 right-20 flex items-center gap-2 group z-[100]">
        <div className="relative">
          <img src={ASSETS.union} className="w-[216px]" alt="bubble" />
          <span className="absolute inset-0 flex items-center justify-center text-gray-600 text-2xl font-semibold mb-2">
            루에게 물어보세요!
          </span>
        </div>
        <div className="size-[95px] bg-primary-300 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform overflow-hidden border-4 border-white">
          <img src={ASSETS.aiRoo} className="w-[125px] h-[180px] object-contain translate-y-4" alt="Roo" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
