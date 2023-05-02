import { Movie } from '@common/models';
import defaultImage from '@images/default-image.jpg';
import StarRating from '@shared-ui/star-rating';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const MovieItem = memo(({ movie }: { movie: Movie }) => {
  return (
    <Link to={`/movie/detail/${movie.id}`}>
      <div className={styles['movies-item']}>
        <img
          className={styles['movies-item__img']}
          src={
            movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImage
          }
          alt=""
        />
        <div className={styles['movies-item__detail']}>
          <h6 className={styles['name']}>{movie.title}</h6>

          <StarRating rating={movie.vote_average} vote={movie.vote_count} />
        </div>
      </div>
    </Link>
  );
});

export default MovieItem;
