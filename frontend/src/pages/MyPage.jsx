import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';
import ContentRow from '../components/common/ContentRow';
import Card from '../components/common/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar, faShield, faChartLine, faAward } from '@fortawesome/free-solid-svg-icons';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activeTab="mypage" />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-10 py-20 flex flex-col gap-20">
        
        {/* Profile Section */}
        <section className="flex items-center gap-12 bg-gray-50 p-12 rounded-[48px] relative overflow-hidden">
          <div className="size-40 bg-white rounded-full flex items-center justify-center border-8 border-primary-500 shadow-xl relative z-10 overflow-hidden">
             <FontAwesomeIcon icon={faUser} className="text-gray-200 text-7xl translate-y-2" />
          </div>
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-[48px] font-black text-gray-800">최승아</h1>
              <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-lg font-bold">키즈 4~7세</div>
            </div>
            <p className="text-gray-400 text-xl font-medium">루키즈와 함께한 지 <span className="text-primary-500 font-bold">128일</span>째예요!</p>
            <div className="flex gap-4 mt-2">
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                <FontAwesomeIcon icon={faStar} className="text-primary-500 text-xl" />
                <span className="font-bold">포인트 2,450P</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3">
                <FontAwesomeIcon icon={faAward} className="text-secondary-500 text-xl" />
                <span className="font-bold">베스트 탐험가</span>
              </div>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 p-20 opacity-10">
             <FontAwesomeIcon icon={faShield} className="text-[300px] text-primary-500" />
          </div>
        </section>

        {/* Bento Grid: Care Report & Stats */}
        <section className="grid grid-cols-12 gap-8 h-[500px]">
          <div className="col-span-8 bg-blue-50 rounded-[48px] p-12 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all">
             <div className="flex justify-between items-start">
               <div className="flex flex-col gap-4">
                 <h2 className="text-[36px] font-black text-blue-900 leading-tight">이번 주<br />성장 리포트</h2>
                 <p className="text-blue-700/60 text-lg font-bold">승아의 창의력이 쑥쑥 자라고 있어요!</p>
               </div>
               <div className="size-24 bg-white rounded-3xl flex items-center justify-center text-blue-500 text-4xl shadow-sm">
                 <FontAwesomeIcon icon={faChartLine} />
               </div>
             </div>
             <div className="flex gap-4">
               {[1, 2, 3, 4, 5, 6, 7].map(d => (
                 <div key={d} className="flex-1 h-32 bg-white/50 rounded-2xl flex flex-col-reverse p-2 gap-2">
                    <div className="w-full bg-blue-500 rounded-lg" style={{ height: `${Math.random() * 100}%` }} />
                 </div>
               ))}
             </div>
          </div>
          <div className="col-span-4 bg-orange-50 rounded-[48px] p-12 flex flex-col gap-6 items-center justify-center text-center group cursor-pointer hover:shadow-xl transition-all">
             <div className="size-24 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-500 text-4xl group-hover:scale-110 transition-transform">
               <FontAwesomeIcon icon={faAward} />
             </div>
             <div className="flex flex-col gap-2">
               <h3 className="text-2xl font-black text-orange-900">도감 수집 현황</h3>
               <p className="text-orange-700/60 font-bold text-lg">45 / 120</p>
             </div>
             <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black shadow-lg">보러가기</button>
          </div>
        </section>

        {/* Content Rows */}
        <ContentRow title="최근에 봤어요">
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Card 
                key={i}
                size="sm"
                title={`이어보기 콘텐츠 ${i}`}
                image={`https://picsum.photos/seed/recent${i}/400/400`}
              />
            ))}
          </div>
        </ContentRow>

      </main>

      <Footer />
    </div>
  );
}
