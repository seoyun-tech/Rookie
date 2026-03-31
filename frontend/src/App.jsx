import { useState } from 'react';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';

export function App() {
  const [currentPage, setCurrentPage] = useState('main');

  return (
    <div className="relative">
      {/* Simple Page Switcher for Demo */}
      <div className="fixed bottom-4 left-4 z-[9999] flex gap-2 bg-black/50 p-2 rounded-xl backdrop-blur-md">
        <button 
          onClick={() => setCurrentPage('main')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currentPage === 'main' ? 'bg-primary-500 text-black' : 'bg-white/20 text-white'}`}
        >
          Main
        </button>
        <button 
          onClick={() => setCurrentPage('search')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currentPage === 'search' ? 'bg-primary-500 text-black' : 'bg-white/20 text-white'}`}
        >
          Search
        </button>
        <button 
          onClick={() => setCurrentPage('mypage')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currentPage === 'mypage' ? 'bg-primary-500 text-black' : 'bg-white/20 text-white'}`}
        >
          MyPage
        </button>
      </div>

      {currentPage === 'main' && <MainPage />}
      {currentPage === 'search' && <SearchPage />}
      {currentPage === 'mypage' && <MyPage />}
    </div>
  );
}
