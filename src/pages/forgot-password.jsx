import AppHeader from "../components/app-header/app-header";
import AuthenticationForm from "../components/authentication/authentication-form";
import ForgotPasswordForm from "../components/authentication/forgot-password-form";

export const ForgotPasswordPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <ForgotPasswordForm />
    </AuthenticationForm>
  </>
);
