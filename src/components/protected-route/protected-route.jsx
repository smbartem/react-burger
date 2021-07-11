import { Route, Redirect, useHistory } from "react-router-dom";
import { getCookie } from "../../services/utils";

const ProtectedRoute = ({ children, path }) => {
  const authorized = getCookie("refreshToken");
  const history = useHistory();

  const authList = ["/profile", "/profile/orders"];
  const nonAuthList = [
    "/login",
    "/register",
    "/forgot-password",
  ];
  
  return (
    <Route
      path={path}
      exact={true}
      render={() => {
        if (authorized && authList.includes(path)) {
          return children;
        }
        if (!authorized && authList.includes(path)) {
          return <Redirect to="/login" />;
        }
        if (!authorized && nonAuthList.includes(path)) {
          return children;
        }
        if (authorized && nonAuthList.includes(path)) {
          return <Redirect to="/" />;
        }
        if (
          path === "/reset-password" &&
          history.location.state === undefined
        ) {
          return <Redirect to="/" />;
        }
        if (
          path === "/reset-password" &&
          history.location.state === "forgot-password"
        ) {
          return children;
        }
        
      }}
    />
  );
};

export default ProtectedRoute;
