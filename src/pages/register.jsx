import AppHeader from "../components/app-header/app-header";
import AuthenticationForm from "../components/authentication/authentication-form";
import RegisterForm from "../components/authentication/register-form"

export const RegisterPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <RegisterForm />
    </AuthenticationForm>
  </>
);