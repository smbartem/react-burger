import { FC } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./burger-ingredients.module.css";
import { TIngredient } from "../../services/types";

const Ingredient: FC<TIngredient> = ({ data, counter }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const dragStyle = isDrag ? { opacity: "0.1" } : { opacity: "1" };
  return (
    <div ref={dragRef} style={dragStyle}>
      <div>
        <div className={`${styles.ingredient} pl-4 pr-4`}>
          <img src={data?.image} alt={data?.name} />
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

export default Ingredient;
