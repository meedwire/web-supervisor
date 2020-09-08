import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from '../../styles/GlobalStyle';
import { ContextAutenticate } from '../../contexts/Auth';
import { StyleSheet } from '../../utils';
import { KeyboardTouch } from '../../utils/KeyboardTouch';
import { connect } from '../../services/pcl';

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    minWidth: 400,
  },
  textLogin: {
    textAlign: 'center',
  },
});

const Auth: React.FC = () => {
  const { authenticate } = useContext(ContextAutenticate);
  const [conn, setConn] = useState();

  function handleAuth() {
    authenticate();
  }

  function handleKeyboard(e: React.FocusEvent<HTMLInputElement>) {
    KeyboardTouch.open(e, 'qwrt');
  }

  async function handlePlc() {
    const plc = await connect();
    setConn(plc);
  }

  async function handleRead() {
    if (conn) {
      console.log(await conn.read('I1'));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.textLogin}>CLIENTE LOGIN</Text>
        <TextInput onFocus={handleKeyboard} placeholder="Usuário" />
        <TextInput
          onFocus={handleKeyboard}
          placeholder="Senha"
          type="password"
        />
        <Button onClick={handleAuth}>ENTRAR</Button>
        <Button onClick={handlePlc}>ENTRAR</Button>
        <Button onClick={handleRead}>ENTRAR</Button>
      </View>
    </View>
  );
};

export default Auth;
