import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export const BurgerIngredientModal = () => {
  const history = useHistory();
  const { id } = useParams();
  const selectedIngredient = useSelector((store) =>
    store.appReducer.data
      && store.appReducer.data.filter((el) => el._id === id)[0]
  );

  return (
    <Modal
      title="Детали ингредиента"
      handleModalClose={() => {
        history.push("/");
      }}
    >
      <IngredientDetails selectedIngredient={selectedIngredient}/>
    </Modal>
  );
};