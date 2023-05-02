import axiosApi from '@common/axios';
import {
  Credits,
  GenreResponse,
  ListResponse,
  Movie,
  MovieDetail,
  Person,
  SortBy
} from '@common/models';

// Genres
const getGenres = async () => {
  const res = await axiosApi.get<GenreResponse>('genre/movie/list');
  return res.data.genres;
};

// Movies
const getMovies = async (type: string, page = 1) => {
  const res = await axiosApi.get<ListResponse<Movie>>(`movie/${type}`, {
    params: { page }
  });
  return res.data;
};

const getMoviesWithGenres = async (with_genres: number, page = 1) => {
  const res = await axiosApi.get<ListResponse<Movie>>('discover/movie', {
    params: { page, sort_by: 'popularity.desc', with_genres }
  });
  return res.data;
};

const search = async (query: string, page = 1) => {
  const res = await axiosApi.get<ListResponse<Movie>>('search/movie', {
    params: { page, query }
  });
  return res.data;
};

const getMoviesWithCast = async (with_cast: number, sort_by: SortBy, page = 1) => {
  const res = await axiosApi.get<ListResponse<Movie>>('discover/movie', {
    params: { page, with_cast, sort_by: `${sort_by}.desc` }
  });
  return res.data;
};

const getMovieDetail = async (id: number) => {
  const res = await axiosApi.get<MovieDetail>(`movie/${id}`, {
    params: { append_to_response: 'videos' }
  });
  return res.data;
};

const getRecommendations = async (id: number, page = 1) => {
  const res = await axiosApi.get<ListResponse<Movie>>(`movie/${id}/recommendations`, {
    params: { page }
  });
  return res.data;
};

const getCredits = async (id: number) => {
  const res = await axiosApi.get<Credits>(`movie/${id}/credits`);
  return res.data;
};

// Person
const getPersonBio = async (personId: number) => {
  const res = await axiosApi.get<Person>(`person/${personId}`, {
    params: { append_to_response: 'videos' }
  });
  return res.data;
};

const appApi = {
  getGenres,
  getMovies,
  getMoviesWithGenres,
  search,
  getMoviesWithCast,
  getMovieDetail,
  getRecommendations,
  getCredits,
  getPersonBio
};

export default appApi;
