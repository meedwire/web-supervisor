import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoutes from './routes.auth';
import { AuthProvider, ContextAutenticate } from '../contexts/Auth';
import AppRoutes from './routes.app';
import { Botton } from '../components/Botton';
import { Header } from '../components/Header';

const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(ContextAutenticate);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <AppRoutes />
          <Botton />
        </>
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
};

export default Routes;
