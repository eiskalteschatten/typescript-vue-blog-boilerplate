import React from 'react';

import { useAppSelector } from 'store/hooks';

import styles from './styles.module.scss';

const GeneralLoader: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.ui);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loader}>
      <div className={styles.bar} />
    </div>
  );
};

export default GeneralLoader;
