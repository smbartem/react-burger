import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { DELETE_INGREDIENT_FROM_INGREDIENTS, REPLACE_INNER_DRAG_INGREDIENT } from "../../services/actions/app-actions";
import { useDispatch } from "react-redux";

const BurgerConstructorInnerIngredients = ({ el, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  /* не очень понимаю, как сделать так, чтобы элементы не прыгали при DnD, подскажите, пожалуйста*/
  const [, dropInner] = useDrop({
    accept: "innerIngredient",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({type: REPLACE_INNER_DRAG_INGREDIENT, dragIndex, hoverIndex})
    },
  });

  const [{ isDragging }, dragInner] = useDrag({
    type: "innerIngredient",
    item: () => {
      return { el, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragElStyle = isDragging ? { opacity: "0" } : null;
  dragInner(dropInner(ref));
  return (
    <div
      key={el.key}
      className={`mb-4 ${styles.mainIngredients}`}
      ref={ref}
      style={dragElStyle}
    >
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() =>
          dispatch({
            type: DELETE_INGREDIENT_FROM_INGREDIENTS,
            key: el.key,
          })
        }
      />
    </div>
  );
};

export default BurgerConstructorInnerIngredients;
