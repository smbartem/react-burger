import ReactDOM from "react-dom";
import { useSelector } from "../../services/hooks";
import { useHistory, useParams } from "react-router-dom";
import OrderIngredientModal from "../../components/order-ingredient-modal/order-ingredient-modal";
import { FC } from "react";

const modalRoot = document.getElementById("react-modals");

export const OrderIngredientModalPage: FC<{ profile: boolean }> = ({ profile }) => {
  const history: any = useHistory();
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
    .map((el) => data.filter((elem) => elem._id === el)[0])
    .reduce((acc: {[k: string]: number}, element) => {
      const key = JSON.stringify(element);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return modalRoot ? ReactDOM.createPortal(
    <OrderIngredientModal
      order={selectedOrder}
      ingredients={ingredients}
      handleModalClose={() => {
        history.push(`${history.location.state.background.pathname}`);
      }}
    />,
    modalRoot
  ) : null;
};
