import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

const IngredientDetails = (props) => {
  const { selectedIngredient } = props;

  return (
    <>
      <img
        src={selectedIngredient.image_large}
        alt="ingredientPicture"
        className="mb-4"
      />
      <h2 className="text text_type_main-medium mb-8">
        {selectedIngredient.name}
      </h2>
      <div className={`${styles.informationContainer} mb-15`}>
        <div className={styles.flexCenter}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {selectedIngredient.calories}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {selectedIngredient.proteins}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {selectedIngredient.fat}
          </p>
        </div>
        <div className={styles.flexCenter}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  selectedIngredient: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
    }).isRequired,
  ]),
};

export default IngredientDetails;
