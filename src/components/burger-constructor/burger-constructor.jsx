import React, { useContext } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { BunContext, IngredientsContext } from "../../services/context";

const BurgerConstructor = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { handleModalOrderDetails, handleOrder } = props;

  const bun = useContext(BunContext);
  const ingredients = useContext(IngredientsContext);
  
  const bunTotalPrice = bun? bun.price * 2 : 0;
  const ingredientsTotalPrice = ingredients.reduce((acc, el) => acc += el.price, 0);
  const totalPrice = bunTotalPrice + ingredientsTotalPrice;

  return (
    <section className={styles.burgerConstructor}>
      <div className="mt-25 mb-10 ml-4">
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
            {ingredients.map((el) => (
              <div key={el.key} className={`mb-4 ${styles.mainIngredients}`}>
                <div className="mr-2">
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </div>
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
          onClick={bun && ingredients && handleOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
