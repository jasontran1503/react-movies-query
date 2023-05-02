import useWindowSize from '@hooks/useWindowSize';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Search from './components/search';
import Toggle from './components/toggle';
import styles from './style.module.scss';

const Navbar = ({
  onShowSidebar,
  routes
}: {
  onShowSidebar: (value: boolean) => void;
  routes: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | null;
}) => {
  const [width] = useWindowSize();
  const [showHamburger, setShowHamburger] = useState(true);
  const hamburgerEle = useRef(null);

  const checkWidth = (width: number) => {
    if (width < 1299) {
      setShowHamburger(true);
    } else {
      setShowHamburger(false);
    }
  };

  const onCloseSidebar = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const className = (e.target as HTMLDivElement).className.split(' ');
    if (className.includes('fa-bars')) {
      return;
    }
    onShowSidebar(false);
  };

  useEffect(() => checkWidth(width), [width]);

  return (
    <div onClick={(e) => onCloseSidebar(e)}>
      <div className={styles['navbar']}>
        {showHamburger && (
          <i
            className={`${styles['icon-bars']} fa fa-bars`}
            aria-hidden="true"
            onClick={() => onShowSidebar(true)}
            ref={hamburgerEle}
          ></i>
        )}
        <div className={styles['navbar__container']}>
          <Search />
          <Toggle />
          <div className={styles['navbar__container-user']}>
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div className={styles['main-content']}>
        {routes}
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
