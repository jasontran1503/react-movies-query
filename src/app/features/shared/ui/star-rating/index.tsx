import { memo, useEffect, useState } from 'react';
import styles from './style.module.scss';

const StarRating = memo(
  ({ rating, showScore = false, vote }: { rating: number; showScore?: boolean; vote: number }) => {
    const [starsRating, setStarsRating] = useState<number[]>([]);

    useEffect(() => {
      if (!rating) {
        setStarsRating([0, 0, 0, 0, 0]);
        return;
      }

      const array: number[] = [];
      const score = rating / 2;
      const full = Math.floor(score);
      const half = score - full >= 0.5 ? 0.5 : 0;

      for (let i = 0; i < full; i++) {
        array.push(1);
      }
      array.push(half);
      setStarsRating([...array]);
      if (array.length < 5) {
        for (let i = 0; i < 5 - array.length; i++) {
          setStarsRating([...array, 0]);
        }
      }
    }, [rating]);

    return (
      <div className={styles['rating']}>
        {starsRating.map((value, index) => {
          switch (value) {
            case 1:
              return (
                <i className={`${styles['icon']} fa fa-star`} aria-hidden="true" key={index}></i>
              );
            case 0.5:
              return (
                <i
                  className={`${styles['icon']} fa fa-star-half-o`}
                  aria-hidden="true"
                  key={index}
                ></i>
              );
            case 0:
              return (
                <i className={`${styles['icon']} fa fa-star-o`} aria-hidden="true" key={index}></i>
              );
            default:
              return (
                <i className={`${styles['icon']} fa fa-star-o`} aria-hidden="true" key={index}></i>
              );
          }
        })}
        {showScore && <span className={styles['score']}>{vote}</span>}
      </div>
    );
  }
);

export default StarRating;
