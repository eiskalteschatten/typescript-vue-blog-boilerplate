import { useTranslation } from 'react-i18next';

import { Props as SidebarItemProp } from 'components/elements/SidebarItem';

const useItems = (): SidebarItemProp[] => {
  const { t } = useTranslation(['lists']);

  return [
    {
      path: '/lists',
      ItemIcon: () => <span className='material-icons'>checklist</span>,
      title: t('wishlist'),
    },
  ];
};

export default useItems;
