import api from './axios';
import axios from 'axios';

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchTrending = async () => {
  try {
    const response = await api.get('trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// ✅ 백엔드 경유로 변경 (키 숨김 + 7세 이하 필터)
export const fetchKidsMovies = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/kids/recommend');
    return response.data.results;
  } catch (error) {
    console.error("Error fetching kids movies:", error);
    return [];
  }
};