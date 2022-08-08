import React, { useMemo } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';

import Login from '../pages/Login';
import Register from '../pages/Register';
import MainRouter from './Main';

const Router: React.FC = () => {
  const { user, accessToken, refreshToken } = useAppSelector(state => state.account);
  const userIsLoggedin = user && accessToken && refreshToken;

  const routes = useMemo(() => [
    {
      path: '/login',
      element: userIsLoggedin
        ? <Navigate replace to={'/'} />
        : <Login />,
    },
    {
      path: '/register',
      element: userIsLoggedin
        ? <Navigate replace to={'/'} />
        : <Register />,
    },
    {
      path: '*',
      element: userIsLoggedin
        ? <MainRouter />
        : <Navigate replace to={'/login'} />,
    },
  ], [userIsLoggedin]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
};

export default Router;
