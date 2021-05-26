import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Ingridient from './ingredient';
import data from '../../utils/data.json';
import styles from './burgerIngredients.module.css';

const BurgerIngredients = (props) => {
  const {
    ingredients, setIngredients, bun, setBun, totalPrice, setTotalPrice,
  } = props;
  const [current, setCurrent] = useState('Булки');
  const selectIngridient = (data) => (e) => {
    e.preventDefault();
    setIngredients([...ingredients, data]);
    setTotalPrice(totalPrice + data.price);
  };

  const selectBun = (bun) => (e) => {
    e.preventDefault();
    setBun(bun);
    setTotalPrice(totalPrice + bun.price);
  };

  return (
    <section className={`${styles.burgerIngredients} mr-10`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          <a href="#bun">Булки</a>
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          <a href="#sauce">Соусы</a>
        </Tab>
        <Tab
          value="Начинки"
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          <a href="#main">Начинки</a>
        </Tab>
      </div>
      <div className={`mt-10 ${styles.scrollbar}`}>
        <div>
          <h2 className="text text_type_main-medium" id="bun">
            Булки
          </h2>
          <div className={`${styles.burgerIngredientsContainer}`}>
            {data.map((el) => {
              if (el.type === 'bun') {
                return (
                  <Ingridient
                    data={el}
                    key={el._id}
                    onClick={selectBun}
                    counter={bun && bun._id === el._id ? 1 : null}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="sauce">
            Соусы
          </h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type === 'sauce') {
                let counter = ingredients.filter(
                  (element) => el._id === element._id,
                ).length;
                counter = counter === 0 ? null : counter;
                return (
                  <Ingridient
                    data={el}
                    onClick={selectIngridient}
                    key={el._id}
                    counter={counter}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="main">
            Начинки
          </h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type === 'main') {
                let counter = ingredients.filter(
                  (element) => el._id === element._id,
                ).length;
                counter = counter === 0 ? null : counter;
                return (
                  <Ingridient
                    data={el}
                    onClick={selectIngridient}
                    key={el._id}
                    counter={counter}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  bun: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  setIngredients: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  setBun: PropTypes.func.isRequired,
}

export default BurgerIngredients;
