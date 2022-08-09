import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(
  JSON.parse(localStorage.getItem("loggedInUser"))
);

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.token) {
      setLoggedInUser(parsedStoredUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
