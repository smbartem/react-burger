import * as _ from "lodash";
import { useCallback, useEffect, useState, FC } from "react";
import { useSelector } from "../../services/hooks";
import style from "./order-box.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderBox, TData } from "../../services/types";

const OrderBox: FC<TOrderBox> = ({ element }) => {
  const { data } = useSelector((store) => store.appReducer);
  const [ingredients, setIngredients] = useState<null | Array<TData>>(null);

  useEffect(() => {
    element.ingredients &&
      setIngredients(
        element.ingredients.map(
          (el) => [...data].filter((elem: TData) => elem._id === el)[0]
        )
      );
  }, [data, element]);

  const dateToString = useCallback(() => {
    const inputDate = new Date(element?.createdAt);
    const dateNow = new Date();
    const outputDate =
      dateNow.getMonth() === inputDate.getMonth() &&
      dateNow.getDate() === inputDate.getDate()
        ? "Сегодня"
        : `${inputDate.getDate()}-${
            inputDate.getMonth() + 1
          }-${inputDate.getFullYear()}`;
    const outputTime = `${inputDate.getHours()}:${
      inputDate.getMinutes() < 10
        ? `0${inputDate.getMinutes()}`
        : inputDate.getMinutes()
    }`;
    const GMT = (dateNow.getHours() - dateNow.getUTCHours())
    return `${outputDate}, ${outputTime} i-GMT${GMT > 0 ? `+${GMT}` : GMT}`;
  }, [element?.createdAt]);

  return (
    <div className={style.container}>
      <div className={`${style.flexSpaceBetween} mb-6`}>
        <p className="text text_type_digits-default">{element.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {dateToString()}
        </p>
      </div>
      <h2 className="text text_type_main-medium mb-6">{element.name}</h2>
      <div className={style.flexSpaceBetween}>
        <div className={style.priceContainer}>
          {ingredients?.map((el, index) => {
            if (index < 5) {
              return (
                <img
                  src={el?.image_mobile}
                  alt={el?.name}
                  className={style.ingredientImage}
                  key={_.uniqueId()}
                />
              );
            }

            if (index > 5) return null;
            return (
              <p
                key={_.uniqueId()}
                style={{
                  backgroundImage: `url(${ingredients[5]?.image_mobile})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={`${style.ingredientImage} ${style.lastIngredientImage} text text_type_main-default`}
              >
                +{ingredients.length - 5}
              </p>
            );
          })}
        </div>
        <div className={style.priceContainer}>
          <p className="text text_type_digits-default mr-2">
            {ingredients?.reduce((acc, el) => (acc += Number(el?.price)), 0)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
