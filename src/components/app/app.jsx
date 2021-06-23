import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../services/reducers/app-reducer";

function App() {
  const { data, error } = useSelector((store) => store.appReducer);
  const { isModalIngredientDetailsOpen, isModalOrderDetailsOpen } = useSelector(
    (store) => store.interfaceReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
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
        <Modal title="">
          <OrderDetails />
        </Modal>
      )}
      {isModalIngredientDetailsOpen && (
        <Modal title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
