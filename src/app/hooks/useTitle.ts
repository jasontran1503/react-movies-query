import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainTitle } from '../common/models';

const useTitle = () => {
  const [main, setMain] = useState<MainTitle>(MainTitle.Search);
  const [sub, setSub] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const genre = searchParams.get('genre');

    if (search) {
      setMain(MainTitle.Search);
      setSub(search);
    } else if (category) {
      setMain(MainTitle.Category);
      setSub(category);
    } else if (genre) {
      setMain(MainTitle.Genre);
      setSub(genre);
    }
  }, [searchParams]);

  return [main, sub];
};

export default useTitle;
