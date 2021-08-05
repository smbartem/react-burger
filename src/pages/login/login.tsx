import AppHeader from "../../components/app-header/app-header";
import AuthenticationForm from "../../components/authentication-form/authentication-form";
import LoginForm from "../../components/login-form/login-form";

export const LoginPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <LoginForm />
    </AuthenticationForm>
  </>
);
