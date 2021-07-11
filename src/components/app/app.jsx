import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route"
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfilePage,
  OrdersHistoryPage
} from "../../pages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
