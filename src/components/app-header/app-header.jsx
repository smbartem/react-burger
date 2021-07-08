import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className={`${styles.personalArea} pl-5 pr-5 pb-4 pt-4`}>
          <Link to="/profile">
            <div style={{ display: "flex" }}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">
                Личный кабинет
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default AppHeader;
