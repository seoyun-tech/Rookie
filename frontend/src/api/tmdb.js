import api from './axios';

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

export const fetchKidsMovies = async () => {
  try {
    // 키즈 친화적인 장르 (애니메이션: 16, 가족: 10751)
    const response = await api.get('discover/movie', {
      params: {
        with_genres: '16,10751',
        sort_by: 'popularity.desc'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching kids movies:", error);
    return [];
  }
};
