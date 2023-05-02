import { useEffect, useState } from 'react';
import styles from './style.module.scss';

const Toggle = () => {
  const [light, setLight] = useState(true);

  useEffect(() => {
    if (light) {
      document.body.className = 'light';
    } else {
      document.body.className = 'dark';
    }
  }, [light]);

  return (
    <div className={styles['toggle']}>
      <i className={`${styles['icon']} ${styles['icon-sun-o']} fa fa-sun-o`} aria-hidden="true"></i>
      <i className="icon icon-sun-o" aria-hidden="true"></i>
      <div onClick={() => setLight(!light)}>
        {light ? (
          <i
            className={`${styles['icon']} ${styles['icon-toggle-on']} fa fa-toggle-on`}
            aria-hidden="true"
          ></i>
        ) : (
          <i
            className={`${styles['icon']} ${styles['icon-toggle-off']} fa fa-toggle-off`}
            aria-hidden="true"
          ></i>
        )}
      </div>
      <i
        className={`${styles['icon']} ${styles['icon-moon-o']} fa fa-moon-o`}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default Toggle;
