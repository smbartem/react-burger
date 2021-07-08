import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import Ingredient from "./ingredient";
import styles from "./burger-ingredients.module.css";
import { SET_CURRENT_BURGER_INGREDIENTS_NAME } from "../../services/actions/interface-actions";

const BurgerIngredients = () => {
  const { data, bun, ingredients } = useSelector((store) => store.appReducer);
  const currentBurgerIngredientsName = useSelector(
    (store) => store.interfaceReducer.currentBurgerIngredientsName
  );
  const dispatch = useDispatch();

  const handleScroll = (e) => {
    if (e.target.scrollTop < 140) {
      dispatch({
        type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
        ingredientsName: "Булки",
      });
    } else if (e.target.scrollTop < 560 && e.target.scrollTop > 140) {
      dispatch({
        type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
        ingredientsName: "Соусы",
      });
    } else {
      dispatch({
        type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
        ingredientsName: "Начинки",
      });
    }
  };

  return (
    <section className={`${styles.burgerIngredients} mr-10`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <a href="#bun">
          <Tab
            value="Булки"
            active={currentBurgerIngredientsName === "Булки"}
            onClick={() =>
              dispatch({
                type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
                ingredientsName: "Булки",
              })
            }
          >
            Булки
          </Tab>
        </a>
        <a href="#sauce">
          <Tab
            value="Соусы"
            active={currentBurgerIngredientsName === "Соусы"}
            onClick={() =>
              dispatch({
                type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
                ingredientsName: "Соусы",
              })
            }
          >
            Соусы
          </Tab>
        </a>
        <a href="#main">
          <Tab
            value="Начинки"
            active={currentBurgerIngredientsName === "Начинки"}
            onClick={() =>
              dispatch({
                type: SET_CURRENT_BURGER_INGREDIENTS_NAME,
                ingredientsName: "Начинки",
              })
            }
          >
            Начинки
          </Tab>
        </a>
      </div>
      <div className={`mt-10 ${styles.scrollbar}`} onScroll={handleScroll}>
        <div>
          <h2 className="text text_type_main-medium" id="bun">
            Булки
          </h2>
          <div className={`mr-4 ml-4 ${styles.burgerIngredientsContainer}`}>
            {data.map((el) => {
              if (el.type !== "bun") {
                return null;
              }
              return (
                <Ingredient
                  data={el}
                  key={el._id}
                  counter={bun && bun._id === el._id ? 1 : null}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="sauce">
            Соусы
          </h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type !== "sauce") {
                return null;
              }
              let counter = ingredients.filter(
                (element) => el._id === element._id
              ).length;
              counter = counter === 0 ? null : counter;
              return <Ingredient data={el} key={el._id} counter={counter} />;
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="main">
            Начинки
          </h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type !== "main") {
                return null;
              }
              let counter = ingredients.filter(
                (element) => el._id === element._id
              ).length;
              counter = counter === 0 ? null : counter;
              return <Ingredient data={el} key={el._id} counter={counter} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
