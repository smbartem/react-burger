import React, { useState } from 'react';
import * as _ from 'lodash';
import Header from './app-header/header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  const [bun, setBun] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  
  const selectIngredient = (ingredient) => (e) => {
    e.preventDefault();
    if (ingredient.type === 'bun') {
      setBun(ingredient);
    } else {
      setIngredients([...ingredients, {...ingredient, key: _.uniqueId(ingredient._id)}]);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <BurgerIngredients
            ingredients={ingredients}
            bun={bun}
            selectIngridient={selectIngredient}
          />
          <BurgerConstructor
            ingredients={ingredients}
            bun={bun}
          />
        </div>
      </main>
    </>
  );
}

export default App;
