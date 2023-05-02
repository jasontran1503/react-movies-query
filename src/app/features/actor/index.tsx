import { SelectSortBy } from '@common/models';
import useScrollBottom from '@hooks/useScrollBottom';
import defaultImage from '@images/default-image.jpg';
import appApi from '@shared-data/app.api';
import MovieList from '@shared-ui/movie-list';
import SortBy from '@shared-ui/sort-by';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './style.module.scss';

const Actor = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [selectValue, setSelectValue] = useState<SelectSortBy>('popularity');
  const reachedBottom = useScrollBottom();

  const { data: actor } = useQuery({
    queryKey: ['actor', { id }],
    queryFn: () => appApi.getPersonBio(Number(id)),
    initialData: null
  });

  const { data, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['movies', { id, selectValue }],
    queryFn: ({ pageParam = 1 }) => appApi.getMoviesWithCast(Number(id), selectValue, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page === lastPage.total_pages ? undefined : lastPage.page + 1;
    }
  });

  const changeSortBy = (value: SelectSortBy) => {
    setSelectValue(value);
  };

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
      {actor && (
        <div className={styles['actor']}>
          <div className={styles['actor__image']}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w780${actor.profile_path}`
                  : defaultImage
              }
              alt=""
            />
          </div>
          <div className={styles['actor__bio']}>
            <div className={styles['actor__bio-info']}>
              <h1>{actor.name}</h1>
              <h2>{actor.birthday}</h2>
            </div>
            <div className={styles['actor__bio-content']}>
              <h2>THE BIOGRAPHY</h2>
              <p>{actor.biography ? actor.biography : 'There is no synopsis available...'}</p>
            </div>
            <div className={styles['actor__bio-button']}>
              <a
                href="https://www.imdb.com/name/{actor.imdb_id }"
                target="_blank"
                rel="noreferrer"
                className={`${styles['button']} ${styles['imdb']}`}
              >
                IMDB<i className="fa fa-film" aria-hidden="true"></i>
              </a>
              <a className={`${styles['button']} ${styles['back']}`} onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
              </a>
            </div>
          </div>
        </div>
      )}

      {data?.pages.map((movies, index) => (
        <MovieList
          key={index}
          data={movies}
          title={{ main: actor?.name || '', sub: 'movies' }}
          isFetching={isFetchingNextPage}
          isError={isError}
        >
          <SortBy selectValue={selectValue} changeSortBy={changeSortBy} />
        </MovieList>
      ))}
    </>
  );
};

export default Actor;
