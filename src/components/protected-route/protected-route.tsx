import { FC, ReactNode } from "react";
import { useSelector } from "../../services/hooks";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute: FC<{
  children: ReactNode;
  path: string;
  onlyUnAuth: boolean;
  exact: boolean;
}> = ({ children, path, onlyUnAuth = false, exact = true }) => {
  const { authorized } = useSelector((store) => store.authorizationReducer);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (authorized && onlyUnAuth) {
          return children;
        }
        if (!authorized && onlyUnAuth) {
          return <Redirect to="/login" />;
        }
        if (!authorized && !onlyUnAuth) {
          return children;
        }
        if (authorized && !onlyUnAuth) {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
