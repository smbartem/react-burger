import React from 'react';
import {
  CurrencyIcon,
  Counter
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerIngredients.module.css'

export default (props) => (
  <div className={`${styles.ingredientContainer} pl-4 pr-4`} onClick={props.onClick(props.data)}>
    <div className={`${styles.ingredient} pl-4 pr-4`}>
      <img src={props.data.image}></img>
      <div className={`${styles.ingredientPrice} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-1">{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
    <p className={`text text_type_main-default pb-6 mt-1 ${styles.ingredientName}`}>{props.data.name}</p>
    {props.counter && <Counter count={props.counter} size="default" />}
  </div>
);