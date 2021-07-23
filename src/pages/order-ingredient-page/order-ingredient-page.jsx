import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import OrderIngredients from "../../components/order-ingredients/order-ingredients";

export const OrderIngredientPage = () => {
  const { id } = useParams();
  const selectedOrder = useSelector(
    (store) =>
      store.wsOrderTypeReducer.orders &&
      store.wsOrderTypeReducer.orders.filter((el) => +el.number === +id)[0]
  );
  const data = useSelector((store) => store.appReducer.data);

  const ingredients = selectedOrder?.ingredients
    .map((el) => data?.filter((elem) => elem._id === el)[0])
    .reduce((acc, element) => {
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
