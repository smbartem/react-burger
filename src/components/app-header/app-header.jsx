import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRouteMatch } from "react-router-dom"
import styles from "./header.module.css";

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <ul className={styles.flex}>
              <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                  <p className={`ml-2 text_type_main-default ${!isConstructor && 'text_color_inactive'}`}>Конструктор</p>
                </Link>
              </li>
              <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
                <a className={styles.menuNavLink} href="##">
                  <ListIcon type={isFeed ? "primary" : "secondary"} />
                  <p className={`ml-2 text_type_main-default ${!isFeed && 'text_color_inactive'}`}>
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
              <div style={{ display: "flex", alignItems: "center"}}>
                <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                <p className={`ml-2 text_type_main-default ${!isProfile && 'text_color_inactive'}`}>
                  Личный кабинет
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
