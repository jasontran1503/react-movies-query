import useScrollBottom from '@hooks/useScrollBottom';
import defaultImage from '@images/default-image.jpg';
import appApi from '@shared-data/app.api';
import CastSlider from '@shared-ui/cast-slider';
import MovieList from '@shared-ui/movie-list';
import StarRating from '@shared-ui/star-rating';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './style.module.scss';

const MovieDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const reachedBottom = useScrollBottom();

  const [{ data: credits }, { data: movie }] = useQueries({
    queries: [
      {
        queryKey: ['credit', id],
        queryFn: () => appApi.getCredits(Number(id))
      },
      {
        queryKey: ['movie', id],
        queryFn: () => appApi.getMovieDetail(Number(id))
      }
    ]
  });

  const { data, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['movies', { id }],
    queryFn: ({ pageParam = 1 }) => appApi.getRecommendations(Number(id), pageParam),
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
      {movie && (
        <div className={styles['movie']}>
          <div className={styles['movie__image']}>
            <img
              className={styles['movies-item__img']}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : defaultImage
              }
              alt=""
            />
          </div>
          <div className={styles['movie__bio']}>
            <div className={styles['movie__bio-info']}>
              <h1>{movie.title}</h1>
              <h2>{movie.tagline}</h2>
            </div>
            <div className={styles['movie__bio-rate']}>
              <StarRating rating={movie.vote_average} showScore={true} vote={movie.vote_average} />
              <h6>
                ENGLISH / {movie.runtime} MIN. / {movie.release_date}
              </h6>
            </div>
            <div className={styles['movie__bio-genres']}>
              <h6>The genres</h6>
              <div className="d-flex flex-wrap">
                {movie &&
                  movie.genres.map((genre) => (
                    <Link
                      to={{
                        pathname: '/list',
                        search: `?genre=${genre.name.toLowerCase()}&id=${genre.id}`
                      }}
                      key={genre.id}
                      className={styles['genres']}
                    >
                      <i className="fa fa-dot-circle-o" aria-hidden="true"></i>
                      <span>{genre.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
            <div className={styles['movie__bio-content']}>
              <h2>THE SYNOPSIS</h2>
              <p>{movie.overview || 'There is no synopsis available...'}</p>
            </div>

            {credits && <CastSlider cast={credits.cast} />}

            <div className={styles['movie__bio-button']}>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className={styles['button']}
              >
                Website<i className="fa fa-link" aria-hidden="true"></i>
              </a>
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className={styles['button']}
              >
                IMDB<i className="fa fa-film" aria-hidden="true"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer" className={styles['button']}>
                Trailer<i className="fa fa-play" aria-hidden="true"></i>
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
          title={{ main: 'RECOMMENDED', sub: 'movies' }}
          isFetching={isFetchingNextPage}
          isError={isError}
        />
      ))}
    </>
  );
};

export default MovieDetail;
