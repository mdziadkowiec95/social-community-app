import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItemProps } from 'semantic-ui-react';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';

type NavMenuProps = {
  isAuth?: boolean;
};

export const NavMenu = ({ isAuth = false }: NavMenuProps) => {
  const [activeItem, setActiveItem] = useState('aboutUs');
  const { t } = useTranslation();

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: MenuItemProps,
  ) => {
    if (name) {
      setActiveItem(name);
    }
  };

  const AuthUserContent = () => (
    <>
      <Menu.Item name='aboutUs' active={activeItem === 'aboutUs'} onClick={handleItemClick} />
      <Menu.Item name='jobs' active={activeItem === 'jobs'} onClick={handleItemClick} />
      <Menu.Item name='locations' active={activeItem === 'locations'} onClick={handleItemClick} />
      <Menu.Item>
        <Button primary>{t('common:signUp')}</Button>
      </Menu.Item>
    </>
  );

  const GuestUserContent = () => (
    <>
      <Menu.Item
        name='terms-of-use'
        as={Link}
        to='/terms-of-use'
        active={activeItem === 'terms-of-use'}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link}
        to='/app'
        name='app'
        active={activeItem === 'app'}
        onClick={handleItemClick}
      />
    </>
  );

  return (
    <Menu>
      <Menu.Item as={Link} header to='/'>
        {t('common:appName')}
      </Menu.Item>
      {isAuth ? AuthUserContent() : GuestUserContent()}
      <Menu.Item>
        <LanguagePicker />
      </Menu.Item>
    </Menu>
  );
};
