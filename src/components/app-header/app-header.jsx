import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header.module.css";

const AppHeader = () => (
  <header className={styles.header}>
    <nav className={styles.container}>
      <ul className={styles.menu}>
        <li>
          <ul className={styles.flex}>
            <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
              <a className={styles.menuNavLink} href="##">
                <BurgerIcon type="primary" />
                <p className="ml-2 text_type_main-default">Конструктор</p>
              </a>
            </li>
            <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
              <a className={styles.menuNavLink} href="##">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive ml-2">
                  Лента заказов
                </p>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="##">
            <Logo />
          </a>
        </li>
        <li className={`${styles.personalArea} pl-5 pr-5 pb-4 pt-4`}>
          <a className={styles.menuNavLink} href="##">
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </p>
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default AppHeader;
