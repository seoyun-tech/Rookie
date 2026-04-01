import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import DetailPage from './pages/DetailPage';

export function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/movie/:movieId" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
