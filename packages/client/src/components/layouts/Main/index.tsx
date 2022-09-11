import React, { Suspense } from 'react';
import { constants } from '@alexseifert/frontend-library';

import { useAppSelector } from 'store/hooks';

import Toolbar from './components/Toolbar';
import GeneralLoader from './components/GeneralLoader';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const NavSidebar = React.lazy(() => import('./components/NavSidebar'));

const MainLayout: React.FC<Props> = ({ children }) => {
  const { windowWidth } = useAppSelector(state => state.ui);

  return (
    <div className={styles.layout}>
      <GeneralLoader />
      <Toolbar />

      <div className={styles.columnLayout}>
        {windowWidth >= constants.window.WINDOW_WIDTHS.lgMin && (
          <Suspense fallback={<div style={{ width: 85 }} />}>
            <NavSidebar />
          </Suspense>
        )}

        {children}
      </div>
    </div>
  );
};

export default MainLayout;
