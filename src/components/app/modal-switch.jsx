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
} from "../../pages";

function ModalSwitch() {
  const location = useLocation();
  const history = useHistory();

  let background =
    history.action === "PUSH" && location.state && location.state.background;

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
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrdersHistoryPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
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
        <Route path="/ingredients/:id" exact={true}>
          <HomePage />
        </Route>
      )}
    </>
  );
}

export default ModalSwitch;
