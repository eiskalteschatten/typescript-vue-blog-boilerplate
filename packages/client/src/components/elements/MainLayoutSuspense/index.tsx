import React, { Suspense } from 'react';

import SuspenseSpinner from 'components/elements/SuspenseSpinner';
import MainLayout from 'components/layouts/Main';

interface Props {
  children: React.ReactNode;
}

const MainLayoutSuspense: React.FC<Props> = ({ children }) => {
  return (
    <MainLayout>
      <div style={{ flexGrow: 1 }}>
        <Suspense fallback={<SuspenseSpinner />}>
          {children}
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default MainLayoutSuspense;
