import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Ingridient from './ingredient';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = (props) => {
  const {
    ingredients, bun, selectIngridient, data, handleModalOrderDetails
  } = props;
  const [current, setCurrent] = useState('Булки');
  
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
              if (el.type !== 'bun') {
                return null;
              }
              return (
                <Ingridient
                  data={el}
                  key={el._id}
                  onClick={selectIngridient}
                  counter={bun && bun._id === el._id ? 1 : null}
                  handleModalOrderDetails={handleModalOrderDetails}
                />
              );
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
              if (el.type !== 'sauce') {
                return null;
              }
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
                  handleModalOrderDetails={handleModalOrderDetails}
                />
              );
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
              if (el.type !== 'main') {
                return null;
              }
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
                  handleModalOrderDetails={handleModalOrderDetails}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  bun: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  ]),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleModalOrderDetails: PropTypes.func.isRequired,
  selectIngridient: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,)
  ]),
};


export default BurgerIngredients;
