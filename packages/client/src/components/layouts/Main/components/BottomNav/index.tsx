import React from 'react';

import NavItem from './components/NavItem';
import useItemsLeft from './useItemsLeft';
import useItemsRight from './useItemsRight';

import styles from './styles.module.scss';

const BottomNav: React.FC = () => {
  const leftNavItems = useItemsLeft();
  const rightNavItems = useItemsRight();

  return (
    <div className={styles.bottomNav}>
      {leftNavItems.map((item, index: number) => (
        <NavItem
          key={index}
          {...item}
        />
      ))}

      {rightNavItems.map((item, index: number) => (
        <NavItem
          key={index}
          {...item}
        />
      ))}
    </div>
  );
};

export default BottomNav;
