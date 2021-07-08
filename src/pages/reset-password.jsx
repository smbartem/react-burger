import AppHeader from "../components/app-header/app-header";
import AuthenticationForm from "../components/authentication/authentication-form";
import ResetPasswordForm from "../components/authentication/reset-password-form"

export const ResetPasswordPage = () => (
  <>
    <AppHeader />
    <AuthenticationForm>
      <ResetPasswordForm />
    </AuthenticationForm>
  </>
);