import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { bun, ingredients, handleModalOrderDetails } = props;
  
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
          onClick={handleModalOrderDetails}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  bun: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  ]),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleModalOrderDetails: PropTypes.func.isRequired,
};

export default BurgerConstructor;
