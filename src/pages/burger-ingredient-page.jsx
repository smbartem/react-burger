import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { SET_SELECT_INGREDIENT } from "../services/actions/app-actions";
import styles from "./burger-ingredient-page.module.css";

export const BurgerIngredientPage = () => {
  const { id } = useParams();
  const { data, selectedIngredient } = useSelector((store) => store.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    data &&
      dispatch({
        type: SET_SELECT_INGREDIENT,
        ingredient: data.filter((el) => el._id === id)[0],
      });
  }, [data, dispatch, id]);

  return (
    <>
      <AppHeader />
      <div className={styles.modal}>
        <header className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </header>

        <section className={`${styles.modalMain} mt-4`}>
          {selectedIngredient && <IngredientDetails />}
        </section>
      </div>
    </>
  );
};
