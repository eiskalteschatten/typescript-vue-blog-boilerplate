import React, { useLayoutEffect } from 'react';
import { FLWrapper } from '@alexseifert/frontend-library';
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { setWindowWidth, setPrefersDarkMode } from 'store/entities/ui';
import GlobalErrorBoundary from 'components/errors/GlobalErrorBoundary';
import Router from 'router';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    });

    const handleResize = () => dispatch(setWindowWidth(window.innerWidth));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GlobalErrorBoundary>
      <FLWrapper>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FLWrapper>
    </GlobalErrorBoundary>
  );
};

export default App;
