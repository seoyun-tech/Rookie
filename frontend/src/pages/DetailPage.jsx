import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import api from "../api/axios";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";
import Card from "../components/common/Card";
import ContentRow from "../components/common/ContentRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCalendarAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

// Figma Asset for AI character '루'
const ASSETS = {
  aiRoo:
    "https://www.figma.com/api/mcp/asset/72ba9870-e738-4c0f-9884-a7b11cfa61cc",
};

export default function DetailPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async (id) => {
    try {
      const response = await api.get(`movie/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const getMovieVideos = async (id) => {
    try {
      const response = await api.get(`movie/${id}/videos`);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movie videos:", error);
      return [];
    }
  };

  const getSimilarMovies = async (id) => {
    try {
      const response = await api.get(`movie/${id}/similar`);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching similar movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [movieData, videoData, similarData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieVideos(movieId),
        getSimilarMovies(movieId),
      ]);

      setMovie(movieData);
      setVideos(videoData);
      setSimilarMovies(similarData);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <div className="size-48 bg-primary-300 rounded-full flex items-center justify-center shadow-lg animate-bounce overflow-hidden border-4 border-white">
          <img
            src={ASSETS.aiRoo}
            className="w-[200px] h-[300px] object-contain translate-y-6"
            alt="Roo"
          />
        </div>
        <p className="text-3xl font-black text-primary-600 animate-pulse">
          로딩중...
        </p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">영화를 찾을 수 없어요!</p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary-500 text-gray-800 px-6 py-3 rounded-full font-bold"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // Find the official trailer
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos[0];

  return (
    <div className="min-h-screen bg-white">
      <Nav activeTab="main" />

      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col gap-8 md:gap-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-fit flex items-center gap-1.5 md:gap-2 text-primary-600 font-black text-xl md:text-2xl hover:scale-105 transition-transform"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>뒤로가기</span>
        </button>

        {/* Top: Header Info */}
        <section className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center lg:items-start">
          <div className="w-full max-w-[320px] md:max-w-[400px] shrink-0 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-4 md:border-8 border-primary-100">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8 flex-1 w-full">
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-lg md:text-2xl font-bold text-gray-500">
                <div className="flex items-center gap-2 text-yellow-500 bg-yellow-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-blue-500">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{movie.release_date?.split("-")[0]}년 개봉</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 md:p-10 rounded-3xl md:rounded-[48px]">
              <h3 className="text-xl md:text-3xl font-black text-primary-700 mb-2 md:mb-4">
                어떤 이야기인가요?
              </h3>
              <p className="text-base md:text-2xl font-medium text-gray-700 leading-relaxed break-keep">
                {movie.overview || "설명이 준비 중이에요!"}
              </p>
            </div>
          </div>
        </section>

        {/* Middle: Video Trailer */}
        {trailer && (
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 border-l-[8px] md:border-l-[12px] border-primary-500 pl-4 md:pl-6">
              미리보기 영상
            </h2>
            <div className="w-full aspect-video rounded-3xl md:rounded-[60px] overflow-hidden shadow-xl border-2 md:border-4 border-gray-100 bg-black">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                width="100%"
                height="100%"
                controls
              />
            </div>
          </section>
        )}

        {/* Bottom: Similar Movies */}
        <ContentRow title="이런 영화도 좋아할 거야!" className="pb-20">
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-8 scrollbar-hide px-2">
            {similarMovies.length > 0 ? (
              similarMovies.map((m) => (
                <div
                  key={m.id}
                  className="min-w-[200px] md:min-w-[280px] cursor-pointer"
                  onClick={() => navigate(`/movie/${m.id}`)}
                >
                  <Card
                    title={m.title}
                    image={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
                    size="sm"
                    className="aspect-[3/4] md:aspect-square"
                  >
                    <span className="text-sm md:text-lg font-bold text-yellow-500">
                      ★ {m.vote_average?.toFixed(1)}
                    </span>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-lg md:text-xl font-medium text-gray-400">
                비슷한 영화를 찾는 중이에요...
              </p>
            )}
          </div>
        </ContentRow>
      </main>

      <Footer />
    </div>
  );
}
