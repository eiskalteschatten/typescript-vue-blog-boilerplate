import React from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const BasicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
};

export default BasicLayout;
