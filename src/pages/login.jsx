import AppHeader from "../components/app-header/app-header";
import AuthenticationForm from "../components/authentication/authentication-form";
import LoginForm from "../components/authentication/login-form";

export const LoginPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <LoginForm />
    </AuthenticationForm>
  </>
);
