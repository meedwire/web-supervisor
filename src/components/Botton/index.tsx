import React, { useContext } from 'react';
import { View, Text, Button } from '../../styles/GlobalStyle';
import { StyleSheet } from '../../utils';
import { useHistory } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { ContextAutenticate } from '../../contexts/Auth';

const Botton: React.FC = () => {
  const history = useHistory();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const { authenticate } = useContext(ContextAutenticate);

  return (
    <View style={styles.container}>
      <Button onClick={() => history.push('/')} style={{ width: 150 }}>
        <Text>INICIO</Text>
      </Button>
      <Button style={{ width: 150 }}>
        <Text>DISPOSITIVOS</Text>
      </Button>
      <Button onClick={() => authenticate()} style={{ marginLeft: 'auto' }}>
        <AiOutlineLogout />
      </Button>
      <View style={styles.boxTime}>
        <Text>{time}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: '#dadada',
    alignSelf: 'baseline',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxTime: {
    alignItems: 'center',
  },
});

export { Botton };
