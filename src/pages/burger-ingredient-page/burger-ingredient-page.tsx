import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./burger-ingredient-page.module.css";
import { FC } from "react";

export const BurgerIngredientPage: FC = () => {
  const { id } = useParams<{id?: string}>();
  const selectedIngredient = useSelector((store) =>
    store.appReducer.data
      && store.appReducer.data.filter((el) => el._id === id)[0]
  );
  
  return (
    <>
      <AppHeader />
      <div className={styles.modal}>
        <header className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
        </header>

        <section className={`${styles.modalMain} mt-4`}>
          {selectedIngredient && <IngredientDetails selectedIngredient={selectedIngredient}/>}
        </section>
      </div>
    </>
  );
};
