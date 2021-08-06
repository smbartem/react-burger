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
import { FC, useEffect } from "react";
import { useDispatch } from "../../services/hooks";
import { getUserData } from "../../services/actions/authorization-actions";

const ModalSwitch: FC = () => {
  const location: any = useLocation();
  const history: any = useHistory();
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
        <ProtectedRoute path="/login" onlyUnAuth = {false} exact={true}>
          <LoginPage />
        </ProtectedRoute>
        <ProtectedRoute path="/register" onlyUnAuth = {false} exact={true}>
          <RegisterPage />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" onlyUnAuth = {false} exact={true}>
          <ForgotPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" onlyUnAuth = {false} exact={true}>
          <ResetPasswordPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" onlyUnAuth={true} exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/profile/orders/:id" exact={false}>
          <OrderIngredientPage profile={true} />
        </Route>
        <ProtectedRoute path="/profile/orders" onlyUnAuth={true} exact={false}>
          <OrdersHistoryPage />
        </ProtectedRoute>
        <Route path="/feed" exact={true}>
          <OrderTapePage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderIngredientPage profile={false}/>
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <BurgerIngredientPage />
        </Route>
        <Route path="/react-burger" exact={true}>
          <HomePage />
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
          <ProtectedRoute
            path="/profile/orders/:id"
            onlyUnAuth={true}
            exact={false}
          >
            <OrderIngredientModalPage profile={true} />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <BurgerIngredientModal />
          </Route>
          <Route path="/order-details" exact={true}>
            <OrderDetailsModal />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderIngredientModalPage profile={false}/>
          </Route>
        </>
      )}
    </>
  );
}

export default ModalSwitch;
