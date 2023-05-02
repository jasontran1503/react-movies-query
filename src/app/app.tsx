import Loading from '@shared-ui/loading';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import styles from './app.module.scss';
import Navbar from './features/shared/ui/layouts/navbar';
import Sidebar from './features/shared/ui/layouts/sidebar';

const Actor = lazy(() => import('./features/actor'));
const Home = lazy(() => import('./features/home'));
const MovieDetail = lazy(() => import('./features/movie-detail'));

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const onShowSidebar = (value: boolean) => {
    setShowSidebar(value);
  };

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/' || pathname === '/list') {
      navigate({
        pathname: '/list',
        search: '?category=popular'
      });
    }
  }, []);

  const routes = useRoutes([
    {
      path: '/*',
      element: <Navigate to="/list" />
    },
    {
      path: 'list',
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      )
    },
    {
      path: 'movie/detail/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <MovieDetail />
        </Suspense>
      )
    },
    {
      path: 'actor/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <Actor />
        </Suspense>
      )
    }
  ]);

  return (
    <div className={styles.web}>
      <div className={`${styles['web__side-bar']} ${showSidebar && styles['opened']}`}>
        <Sidebar onCloseSidebar={() => setShowSidebar(false)} />
      </div>
      <div className={styles['web__nav-bar']}>
        <Navbar onShowSidebar={onShowSidebar} routes={routes} />
      </div>
    </div>
  );
}

export default App;
