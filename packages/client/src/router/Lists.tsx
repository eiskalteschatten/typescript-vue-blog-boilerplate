import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from 'components/layouts/Main';
import Sidebar from 'components/layouts/Main/components/ListsSidebar';
// import BookListLayout from 'components/layouts/Main/sublayouts/BookList';

const ListsRouter: React.FC = () => {
  return (
    <MainLayout sidebar={<Sidebar />}>
      {/* <BookListLayout> */}
      <Routes>
        {/* <Route path='/add' element={<EditBook />} /> */}

        <Route path='/:list' element={<div />} />
        <Route path='/:list/:id' element={<div />} />
        {/* <Route path='/:list/:id/edit' element={<EditBook />} /> */}

        {/* TODO: By default, the first list should be selected */}
        <Route path='*' element={<div />} />
      </Routes>
      {/* </BookListLayout> */}
    </MainLayout>
  );
};

export default ListsRouter;
