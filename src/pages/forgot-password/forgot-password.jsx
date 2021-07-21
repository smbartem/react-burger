import AppHeader from "../../components/app-header/app-header";
import AuthenticationForm from "../../components/authentication-form/authentication-form";
import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form";

export const ForgotPasswordPage = () => {
  return (
    <>
      <AppHeader />
      <AuthenticationForm>
        <ForgotPasswordForm />
      </AuthenticationForm>
    </>
  );
};
