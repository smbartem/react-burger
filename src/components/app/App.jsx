import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [bun, setBun] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isModalIngredientDetailsOpen, setIsModalIngredientDetailsOpen] =
    useState(false);
  const [isModalOrderDetailsOpen, setIsModalOrderDetailsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const selectIngredient = (ingredient) => (e) => {
    e.preventDefault();
    if (ingredient.type === "bun") {
      setBun(ingredient);
    } else {
      setIngredients([
        ...ingredients,
        { ...ingredient, key: _.uniqueId(ingredient._id) },
      ]);
    }
    setSelectedIngredient(ingredient);
  };

  const handleModalIngredientDetails = () =>
    setIsModalIngredientDetailsOpen(!isModalIngredientDetailsOpen);

  const handleModalOrderDetails = () =>
    setIsModalOrderDetailsOpen(!isModalOrderDetailsOpen);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => setError(`${error}`));
  }, []);

  return (
    <>
      <Header />
      {error && (
        <h2 className={`${styles.main} text text_type_main-medium`}>
          {error}. Перезагрузите страницу
        </h2>
      )}
      <main className={styles.main}>
        {data && (
          <div className={styles.container}>
            <BurgerIngredients
              ingredients={ingredients}
              bun={bun}
              selectIngredient={selectIngredient}
              data={data}
              handleModalOrderDetails={handleModalOrderDetails}
            />
            <BurgerConstructor
              ingredients={ingredients}
              bun={bun}
              handleModalIngredientDetails={handleModalIngredientDetails}
            />
          </div>
        )}
      </main>
      {isModalIngredientDetailsOpen && (
        <Modal handleModal={handleModalIngredientDetails} title="">
          <IngredientDetails />
        </Modal>
      )}
      {isModalOrderDetailsOpen && (
        <Modal handleModal={handleModalOrderDetails} title="Детали ингредиента">
          <OrderDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
}

export default App;
