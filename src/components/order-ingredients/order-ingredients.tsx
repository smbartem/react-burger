import { FC } from "react";
import {
  CloseIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import * as _ from "lodash";
import styles from "./order-ingredients.module.css";
import OrderIngredientInfo from "./order-ingredients-info";
import { TOrderIngredients } from "../../services/types";

const OrderIngredients: FC<TOrderIngredients> = ({
  order,
  handleModalClose,
  isModal,
  ingredients,
}) => {
  const dateToString = useCallback(() => {
    const inputDate = new Date(order?.createdAt);
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
  }, [order?.createdAt]);

  const justifyContentCenter = !isModal ? { justifyContent: "center" } : { justifyContent: "spaceBetween" };

  return (
    <div className={styles.container}>
      <div className={styles.modalHeader} style={justifyContentCenter}>
        <h2 className="text text_type_digits-default mb-5">#{order?.number}</h2>
        {isModal && <button
          type="button"
          className={styles.modalButton}
          onClick={handleModalClose}
        >
          <CloseIcon type="primary" />
        </button>}
      </div>
      <h2 className="text text_type_main-medium  mb-2">{order?.name}</h2>
      <p className="text text_type_main-default mb-15" style={{ color: "#00CCCC" }}>
        {order?.status === "done" ? "Выполнен" : "В работе"}
      </p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <div className={styles.scrollContainer}>
        {ingredients && Object.entries(ingredients).map((el) => (
          <OrderIngredientInfo key={_.uniqueId()} ingredient={el} />
        ))}
      </div>
      <div className={`${styles.displayFlex}`} style={{marginTop: "48px"}}>
        <p className="text text_type_main-default text_color_inactive">
          {dateToString()}
        </p>
        <div className={styles.displayFlex}>
          <p className="text text_type_digits-default mr-2">
            {ingredients && Object.entries(ingredients).reduce(
              (acc, [key, val]) => ((acc += Number(JSON.parse(key).price) * Number(val))),
              0
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderIngredients;
