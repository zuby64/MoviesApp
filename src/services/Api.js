import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

export const fetchPopularMovies = async (page) => {
  try {
    const apiKey = 'api-key-goes-here'; 
    const response = await tmdbApi.get(`/?apikey=[${apiKey}]&page=${page}&type='movies'`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

