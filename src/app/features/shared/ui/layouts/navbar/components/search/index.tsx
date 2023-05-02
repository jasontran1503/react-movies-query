import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

const Search = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const search = setTimeout(() => {
      if (inputValue && inputValue.trim()) {
        navigate({
          pathname: '/list',
          search: `?search=${inputValue}`
        });
      }
    }, 300);

    return () => clearTimeout(search);
  }, [inputValue]);

  return (
    <div className={styles['search-bar']}>
      <i className={`fa fa-search ${styles['search-bar__icon']}`} aria-hidden="true"></i>
      <input
        type="text"
        className={styles['search-bar__input']}
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={(event) => onSearch(event)}
      />
    </div>
  );
};

export default Search;
