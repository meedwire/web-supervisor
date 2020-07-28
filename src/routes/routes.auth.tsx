import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthScreen from '../screens/Auth';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={AuthScreen} />
    </Switch>
  );
};

export default AuthRoutes;
