import React, { createContext, useState } from 'react';

interface UserAuthenticate {
  name?: string;
  isAuthenticated?: boolean;
  token?: string;
  authenticate: () => void;
}

export const ContextAutenticate = createContext<UserAuthenticate>(
  {} as UserAuthenticate
);

export const AuthProvider: React.FC = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);

  function HandleAuthentication () {
    setAuthentication((prev) => !prev);
  }

  return (
    <ContextAutenticate.Provider
      value={{
        isAuthenticated: authentication,
        authenticate: HandleAuthentication,
      }}
    >
      {children}
    </ContextAutenticate.Provider>
  );
};
