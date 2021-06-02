import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import Header from "../app-header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [bun, setBun] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [modalIngredientDetails, setModalIngredientDetails] = useState(false);
  const [modalOrderDetails, setModalOrderDetails] = useState(false);

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
  };

  const handleModalIngredientDetails = () => {
    setModalIngredientDetails(!modalIngredientDetails);
  };

  const handleModalOrderDetails = () => {
    setModalOrderDetails(!modalOrderDetails);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
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
              selectIngridient={selectIngredient}
              data={data}
              handleModalOrderDetails={handleModalOrderDetails}
            />
            <BurgerConstructor
              ingredients={ingredients}
              bun={bun}
              modalIngredientDetails={modalIngredientDetails}
              handleModalIngredientDetails={handleModalIngredientDetails}
            />
          </div>
        )}
      </main>
      {modalIngredientDetails && (
        <IngredientDetails
          handleModal={handleModalIngredientDetails}
        />
      )}
      {modalOrderDetails && (
        <OrderDetails
          handleModal={handleModalOrderDetails}
        />
      )}
    </>
  );
}

export default App;
