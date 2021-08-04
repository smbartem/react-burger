import { FC, ReactNode } from "react";
import { useSelector } from "../../services/hooks";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute: FC<{children: ReactNode, path: string, onlyUnAuth: boolean}> = ({ children, path, onlyUnAuth = false }) => {
  const { authorized } = useSelector(
    (store) => store.authorizationReducer
  );

  return (
    <Route
      path={path}
      exact={true}
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
