import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, ReactNode } from "react";
import styles from "./authentication-form.module.css"

const AuthenticationForm: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={`${styles.container} ${styles.flexColumnCenter}`}>
    <Logo />
    { children }
  </div>
);

export default AuthenticationForm;