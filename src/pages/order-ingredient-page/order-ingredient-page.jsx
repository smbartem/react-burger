import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import OrderIngredients from "../../components/order-ingredients/order-ingredients";

export const OrderIngredientPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { id } = useParams();

  const url = useMemo(() => `https://norma.nomoreparties.space/api/orders/${id}`, [id]);

  useEffect(() => {
    axios.get(url)
    .then(data => setSelectedOrder(data.data.orders[0]))
  }, [url])

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
