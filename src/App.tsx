import React, { useState } from 'react';
import Header from './components/app-header/header';
import BurgerIngredients from './components/burger-ingredients/burgerIngredients';
import BurgerConstructor from './components/burger-constructor/burgerConstructor';
import styles from './app.module.css';

function App() {
  const [bun, setBun] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <BurgerIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
            bun={bun}
            setBun={setBun}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
          />
          <BurgerConstructor
            ingredients={ingredients}
            setIngredients={setIngredients}
            bun={bun}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        </div>
      </main>
    </>
  );
}

export default App;
