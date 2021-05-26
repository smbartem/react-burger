import React from 'react';
import {
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Menu from './menu';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Menu />
      <Logo />
      <div className={`${styles.personalArea} pl-5 pr-5 pb-4 pt-4`}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </p>
      </div>
    </div>
  </header>
);

export default Header;