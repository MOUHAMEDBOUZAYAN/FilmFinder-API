import axios from 'axios';

const API_KEY = '3307b1b2'; 
const BASE_URL = 'http://www.omdbapi.com/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,  // OMDb uses `apikey` (not `api_key`)
  },
  timeout: 10000,
});

/**
 * Randomly selects a subset of movies
 */
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

/**
 * Fetches full details of a movie by IMDB ID
 */
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