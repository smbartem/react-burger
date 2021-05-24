import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.json";
import styles from "./burgerConstructor.module.css";

export default (props) => (
  <section className={styles.burgerConstructor}>
    <div className="mt-25 mb-10 ml-4 mr-4">
      {props.bun && (
        <div className="ml-8 mb-4">
          <ConstructorElement
            type="top"
            isLocked
            text={`${props.bun.name} (верх)`}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />
        </div>
      )}
      {props.ingredients.length > 0 && (
        <div className={`pr-2 ${styles.scrollbar}`}>
          {props.ingredients.map((el) => (
            <div key={el._id} className={`mb-4 ${styles.mainIngredients}`}>
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
      )}
      {props.bun && (
        <div className="ml-8">
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${props.bun.name} (низ)`}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />
        </div>
      )}
    </div>
    <div className={`${styles.orderContainer} mr-4`}>
      <div className={`${styles.totalPriceContainer} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{props.totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  </section>
);
