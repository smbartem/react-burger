import React from 'react';
import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './header.module.css';

export default () => (
  <nav>
    <ul className={styles.menu}>
      <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
        <BurgerIcon type="primary" />
        <a className="text_type_main-default ml-2">Конструктор</a>
      </li>
      <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4`}>
        <ListIcon type="secondary" />
        <a className="text text_type_main-default text_color_inactive ml-2">
          Лента заказов
        </a>
      </li>
    </ul>
  </nav>
);
