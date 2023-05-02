import { useEffect, useState } from 'react';

const useScrollBottom = () => {
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const scrollingElement = (event.target as Document).scrollingElement;
      if (scrollingElement) {
        const { scrollHeight, scrollTop, clientHeight } = scrollingElement;
        const hasReachedBottom = scrollHeight - scrollTop <= clientHeight * 1.5;
        setReachedBottom(hasReachedBottom);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return reachedBottom;
};

export default useScrollBottom;
