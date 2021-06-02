import React from 'react';
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.container}>
      <ul className={styles.menu}>
        <div className={styles.flex}>
          <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
            <BurgerIcon type="primary" />
            <a className="text_type_main-default ml-2" href="/">
              Конструктор
            </a>
          </li>
          <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4`}>
            <ListIcon type="secondary" />
            <a
              className="text text_type_main-default text_color_inactive ml-2"
              href="/"
            >
              Лента заказов
            </a>
          </li>
        </div>
        <li>
          <a href="/">
            <Logo />
          </a>
        </li>
        <li className={`${styles.personalArea} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;