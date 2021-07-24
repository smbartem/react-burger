import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OrderIngredientModal from "../../components/order-ingredient-modal/order-ingredient-modal";

const modalRoot = document.getElementById("react-modals");

export const OrderIngredientModalPage = ({ profile }) => {
  const history = useHistory();
  const { id } = useParams();
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
    .reduce((acc, element) => {
      const key = JSON.stringify(element);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return ReactDOM.createPortal(
    <OrderIngredientModal
      order={selectedOrder}
      ingredients={ingredients}
      handleModalClose={() => {
        history.push(`${history.location.state.background.pathname}`);
      }}
    />,
    modalRoot
  );
};
