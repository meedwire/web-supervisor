import React from 'react';
import { View, Button } from '../../styles/GlobalStyle';
import { useHistory } from 'react-router-dom';

const ParametersDevice: React.FC = () => {
  const history = useHistory();
  return (
    <View>
      Parameters Device
      <Button onClick={() => history.push('/')}>ksdkdsf</Button>
    </View>
  );
};

export default ParametersDevice;
