import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation } from "react-router-dom"
import styles from "./header.module.css";

const AppHeader = () => {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <ul className={styles.flex}>
              <li className={`${styles.menuItems} pl-5 pr-5 pb-4 pt-4 mr-2`}>
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"} />
                  <p className={`ml-2 text_type_main-default ${location.pathname !== '/' && 'text_color_inactive'}`}>Конструктор</p>
                </Link>
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
              <div style={{ display: "flex", alignItems: "center"}}>
                <ProfileIcon type={location.pathname === '/profile' ? "primary" : "secondary"} />
                <p className={`ml-2 text_type_main-default ${location.pathname !== '/profile' && 'text_color_inactive'}`}>
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
