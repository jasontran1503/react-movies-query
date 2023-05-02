import defaultImage from '@images/default-image.jpg';
import tmdb from '@images/tmdb-logo.svg';
import appApi from '@shared-data/app.api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const Sidebar = ({ onCloseSidebar }: { onCloseSidebar: () => void }) => {
  const [categories] = useState([
    { id: 'popular', icon: 'heart', name: 'popular' },
    { id: 'top-rated', icon: 'fire', name: 'top rated' },
    { id: 'upcoming', icon: 'calendar-o', name: 'upcoming' }
  ]);

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => appApi.getGenres()
  });

  return (
    <div className={styles['side-bar']}>
      <img className={styles['side-bar__logo']} src={defaultImage} alt="" />
      <div className={styles['side-bar__nav']}>
        <div className={styles['nav-list']}>
          <h3>Discover</h3>
          {categories.map((category) => (
            <Link
              to={{ pathname: '/list', search: `?category=${category.name}` }}
              className={styles['nav-item']}
              key={category.id}
              onClick={onCloseSidebar}
            >
              <i className={`fa fa-${category.icon}`} aria-hidden="true"></i>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>

        <div className={styles['nav-list']}>
          <h3>GENRES</h3>
          {genres &&
            genres.map((genre) => (
              <Link
                to={{
                  pathname: '/list',
                  search: `?genre=${genre.name.toLowerCase()}&id=${genre.id}`
                }}
                className={styles['nav-item']}
                key={genre.id}
                onClick={onCloseSidebar}
              >
                <i className="fa fa-dot-circle-o" aria-hidden="true"></i>
                <span>{genre.name}</span>
              </Link>
            ))}
        </div>
      </div>
      <img className={styles['side-bar__footer']} src={tmdb} alt="" />
    </div>
  );
};

export default Sidebar;
