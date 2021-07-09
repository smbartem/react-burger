import AppHeader from "../components/app-header/app-header";
import PersonalAreaMenu from "../components/personal-area/personal-area-menu";
import styles from "./personal-area.module.css"

export const OrdersHistoryPage = () => (
  <>
    <AppHeader />
    <div className={styles.container}>
      <PersonalAreaMenu
        activeLink="ordersHistory"
        description="просмотреть свою историю заказов"
      />
      <div></div>
    </div>
  </>
);
