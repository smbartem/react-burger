import { TData } from "../../services/types";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { Redirect, useLocation } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import { getOrder } from "../../services/actions/app-actions";
import { SET_ADDED_INGREDIENT } from "../../services/actions/app-actions";
import BurgerConstructorInnerIngredients from "./burger-constructor-ingredients";
import { FC } from "react";

const BurgerConstructor: FC = () => {
  let location = useLocation();

  const { bun, ingredients } = useSelector((store) => store.appReducer);
  const { redirectToLoginForOrder, redirectToOrderDetails } = useSelector(
    (store) => store.authorizationReducer
  );
  const dispatch = useDispatch();

  const bunTotalPrice = bun ? bun.price * 2 : 0;
  const ingredientsTotalPrice = [...ingredients].reduce(
    (acc: number, el: TData) => (acc += el.price),
    0
  );
  const totalPrice = bunTotalPrice + ingredientsTotalPrice;

  const [{ isDragContainer }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(element) {
      dispatch({ type: SET_ADDED_INGREDIENT, ingredient: element });
    },
    collect: (monitor) => ({
      isDragContainer: monitor.canDrop(),
    }),
  });

  const burgerConstructorIngredientPlaceStyle = isDragContainer
    ? { border: "1px solid lightgreen" }
    : { border: "0" };

  return (
    <section className={styles.burgerConstructor}>
      <div
        className={`mt-25 mb-10 ml-4 ${styles.burgerConstructorIngredientPlace}`}
        ref={dropTarget}
        style={burgerConstructorIngredientPlaceStyle}
        data-test="dropTarget"
      >
        {bun && (
          <div className="ml-8 mb-4" data-test="bunUpContainer">
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
          <div className={`pr-2 ${styles.scrollbar}`} data-test="ingredientsScrollbarContainer">
            {ingredients.map((el: TData, index: number) => (
              <BurgerConstructorInnerIngredients
                el={el}
                index={index}
                key={el.key}
              />
            ))}
          </div>
        }
        {bun && (
          <div className="ml-8" data-test="bunDownContainer">
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
          onClick={async () => {
            bun && ingredients && dispatch(getOrder(ingredients, bun));
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {redirectToLoginForOrder && <Redirect to="/login" />}
      {redirectToOrderDetails && (
        <Redirect
          to={{
            pathname: "/order-details",
            state: { background: location },
          }}
        />
      )}
    </section>
  );
};

export default BurgerConstructor;
