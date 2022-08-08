import React from 'react';

import SearchBox from './components/SearchBox';
import LeftSide from './components/LeftSide';
import AccountMenu from './components/AccountMenu';

import styles from './styles.module.scss';

interface Props {
  hasSidebar?: boolean;
}

const Toolbar: React.FC<Props> = ({ hasSidebar }) => {
  return (
    <div className={styles.toolbar}>
      <LeftSide hasSidebar={hasSidebar} />
      <SearchBox />
      <AccountMenu />
    </div>
  );
};

export default Toolbar;
