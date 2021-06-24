import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { getOrder } from "../../services/reducers/app-reducer";
import { SET_SELECT_INGREDIENT } from "../../services/actions/app-actions";
import BurgerConstructorInnerIngredients from "./burger-constructor-ingredients";

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((store) => store.appReducer);
  const dispatch = useDispatch();

  const bunTotalPrice = bun ? bun.price * 2 : 0;
  const ingredientsTotalPrice = ingredients.reduce(
    (acc, el) => (acc += el.price),
    0
  );
  const totalPrice = bunTotalPrice + ingredientsTotalPrice;

  const [{ isDragContainer }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(element) {
      dispatch({ type: SET_SELECT_INGREDIENT, ingredient: element });
    },
    collect: (monitor) => ({
      isDragContainer: monitor.canDrop(),
    }),
  });

  const burgerConstructorIngredientPlaceStyle = isDragContainer
    ? { border: "1px solid lightgreen" }
    : null;

  return (
    <section className={styles.burgerConstructor}>
      <div
        className={`mt-25 mb-10 ml-4 ${styles.burgerConstructorIngredientPlace}`}
        ref={dropTarget}
        style={burgerConstructorIngredientPlaceStyle}
      >
        {bun && (
          <div className="ml-8 mb-4">
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        {
          <div className={`pr-2 ${styles.scrollbar}`}>
            {ingredients.map((el, index) => (
              <BurgerConstructorInnerIngredients el={el} index={index} key={el._id}/>
            ))}
          </div>
        }
        {bun && (
          <div className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={`${styles.orderContainer} mr-4`}>
        <div className={`${styles.totalPriceContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() =>
            bun && ingredients && dispatch(getOrder(ingredients, bun))
          }
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
