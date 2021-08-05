import { useSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";
import * as _ from "lodash";
import AppHeader from "../../components/app-header/app-header";
import PersonalAreaMenu from "../../components/personal-area/personal-area-menu";
import styles from "./order-history.module.css";
import OrderBox from "../../components/order-box/order-box";

export const OrdersHistoryPage = () => {
  const { errorWSOrderHistory, orders } = useSelector(
    (store) => store.wsOrderHistoryReducer
  );

  let location = useLocation();

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <PersonalAreaMenu description="просмотреть свою историю заказов" />
        {errorWSOrderHistory && (
          <h2 className="text text_type_main-medium mb-2">
            {errorWSOrderHistory}
          </h2>
        )}
        <div className={styles.scrollbar}>
          {orders &&
            orders.map((element) => (
              <Link
                to={{
                  pathname: `/profile/orders/${element.number}`,
                  state: { background: location },
                }}
                key={_.uniqueId()}
              >
                <OrderBox element={element} key={_.uniqueId()} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
