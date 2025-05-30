import axios from 'axios';

const API_KEY = '3307b1b2'; 
// FIXED: Changed to HTTPS instead of HTTP
const BASE_URL = 'https://www.omdbapi.com/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
  timeout: 10000,
});

export const sampleMovies = (movies, count = 10) => {
  if (!movies?.length || movies.length <= count) return [...movies];
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) return { Search: [], totalResults: 0 };

  try {
    const res = await apiClient.get('/', {
      params: { 
        s: query,  // OMDb uses `s` for search
        page,
      },
    });
    return {
      Search: res.data.Search || [],
      totalResults: res.data.totalResults || 0,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error(
      error.response?.data?.Error === 'Invalid API key!'
        ? 'API key invalid or expired'
        : 'Failed to search movies'
    );
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await apiClient.get('/', {
      params: {
        i: id,  // OMDb uses `i` for movie ID
        plot: 'full',  // Optional: Get full plot
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error(
      error.response?.data?.Error === 'Invalid API key!'
        ? 'API key invalid or expired'
        : 'Failed to get movie details'
    );
  }
};