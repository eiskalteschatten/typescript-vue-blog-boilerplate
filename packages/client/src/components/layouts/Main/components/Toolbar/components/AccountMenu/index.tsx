import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@alexseifert/frontend-library';

import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/entities/account';

import styles from '../../styles.module.scss';

const AccountMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const buttonReference = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation(['account']);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button
        className={styles.toolbarButton}
        iconButton
        onClick={() => setMenuOpen(true)}
        ref={buttonReference}
      >
        <span className='material-icons'>account_circle</span>
      </Button>

      {/* <PopperWrapper
        ref={popperReference}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <PopupBase
          open={menuOpen}
          handleClose={() => setMenuOpen(false)}
        >
          <Menu>
            <MenuItem>
              <Link to='/account'>
                {t('account:accountSettings')}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {t('account:logOut')}
            </MenuItem>
          </Menu>
        </PopupBase>
      </PopperWrapper> */}
    </>
  );
};

export default AccountMenu;
