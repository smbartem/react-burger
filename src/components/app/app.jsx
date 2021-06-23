import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { BunContext, IngredientsContext } from "../../services/context";
const axios = require('axios');

const getDataUrl = "https://norma.nomoreparties.space/api/ingredients";
const postOrderUrl = "https://norma.nomoreparties.space/api/orders";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [bun, setBun] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isModalIngredientDetailsOpen, setIsModalIngredientDetailsOpen] =
    useState(false);
  const [isModalOrderDetailsOpen, setIsModalOrderDetailsOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

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
    axios.get(getDataUrl)
      .then((data) => {
        setData(data.data.data);
      })
      .catch((error) => setError(`${error}`));
  }, []);

  const handleOrder = () => {
    const ingredientsId = ingredients.map((el) => el._id);
    const orderInfo = [bun._id, ...ingredientsId, bun._id];
    axios.post(postOrderUrl, {
      "ingredients": orderInfo
    })
      .then((data) => {
        setOrderNumber(data.data.order.number);
      })
      .then(() => handleModalOrderDetails())
      .catch((error) => setError(`${error}`));
  };

  return (
    <>
      <AppHeader />
      {error && (
        <h2 className={`${styles.main} text text_type_main-medium`}>
          {error}. Перезагрузите страницу
        </h2>
      )}
      <main className={styles.main}>
        {data && (
          <div className={styles.container}>
            <BunContext.Provider value={bun}>
              <IngredientsContext.Provider value={ingredients}>
                <BurgerIngredients
                  selectIngredient={selectIngredient}
                  data={data}
                  handleModalIngredientDetails={handleModalIngredientDetails}
                />
                <BurgerConstructor
                  handleOrder={handleOrder}
                />
              </IngredientsContext.Provider>
            </BunContext.Provider>
          </div>
        )}
      </main>
      {isModalOrderDetailsOpen && (
        <Modal toggleModal={handleModalOrderDetails} title="">
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      )}
      {isModalIngredientDetailsOpen && (
        <Modal
          toggleModal={handleModalIngredientDetails}
          title="Детали ингредиента"
        >
          <IngredientDetails selectedIngredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
}

export default App;
