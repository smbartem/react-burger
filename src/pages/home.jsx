import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_MODAL_INGREDIENT_DETAILS,
  CLOSE_MODAL_ORDER_DETAILS,
} from "../services/actions/interface-actions";

export function HomePage() {
  let history = useHistory();
  const { data, error } = useSelector((store) => store.appReducer);
  const { isModalIngredientDetailsOpen, isModalOrderDetailsOpen } = useSelector(
    (store) => store.interfaceReducer
  );
  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch({ type: CLOSE_MODAL_INGREDIENT_DETAILS });
    dispatch({ type: CLOSE_MODAL_ORDER_DETAILS });
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {error && (
        <h2 className={`${styles.main} text text_type_main-medium`}>
          {error}. Перезагрузите страницу
        </h2>
      )}
      <main className={styles.main}>
        {data && (
          <div className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        )}
      </main>
      {isModalOrderDetailsOpen && (
        <Modal title="" handleModalClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}
      {isModalIngredientDetailsOpen && (
        <Modal title="Детали ингредиента" handleModalClose={() => {
          handleModalClose();
          history.push("/");
        }}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}
