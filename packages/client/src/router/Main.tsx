import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import SuspenseSpinner from 'components/elements/SuspenseSpinner';
import MainLayout from 'components/layouts/Main';

import ListsRouter from './Lists';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Account = React.lazy(() => import('../pages/Account'));
const FourOhFour = React.lazy(() => import('../pages/FourOhFour'));

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={
        <MainLayout>
          <Suspense fallback={<SuspenseSpinner />}>
            <Dashboard />
          </Suspense>
        </MainLayout>
      } />

      <Route path='/lists/*' element={<ListsRouter />} />

      <Route path='/settings' element={
        <MainLayout>
          <Suspense fallback={<SuspenseSpinner />}>
            <Settings />
          </Suspense>
        </MainLayout>
      } />

      <Route path='/account' element={
        <MainLayout>
          <Suspense fallback={<SuspenseSpinner />}>
            <Account />
          </Suspense>
        </MainLayout>
      } />

      <Route path='*' element={
        <MainLayout>
          <Suspense fallback={<SuspenseSpinner />}>
            <FourOhFour />
          </Suspense>
        </MainLayout>
      } />
    </Routes>
  );
};

export default MainRouter;
