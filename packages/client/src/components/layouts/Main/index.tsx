import React, { Suspense } from 'react';
import { constants } from '@alexseifert/frontend-library';

import { useAppSelector } from 'store/hooks';

import MobileSidebar from './sublayouts/ThreeColumn/components/MobileSidebar';
import Toolbar from './components/Toolbar';
import GeneralLoader from './components/GeneralLoader';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const NavSidebar = React.lazy(() => import('./components/NavSidebar'));
const BottomNav = React.lazy(() => import('./components/BottomNav'));

const MainLayout: React.FC<Props> = ({ children, sidebar }) => {
  const { windowWidth } = useAppSelector(state => state.ui);

  return (
    <div className={styles.layout}>
      <GeneralLoader />
      <Toolbar hasSidebar={!!sidebar} />

      <div className={styles.columnLayout}>
        {windowWidth >= constants.window.WINDOW_WIDTHS.lgMin && (
          <Suspense fallback={<div style={{ width: 85 }} />}>
            <NavSidebar />
          </Suspense>
        )}

        {windowWidth >= constants.window.WINDOW_WIDTHS.lgMin
          ? sidebar
          : (
            <MobileSidebar>
              {sidebar}
            </MobileSidebar>
          )
        }

        {children}
      </div>

      {windowWidth <= constants.window.WINDOW_WIDTHS.mdMax && (
        <Suspense fallback={<div />}>
          <BottomNav />
        </Suspense>
      )}
    </div>
  );
};

export default MainLayout;
