import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import OrderIngredients from "../../components/order-ingredients/order-ingredients";
import { FC } from "react";

export const OrderIngredientPage: FC<{ profile: boolean }> = ({ profile }) => {
  const { id } = useParams<{id: string}>();

  const selectedOrder = useSelector((store) => {
    return !profile
      ? store.wsOrderTapeReducer.orders &&
          store.wsOrderTapeReducer.orders.filter((el) => +el.number === +id)[0]
      : store.wsOrderHistoryReducer.orders &&
          store.wsOrderHistoryReducer.orders.filter(
            (el) => +el.number === +id
          )[0];
  });

  const data = useSelector((store) => store.appReducer.data);

  const ingredients = selectedOrder?.ingredients
    .map((el) => data?.filter((elem) => elem._id === el)[0])
    .reduce((acc: {[k: string]: number}, element) => {
      const key = JSON.stringify(element);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return (
    <>
      <AppHeader />
      <div style={{maxWidth:"640px", margin:"120px auto 0"}}>
        <OrderIngredients order={selectedOrder} ingredients={ingredients} />
      </div>
    </>
  );
};
