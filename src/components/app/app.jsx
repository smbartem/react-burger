import React, { useEffect, useCallback } from "react";
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
import { getData } from "../../services/actions/app-actions";
import { CLOSE_MODAL_INGREDIENT_DETAILS,  CLOSE_MODAL_ORDER_DETAILS} from "../../services/actions/interface-actions"

function App() {
  const { data, error } = useSelector((store) => store.appReducer);
  const { isModalIngredientDetailsOpen, isModalOrderDetailsOpen } = useSelector(
    (store) => store.interfaceReducer
  );
  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch({type: CLOSE_MODAL_INGREDIENT_DETAILS});
    dispatch({type: CLOSE_MODAL_ORDER_DETAILS});
  }, [dispatch]);

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
        <Modal title="" handleModalClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      )}
      {isModalIngredientDetailsOpen && (
        <Modal title="Детали ингредиента" handleModalClose={handleModalClose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
