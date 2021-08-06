import AppHeader from "../../components/app-header/app-header";
import AuthenticationForm from "../../components/authentication-form/authentication-form";
import ResetPasswordForm from "../../components/reset-password-form/reset-password-form";
import { useHistory, Redirect } from "react-router-dom";
import { FC } from "react";

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const redirect = history.location.state !== "forgot-password";
  return (
    <>
      <AppHeader />
      <AuthenticationForm>
        <ResetPasswordForm />
      </AuthenticationForm>
      {redirect && <Redirect to="/" />}
    </>
  );
};
