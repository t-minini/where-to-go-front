import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRouteAdmin(props) {
  const { component: Component } = props;

  const { loggedInUser } = useContext(AuthContext);
  if (loggedInUser.user.role === "ADMIN") {
    return <Component />;
  }

  return <Navigate to="/" />;
}
