import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { makeLogout } from "../../services/actions/authorization-actions";

const PersonalAreaMenu = ({ activeLink, description }) => {
  const dispatch = useDispatch();
  const { error, redirectToLogin } = useSelector((store) => store.authorizationReducer)
  return (
    <div className="mr-15">
      {error && <h2 className="mb-6 text text_type_main-medium" style={{color: "red"}}>{error}</h2>}
      <ul className="mb-20">
        <li>
          <Link to="/profile">
            <p
              className={`mt-4 mb-4  text text_type_main-medium ${
                activeLink !== "profile" && "text_color_inactive"
              }`}
            >
              Профиль
            </p>
          </Link>
        </li>
        <li>
          <Link to="/profile/orders">
            <p
              className={`mt-4 mb-4 text text_type_main-medium ${
                activeLink !== "ordersHistory" && "text_color_inactive"
              }`}
            >
              История заказов
            </p>
          </Link>
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
      { redirectToLogin && <Redirect to="/" /> }
    </div>
  );
};

export default PersonalAreaMenu;
