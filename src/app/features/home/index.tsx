import { MainTitle } from '@common/models';
import useScrollBottom from '@hooks/useScrollBottom';
import useTitle from '@hooks/useTitle';
import appApi from '@shared-data/app.api';
import MovieList from '@shared-ui/movie-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [main, sub] = useTitle();
  const reachedBottom = useScrollBottom();
  const [searchParams] = useSearchParams();

  const getMovies = ({ pageParam = 1 }) => {
    const id = searchParams.get('id');

    switch (main) {
      case MainTitle.Search:
        return appApi.search(sub, pageParam);
      case MainTitle.Category:
        return appApi.getMovies(sub.replace(/ /g, '_'), pageParam);
      case MainTitle.Genre:
        return appApi.getMoviesWithGenres(Number(id), pageParam);
      default:
        return appApi.getMoviesWithGenres(Number(id), pageParam);
    }
  };

  const { data, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['movies', { main, sub }],
    queryFn: getMovies,
    getNextPageParam: (lastPage) => {
      return lastPage.page === lastPage.total_pages ? undefined : lastPage.page + 1;
    }
  });

  useEffect(() => {
    if (isFetchingNextPage) {
      return;
    }
    if (reachedBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [reachedBottom]);

  return (
    <>
      {data?.pages.map((movies, index) => (
        <MovieList
          key={index}
          data={movies}
          title={{ main, sub }}
          isFetching={isFetchingNextPage}
          isError={isError}
        />
      ))}
    </>
  );
};

export default Home;
