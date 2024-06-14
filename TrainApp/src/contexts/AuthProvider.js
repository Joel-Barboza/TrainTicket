import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [adminLogged, setAdminLogged] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [redirected, setRedirected] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, adminLogged, setAdminLogged, username, setUsername, redirected, setRedirected }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
