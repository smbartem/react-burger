import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfilePage,
  OrdersHistoryPage,
  BurgerIngredientPage,
  BurgerIngredientModal,
  OrderDetailsModal,
  OrderTapePage,
  OrderIngredientModalPage,
  OrderIngredientPage,
} from "../../pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../../services/actions/authorization-actions";

function ModalSwitch() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  let background =
    (history.action === "PUSH" || history.action === "REPLACE") &&
    location.state &&
    location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <ProtectedRoute path="/login" exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact={true} onlyUnAuth={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true} onlyUnAuth={true}>
          <OrdersHistoryPage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <OrderTapePage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderIngredientPage />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <BurgerIngredientPage />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:id" exact={true}>
            <BurgerIngredientModal />
          </Route>
          <Route path="/order-details" exact={true}>
            <OrderDetailsModal />
          </Route>
          <Route path="/feed/:id">
            <OrderIngredientModalPage exact={true}/>
          </Route>
        </>
      )}
    </>
  );
}

export default ModalSwitch;
