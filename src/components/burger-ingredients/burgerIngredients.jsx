import React from 'react';
import Ingridient from './ingredient';
import data from '../../utils/data.json';
import styles from './burgerIngredients.module.css';

export default (props) => {
  const selectIngridient = (data) => (e) => {
    e.preventDefault();
    props.setIngredients([...props.ingredients, data])
    props.setTotalPrice(props.totalPrice + data.price)
  }

  const selectBun = (bun) => (e) => {
    e.preventDefault();
    props.setBun(bun)
    props.setTotalPrice(props.totalPrice + bun.price)
  }

  return (
    <section className={`${styles.burgerIngredients} mr-10`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${styles.tabs} mt-5`}>
        <div className={`${styles.tabItems} pt-4 pb-4`}>
          <a className="text text_type_main-default" href='#bun'>Булки</a>
        </div>
        <div className={`${styles.tabItems} pt-4 pb-4`}>  
          <a className="text text_type_main-default text_color_inactive" href='#sauce'>Соусы</a>
        </div>
        <div className={`${styles.tabItems} pt-4 pb-4`}>
          <a className="text text_type_main-default text_color_inactive" href='#main'>
            Начинки
          </a>
        </div>
      </div>
      <div className={`mt-10 ${styles.scrollbar}`}>
        <div>
          <h2 className="text text_type_main-medium" id="bun">Булки</h2>
          <div
            className={`${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type === 'bun') {
                return (
                  <Ingridient
                    data={el}
                    key={el._id}
                    onClick={selectBun}
                    counter={(props.bun && props.bun._id === el._id) ? 1 : null}
                  />
                )
              }
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="sauce">Соусы</h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type === 'sauce') {
                let counter = props.ingredients.filter((element) => el._id === element._id).length;
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
            })}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" id="main">Начинки</h2>
          <div
            className={`mt-6 mb-10 mr-4 ml-4 ${styles.burgerIngredientsContainer}`}
          >
            {data.map((el) => {
              if (el.type === 'main') {
                let counter = props.ingredients.filter((element) => el._id === element._id).length;
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
            })}
          </div>
        </div>
      </div>
    </section>
  )
};
