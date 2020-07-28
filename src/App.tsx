import React from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Routes from './routes';
import { AuthProvider } from './contexts/Auth';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
};

render(<App />, mainElement);
