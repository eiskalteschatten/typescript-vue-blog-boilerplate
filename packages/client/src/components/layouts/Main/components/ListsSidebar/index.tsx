import React from 'react';

import Sidebar from 'components/elements/Sidebar';
import SidebarItem, { Props as SidebarItemProps } from 'components/elements/SidebarItem';

import useSidebarItems from './useSidebarItems';

const ListsSidebar: React.FC = () => {
  const sidebarItems = useSidebarItems();

  return (
    <Sidebar>
      {sidebarItems.map((item: SidebarItemProps, index: number) => (
        <SidebarItem
          key={index}
          {...item}
        />
      ))}
    </Sidebar>
  );
};

export default ListsSidebar;
