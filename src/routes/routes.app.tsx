import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeScreen from '../screens/Home';
import ParametersDevice from '../screens/ParametersDevice';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/device" component={ParametersDevice} exact />
    </Switch>
  );
};

export default AppRoutes;
