import { ListResponse, Movie } from '@common/models';
import Loading from '@shared-ui/loading';
import MovieItem from '@shared-ui/movie-item';
import { memo } from 'react';
import styles from './style.module.scss';

const MovieList = memo(
  ({
    data,
    title,
    isFetching,
    isError,
    children
  }: {
    data: ListResponse<Movie> | null;
    title: { main: string; sub: string };
    isFetching: boolean;
    isError: boolean;
    children?: JSX.Element;
  }) => {
    return (
      <>
        <div className={styles['movies']}>
          {data && data.page === 1 && (
            <div className={styles['header']}>
              <h1 className={styles['header__main']}>{title.main}</h1>
              <h2 className={styles['header__sub']}>{title.sub}</h2>
            </div>
          )}

          {children}

          {data && data.results.length > 0 && (
            <div className="row">
              {data.results.map((movie: Movie) => (
                <div key={movie.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6">
                  <MovieItem movie={movie} />
                </div>
              ))}
            </div>
          )}

          {isFetching && <Loading />}
        </div>

        {data && !data.results.length && (
          <div className={styles['empty']}>
            No results <i className="fa fa-frown-o" aria-hidden="true"></i>
          </div>
        )}

        {isError && (
          <div className={styles['empty']}>
            Something wrong <i className="fa fa-frown-o" aria-hidden="true"></i>
          </div>
        )}
      </>
    );
  }
);

export default MovieList;
