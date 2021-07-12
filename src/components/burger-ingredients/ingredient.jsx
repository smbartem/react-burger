import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./burger-ingredients.module.css";
import { useDispatch } from "react-redux";
import { OPEN_MODAL_INGREDIENT_DETAILS } from "../../services/actions/interface-actions";
import { SET_SELECT_INGREDIENT } from "../../services/actions/app-actions";

const Ingredient = (props) => {
  const { data, counter } = props;
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const dragStyle = isDrag ? { opacity: "0.1" } : null;
  return (
    <div
      ref={dragRef}
      style={dragStyle}
      onClick={() => {
        dispatch({ type: SET_SELECT_INGREDIENT, ingredient: data });
      }}
    >
      <div onClick={() => dispatch({ type: OPEN_MODAL_INGREDIENT_DETAILS })}>
        <div className={`${styles.ingredient} pl-4 pr-4`}>
          <img src={data.image} alt={data.name} />
          <div className={`${styles.ingredientPrice} mt-1 mb-1`}>
            <p className="text text_type_digits-default mr-1">{data.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <p
          className={`text text_type_main-default pb-6 mt-1 ${styles.ingredientName}`}
        >
          {data.name}
        </p>
        {counter && <Counter count={counter} size="default" />}
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  counter: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.number.isRequired,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ]),
};

export default Ingredient;
