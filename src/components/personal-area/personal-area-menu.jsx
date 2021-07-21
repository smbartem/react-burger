import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { makeLogout } from "../../services/actions/authorization-actions";
import styles from "./personal-area-form.module.css";

const PersonalAreaMenu = ({ description }) => {
  const dispatch = useDispatch();
  const { error, redirectToLogin } = useSelector(
    (store) => store.authorizationReducer
  );
  return (
    <div className="mr-15">
      {error && (
        <h2
          className="mb-6 text text_type_main-medium"
          style={{ color: "red" }}
        >
          {error}
        </h2>
      )}
      <ul className="mb-20">
        <li className="mt-4 mb-4">
          <NavLink
            exact
            to="/profile"
            className="text text_type_main-medium text_color_inactive"
            activeClassName={styles.colorActive}
          >
            Профиль
          </NavLink>
        </li>
        <li className="mt-4 mb-4">
          <NavLink
            exact
            to="/profile/orders"
            className="text text_type_main-medium text_color_inactive"
            activeClassName={styles.colorActive}
          >
            История заказов
          </NavLink>
        </li>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(makeLogout());
          }}
        >
          <p className="mt-4 mb-4 text text_type_main-medium text_color_inactive">
            Выход
          </p>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {description}
      </p>
      {redirectToLogin && <Redirect to="/" />}
    </div>
  );
};

export default PersonalAreaMenu;
