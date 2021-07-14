import AppHeader from "../../components/app-header/app-header";
import AuthenticationForm from "../../components/authentication-form/authentication-form";
import RegisterForm from "../../components/register-form/register-form"

export const RegisterPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <RegisterForm />
    </AuthenticationForm>
  </>
);