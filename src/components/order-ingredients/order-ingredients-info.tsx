import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./order-ingredients.module.css";

const OrderIngredientInfo: FC<{ingredient: [string, number]}> = ({ ingredient }) => {
  const [el, qty] = ingredient;
  const element = JSON.parse(el);
  return (
    <div className={`${styles.displayFlex} mb-4`}>
      <div className={styles.displayFlex}>
        <img src={element.image_mobile} alt={element.name} className={`${styles.ingredientImage} mr-4`}/>
        <p>{element.name}</p>
      </div>
      <div className={styles.displayFlex}>
        <p className="mr-2">
          {`${qty} x ${element.price}`}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default OrderIngredientInfo;